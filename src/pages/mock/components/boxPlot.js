import React from 'react';
import { Box as Boxplot } from '@ant-design/plots';
import data from '../data/boxplot.json';
import { Stack, Box } from '@mui/material';

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

export default function BoxplotExample() {

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
        const color = items[0]?.color || '#174c83';
        //let val = data.solar_gen ?  data.solar_gen.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : data.solar_gen
        //console.log(data, items);
        return (
          <Box sx={{paddingX: 1, paddingY: 1.5}}>
            <Stack spacing={2}>
              <div>{data.x}</div>
              {
                ['low', 'q1', 'median', 'q3', 'high'].map((node, index) => (
                  <Stack key={index} direction={'row'} spacing={1} alignItems='center'>
                    <div style={{background: color, height: 10, width: 10, borderRadius: 10}}></div>
                    <div>{node}: </div>
                    <div style={{whiteSpace: 'nowrap'}}>
                      {(data[node] ? (decimalMap[data.x] ? data[node].toFixed(decimalMap[data.x]) : Math.round(data[node])).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : data[node]) + ' ' + unitsMap[data.x]}
                    </div>
                  </Stack>
                ))
              }
            </Stack>
          </Box>
          )
      }
    },
  };
  for (var key in data[0]) {
    if (data[0].hasOwnProperty(key)) {
      if(key !== 'x'){
        data[0][key] = (data[0][key]/data[0]['high'])*100;
      }
    }
  }
  //console.log('percentage', data[0]);
  const config1= {
    ...config,
    data: [data[0]],
    yAxis: {
      //minLimit: 0,
      min: data[0]['low'],
      label: {
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`) + ' %',
      },
    },
  }
  const config2= {
    ...config,
    data: [data[1]],
    yAxis: {
      min: -2000000,
      label: {
        formatter: (v) => (`${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)) + ' USD',
      },
    },
  }
  const config3= {
    ...config,
    data: [data[2]],
    yAxis: {
      label: {
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`) + ' USD',
      },
    },
  }
  const config4= {
    ...config,
    data: [data[3]],
    yAxis: {
      label: {
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
  }

  return (
    <Stack direction={'row'} spacing={1}>
      <Boxplot {...config1} />
      <Boxplot {...config2} />
      <Boxplot {...config3} />
      <Boxplot {...config4} />
    </Stack>
  )
};
