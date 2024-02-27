import React, { useState, useEffect } from 'react';
import { Scatter } from '@ant-design/plots';
import sdata from '../data/portfolio.json';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Slider, Stack, Typography } from '@mui/material';

const fieldMap = {
  IRR: 'IRR',
  Capex_Payback: 'Capex Payback',
  Capex_Asset: 'Capex Asset',
  NPV_estimated_capex: 'NPV Estimated Capex',
  NPV_estimated_PPA: 'NPV Estimated PPA',
  PPA: 'PPA'
}

export default function Bubbleplot () {
  const [data, setData] = useState([]);
  const [size, setSize] = React.useState('IRR');
  const [x, setX] = React.useState('IRR');
  const [y, setY] = React.useState('Capex_Payback');
  const [sizeArray, setSizeArray] = React.useState([4,30]);

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

  React.useMemo(() =>
  (() => {
    const sizeMap = {
      1: [2, 10],
      2: [2.5, 15],
      3: [3, 20],
      4: [4, 30]
    };
    setSizeArray(sizeMap[pointSize]);

  })(), [pointSize]);
  const handleChangePointSize = (event, val, activeThumb) => {
    setPointSize(val);
  }


  useEffect(() => {
    let scatterplotData = [];
    sdata.forEach(el => {
      if (!isNaN(el[x]) && !isNaN(el[y])){
        scatterplotData.push({
            x: Number(el[x]),
            y: Number(el[y]),
            size: Number(el[size])
          });
      }
    });
    setData(scatterplotData);
  }, [x, y, size]);

  const config = {
    appendPadding: 30,
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
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    yAxis: {
      line: {
        style: {
          stroke: '#aaa',
        },
      },
      label: {
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    tooltip: {
      customContent: (title, items) => {
        const data = items[0]?.data || {};
        const color = items[0]?.color || '#174c83';
        //let val = data.solar_gen ?  data.solar_gen.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : data.solar_gen
        //console.log(data, items);
        return (
          <Box sx={{paddingX: 1, paddingY: 1.5}}>
            <Stack spacing={2}>
              {
                Object.keys(data).map((node, index) => (
                  <Stack key={index} direction={'row'} spacing={1} alignItems='center'>
                    <div style={{background: color, height: 10, width: 10, borderRadius: 10}}></div>
                    <div>{node === 'x' ? fieldMap[x] : node === 'y' ? fieldMap[y] : node}: </div>
                    <div>{data[node] ? data[node].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : data[node]}</div>
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
    <div style={{direction: 'row', display: 'flex', width: '100%', marginBottom: '100px'}}>
      <div style={{margin: 'auto'}}>{fieldMap[y]}</div>
      <div style={{width: '100%'}}>
      <Box>
        <Stack sx={{ maxWidth: 400 }} spacing={2}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="label-y">Y-axis</InputLabel>
            <Select
              labelId="label-y"
              id="select-y"
              value={y}
              onChange={handleChangeY}
            >
              <MenuItem value={'IRR'}>IRR</MenuItem>
              <MenuItem value={'Capex_Payback'}>Capex Payback</MenuItem>
              <MenuItem value={'Capex_Asset'}>Capex Asset</MenuItem>
              <MenuItem value={'NPV_estimated_capex'}>NPV Estimated Capex</MenuItem>
              <MenuItem value={'NPV_estimated_PPA'}>NPV Estimated PPA</MenuItem>
              <MenuItem value={'PPA'}>PPA</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="label-x">X-axis</InputLabel>
            <Select
              labelId="label-x"
              id="select-x"
              value={x}
              onChange={handleChangeX}
            >
              <MenuItem value={'IRR'}>IRR</MenuItem>
              <MenuItem value={'Capex_Payback'}>Capex Payback</MenuItem>
              <MenuItem value={'Capex_Asset'}>Capex Asset</MenuItem>
              <MenuItem value={'NPV_estimated_capex'}>NPV Estimated Capex</MenuItem>
              <MenuItem value={'NPV_estimated_PPA'}>NPV Estimated PPA</MenuItem>
              <MenuItem value={'PPA'}>PPA</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="label-size">Life time capital expenditure size</InputLabel>
            <Select
              labelId="label-size"
              id="select-size"
              value={size}
              onChange={handleChangeSize}
            >
              <MenuItem value={'IRR'}>IRR</MenuItem>
              <MenuItem value={'Capex_Payback'}>Capex Payback</MenuItem>
              <MenuItem value={'Capex_Asset'}>Capex Asset</MenuItem>
              <MenuItem value={'NPV_estimated_capex'}>NPV Estimated Capex</MenuItem>
              <MenuItem value={'NPV_estimated_PPA'}>NPV Estimated PPA</MenuItem>
              <MenuItem value={'PPA'}>PPA</MenuItem>
            </Select>
          </FormControl>
          <Stack>
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
            />
          </Stack>
        </Stack>
        <Scatter {...config} />
      </Box>
        <div style={{marginTop: 2, margin: 'auto', textAlign: 'center'}}>{fieldMap[x]}</div>
      </div>
    </div>
  );
};
