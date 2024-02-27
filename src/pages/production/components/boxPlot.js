import React from 'react';
import { Box as Boxplot } from '@ant-design/plots';
import { Stack, Box, Typography } from '@mui/material';
import { titleCase } from '../../../core/titleCase';

const unitsMap = {
  IRR: '%',
  NPV_estimated_capex: 'USD',
  NPV_estimated_PPA: 'USD',
  'System Sizes': ''
}
const decimalMap = {
  IRR: 1,
  NPV_estimated_capex: 0,
  NPV_estimated_PPA: 0,
  'System Sizes': 0
}

function sortNumber(a,b) {
  return a - b;
}

function quantile(array, percentile) {
  let result;
  let index = percentile/100. * (array.length-1);
  if (Math.floor(index) === index) {
    result = array[index];
  } else {
      let i = Math.floor(index)
      let fraction = index - i;
      result = array[i] + (array[i+1] - array[i]) * fraction;
  }
  return result;
}

const statsObject = (x, low, q1, median, q3, high) => {
  return {x, low, q1, median, q3, high}
}

const stats = (name, array) => {
  array.sort(sortNumber);
  return statsObject(
    name,
    Math.min(...array),
    quantile(array, 25),
    quantile(array, 50),
    quantile(array, 75),
    Math.max(...array)
  );
}

function BoxplotComponent(props) {

  const [IRR, set_IRR] = React.useState(null);
  const [NPV_Capex, set_NPV_Capex] = React.useState(null);
  const [NPV_PPA, set_NPV_PPA] = React.useState(null);

  React.useEffect(() => {
    if (!props.data) return; 

    let irr = [];
    let npvCapex = [];
    let npvPpa = [];

    props.data.forEach(node => {
      irr.push(node.financials.IRR);
      npvCapex.push(node.financials.net_present_value);
      npvPpa.push(node.financials.npv_estimated_customer_ppa);
    });

    set_IRR(stats('IRR', irr));
    set_NPV_Capex(stats('NPV_estimated_capex', npvCapex));
    set_NPV_PPA(stats('NPV_estimated_PPA', npvPpa));


  }, [props.data]);

  const config = {
    width: 400,
    //height: 500,
    //data: data,
    xField: 'x',
    yField: ['low', 'q1', 'median', 'q3', 'high'],
    boxStyle: {
      stroke: '#545454',
      fill: '#1890FF',
      fillOpacity: 0.3,
    },
    animation: false,
    tooltip: {
      customContent: (title, items) => {
        const data = items[0]?.data || {};
        return (
          <Box sx={{paddingX: 1, paddingY: 1.5}}>
            <Stack spacing={2}>
              <div>{data.x}</div>
              {
                ['low', 'q1', 'median', 'q3', 'high'].map((node, index) => (
                  <Stack key={index} direction={'row'} spacing={1} alignItems='center'>
                    <Typography variant='caption'>{titleCase(node)}:</Typography>
                    <Typography variant='caption' sx={{whiteSpace: 'nowrap'}}>
                      {(data[node] ? (decimalMap[data.x] ? data[node].toFixed(decimalMap[data.x]) : Math.round(data[node])).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : data[node]) + ' ' + unitsMap[data.x]}
                    </Typography>
                  </Stack>
                ))
              }
            </Stack>
          </Box>
          )
      }
    },
  };
  // for (var key in data[0]) {
  //   if (data[0].hasOwnProperty(key)) {
  //     if(key !== 'x'){
  //       data[0][key] = (data[0][key]/data[0]['high'])*100;
  //     }
  //   }
  // }
  //console.log('percentage', data[0]);
  const config1= {
    ...config,
    data: [IRR],
    yAxis: {
      //minLimit: 0,
      // min: IRR['low'],
      label: {
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`) + ' %',
      },
    },
  }
  const config2= {
    ...config,
    data: [NPV_Capex],
    yAxis: {
      // min: -2000000,
      label: {
        formatter: (v) => (`${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)) + ' USD',
      },
    },
  }
  const config3= {
    ...config,
    data: [NPV_PPA],
    yAxis: {
      label: {
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`) + ' USD',
      },
    },
  }

  return (
    <Box sx={{p: 5}}>
      <Stack spacing={3}>
        <Typography variant='h6' fontWeight={600}>Box & Whisker</Typography>
        <Stack direction={'row'} spacing={5}>
          {
            IRR &&
            <Boxplot {...config1} />
          }
          {
            NPV_Capex &&
            <Boxplot {...config2} />
          }
          {
            NPV_PPA &&
            <Boxplot {...config3} />
          }
        </Stack>
      </Stack>
    </Box>
  )
};
export default React.memo(BoxplotComponent);