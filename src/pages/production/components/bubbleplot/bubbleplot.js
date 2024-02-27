import React, { useState, useEffect } from 'react';
import { Scatter } from '@ant-design/plots';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Slider, Stack, Typography } from '@mui/material';
import BubbleplotTable from './bubbleplotTable';
import BubbleplotAdvanceFilters from './bubbleplotAdvanceFilters';
import { useSelector } from "react-redux";

const fieldMap = {
  IRR: 'IRR',
  payback_period: 'Capex Payback',
  total_gross_project_cost: 'Capex Asset',
  net_present_value: 'NPV Estimated Capex',
  npv_estimated_customer_ppa: 'NPV Estimated PPA',
  ppa_kwh_rate: 'PPA'
}

const decimalMap = {
  IRR: 1,
  payback_period: 1,
  total_gross_project_cost: 0,
  net_present_value: 0,
  npv_estimated_customer_ppa: 0,
  ppa_kwh_rate: 2
}

const filterStyle = {
  flexGrow: 1,
  flexBasis: 0
}

function Bubbleplot (props) {
  const [data, setData] = useState([]);
  const [size, setSize] = React.useState('IRR');
  const [x, setX] = React.useState('IRR');
  const [y, setY] = React.useState('payback_period');
  const [sizeArray, setSizeArray] = React.useState([4,30]);

  const [xAxisRange, setXAxisRange] = React.useState([0, 100]);
  const [yAxisRange, setYAxisRange] = React.useState([0, 100]);
  const minDistance = 10;
  const {minX, maxX, minY, maxY} = useSelector((state) => state.bubbleplotSlice.advanceFilters);
  
  // x axis zoom slider handler
  const handleChangeXAxisRange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setXAxisRange([Math.min(newValue[0], xAxisRange[1] - minDistance), xAxisRange[1]]);
    } else {
      setXAxisRange([xAxisRange[0], Math.max(newValue[1], xAxisRange[0] + minDistance)]);
    }
  };
  // y axis zoom slider handler
  const handleChangeYAxisRange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setYAxisRange([Math.min(newValue[0], yAxisRange[1] - minDistance), yAxisRange[1]]);
    } else {
      setYAxisRange([yAxisRange[0], Math.max(newValue[1], yAxisRange[0] + minDistance)]);
    }
  };

  const handleChangeSize = (event) => {
    setSize(event.target.value);
  };

  const handleChangeX = (event) => {
    setX(event.target.value);
  };
  const handleChangeY = (event) => {
    setY(event.target.value);
  };

  const [pointSize, setPointSize] = React.useState(4);

  const handleChangePointSize = (event, val, activeThumb) => {
    setPointSize(val);
  }

  React.useMemo(() =>
  (() => {

    const sizeMap = {
      1: [2, 10],
      2: [2.5, 15],
      3: [3, 20],
      4: [4, 30]
    }
    setSizeArray(sizeMap[pointSize]);

  })(), [pointSize]);

  useEffect(() => {
    if (!props.data) return;
  
    let scatterplotData = [];
    props.data.forEach(el => {
      if (!isNaN(el.financials[x]) && !isNaN(el.financials[y])){
        scatterplotData.push({
            x: Number(el.financials[x]),
            y: Number(el.financials[y]),
            size: Number(el.financials[size]),
            ID: el.id,
            Address: el.address,
            data: el
          });
      }
    });

    let lowerLimit, upperLimit;
    // filter data according to x axis zoom slider
    let xMax = Math.max(...scatterplotData.map(o => o.x));
    lowerLimit = (xAxisRange[0]/100)*xMax;
    upperLimit = (xAxisRange[1]/100)*xMax;
    if (!isNaN(upperLimit) && !isNaN(lowerLimit)) {
      scatterplotData = scatterplotData.filter( o => o.x >= lowerLimit && o.x <= upperLimit);
    }
    // filter data according to y axis zoom slider
    let yMax = Math.max(...scatterplotData.map(o => o.y));
    lowerLimit = (yAxisRange[0]/100)*yMax;
    upperLimit = (yAxisRange[1]/100)*yMax;
    if (!isNaN(upperLimit) && !isNaN(lowerLimit)) {
      scatterplotData = scatterplotData.filter( o => o.y >= lowerLimit && o.y <= upperLimit);
    }

    // min max x filter
    if ((minX !== '') && (maxX !== '')) {
      scatterplotData = scatterplotData.filter( o => o.x >= minX && o.x <= maxX);
    }
    // min max y filter
    if ((minY !== '') && (maxY !== '')) {
      scatterplotData = scatterplotData.filter( o => o.y >= minY && o.y <= maxY);
    }

    setData(scatterplotData);

  }, [x, y, size, xAxisRange, yAxisRange, minX, maxX, minY, maxY, props]);

  const config = {
    appendPadding: 0,
    data,
    xField: 'x',
    yField: 'y',
    sizeField: 'size',
    size: sizeArray,
    shape: 'circle',
    pointStyle: {
      fillOpacity: 0.8,
      stroke: '#bbb',
    },
    xAxis: {
      grid: {
        line: {
          style: {
            stroke: '#eee',
          },
        },
      },
      line: {
        style: {
          stroke: '#aaa',
        },
      },
      label: {
        formatter: (v) => `${decimalMap[x] ? Number(v).toFixed(decimalMap[x]) : Math.round(Number(v))}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    yAxis: {
      line: {
        style: {
          stroke: '#aaa',
        },
      },
      label: {
        formatter: (v) => `${decimalMap[y] ? Number(v).toFixed(decimalMap[y]) : Math.round(Number(v))}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    tooltip: {
      customContent: (title, items) => {
        const data = items[0]?.data || {};
        return (
          <Box sx={{paddingX: 1, paddingY: 1.5}}>
            <Stack spacing={2}>
              {
                ['ID', 'Address', 'x', 'y', 'size'].map((node, index) => (
                  <Stack key={index} direction={'row'} spacing={1} alignItems='center'>
                    <Typography variant='caption' sx={{whiteSpace: 'nowrap'}}>{node === 'x' ? fieldMap[x] : node === 'y' ? fieldMap[y] : node}:</Typography>
                    <Typography variant='caption' sx={{whiteSpace: 'nowrap'}}>{data[node] ? data[node].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : data[node]}</Typography>
                  </Stack>
                ))
              }
            </Stack>
          </Box>
          )
      }
    },
  };
  return (
    <Box sx={{p:5}}>
      <Stack spacing={3}>
        <Typography variant='h6' fontWeight={600}>Bubble Chart</Typography>
        <Stack spacing={5} sx={{position: 'relative'}}>
          <Box sx={{width: '100%'}}>
            <Box sx={{width: '100%'}}>
              <Stack direction={'row'} justifyContent='space-between' alignItems={'center'} spacing={2} sx={{mb: 2}}>
                <FormControl variant="outlined" size="small" sx={filterStyle}>
                  <InputLabel id="label-y">Y-axis</InputLabel>
                  <Select
                    label="Y-axis"
                    labelId="label-y"
                    id="select-y"
                    value={y}                   
                    onChange={handleChangeY}
                  >
                    <MenuItem value={'IRR'}>IRR</MenuItem>
                    <MenuItem value={'payback_period'}>Capex Payback</MenuItem>
                    <MenuItem value={'total_gross_project_cost'}>Capex Asset</MenuItem>
                    <MenuItem value={'net_present_value'}>NPV Estimated Capex</MenuItem>
                    <MenuItem value={'npv_estimated_customer_ppa'}>NPV Estimated PPA</MenuItem>
                    <MenuItem value={'ppa_kwh_rate'}>PPA</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" size="small" sx={filterStyle}>
                  <InputLabel id="label-x">X-axis</InputLabel>
                  <Select
                    label="X-axis"
                    labelId="label-x"
                    id="select-x"
                    value={x}
                    onChange={handleChangeX}
                  >
                    <MenuItem value={'IRR'}>IRR</MenuItem>
                    <MenuItem value={'payback_period'}>Capex Payback</MenuItem>
                    <MenuItem value={'total_gross_project_cost'}>Capex Asset</MenuItem>
                    <MenuItem value={'net_present_value'}>NPV Estimated Capex</MenuItem>
                    <MenuItem value={'npv_estimated_customer_ppa'}>NPV Estimated PPA</MenuItem>
                    <MenuItem value={'ppa_kwh_rate'}>PPA</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" size="small" sx={filterStyle}>
                  <InputLabel id="label-size">Point Size Variable</InputLabel>
                  <Select
                    label="Point Size Variable"
                    labelId="label-size"
                    id="select-size"
                    value={size}
                    onChange={handleChangeSize}
                  >
                    <MenuItem value={'IRR'}>IRR</MenuItem>
                    <MenuItem value={'payback_period'}>Capex Payback</MenuItem>
                    <MenuItem value={'total_gross_project_cost'}>Capex Asset</MenuItem>
                    <MenuItem value={'net_present_value'}>NPV Estimated Capex</MenuItem>
                    <MenuItem value={'npv_estimated_customer_ppa'}>NPV Estimated PPA</MenuItem>
                    <MenuItem value={'ppa_kwh_rate'}>PPA</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Stack direction={'row'} justifyContent='space-between' alignItems={'center'} spacing={5} sx={{mb: 2}}>
                <Box sx={filterStyle}>
                  <Typography variant='caption' color='text.secondary'>Point Size</Typography>
                  <Slider defaultValue={50}
                  value={pointSize}
                  onChange={handleChangePointSize}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  step={1}
                  max={4}
                  min={1}
                  marks
                  color='secondary'
                  />
                </Box>
                <Box sx={filterStyle}>
                  <Typography variant='caption' color='text.secondary'>X Axis Zoom</Typography>
                  <Slider
                  getAriaLabel={() => 'Minimum distance'}
                  value={xAxisRange}
                  onChange={handleChangeXAxisRange}
                  valueLabelDisplay="auto"
                  step={10}
                  marks
                  disableSwap
                  color='secondary'
                  />
                </Box>
                <Box sx={filterStyle}>
                  <Typography variant='caption' color='text.secondary'>Y Axis Zoom</Typography>
                  <Slider
                  getAriaLabel={() => 'Minimum distance'}
                  value={yAxisRange}
                  onChange={handleChangeYAxisRange}
                  valueLabelDisplay="auto"
                  step={10}
                  marks
                  disableSwap
                  color='secondary'
                  />
                </Box>
              </Stack>
              <Box>
                <Scatter {...config} 
                  onReady={(plot) => {
                    plot.on('element:click', (event) => {
                      window.open(`https://staging.gridmarket.com/project/${props.project}/building/${event.data.data.ID}`, '_blank');
                    });
                  }}
                />
                <Box>
                  <Typography variant='subtitle2' sx={{position: 'absolute', left: -50, top: '50%', transform: 'scaleX(-1) scaleY(-1)', writingMode: 'vertical-rl'}}>{fieldMap[y]}</Typography>
                  <Typography variant='subtitle2' sx={{position: 'absolute', left: '50%', bottom: -50, }}>{fieldMap[x]}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Stack>
        <BubbleplotAdvanceFilters data={{filterStyle}}/>
        <BubbleplotTable data={data} width={'100%'}/>
      </Stack>
    </Box>
  );
};

export default React.memo(Bubbleplot);