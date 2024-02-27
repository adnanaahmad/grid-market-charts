import React, { useState, useEffect } from 'react';
import { Violin } from '@ant-design/plots';
import { Box, Stack, Typography } from '@mui/material';

function ViolinplotComponent(props) {
  const [data, setData] = useState([]);
  const [dataPoints, setDataPoints] = useState({});

  useEffect(() => {
    if (!props.data) return;
    let vdata = [];
    let dPoints = {'Solar': 0, 'Battery': 0, 'CHP': 0, 'Fuel Cell': 0};
    props.data.forEach((node, index) => {
      if(node.financials['pv_kw'] > 0) {
        vdata.push({
          x: 'Solar',
          y: node.financials['pv_kw']
        });
        dPoints['Solar']++;
      }
      if(node.financials['battery_kwh'] > 0) {
        vdata.push({
          x: 'Battery',
          y: node.financials['battery_kwh']
        });
        dPoints['Battery']++;
      }
      if(node.financials['chp_kw'] > 0) {
        vdata.push({
          x: 'CHP',
          y: node.financials['chp_kw']
        });
        dPoints['CHP']++;
      }
      if(node.financials['fuel_cell_kw'] > 0) {
        vdata.push({
          x: 'Fuel Cell',
          y: node.financials['fuel_cell_kw']
        });
        dPoints['Fuel Cell']++;
      }
    });

    setData([...vdata]);
    setDataPoints(dPoints);

  }, [props.data]);

  const config = {
    data: data,
    xField: 'x',
    yField: 'y',
    yAxis: {
      minLimit: 0,
      min: 0,
      label: {
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    tooltip: {
      customContent: (title, items) => {
        const data = items[0]?.data || {};
        const color = items[0]?.color || '#174c83';
        return (
          <Box sx={{paddingX: 1, paddingY: 1.5}}>
            <Stack spacing={2}>
              <div>{data.x} ({dataPoints[data.x]})</div>
              {
                ['low', 'high', 'q1', 'q3', 'median'].map((node, index) => (
                  <Stack key={index} direction={'row'} spacing={1} alignItems='center'>
                    <div style={{background: color, height: 10, width: 10, borderRadius: 10}}></div>
                    <div>{node}: </div>
                    <div>{data[node] ? (node === 'median' ? data[node][0] : data[node]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : data[node]}</div>
                  </Stack>
                ))
              }
            </Stack>
          </Box>
          )
      }
    },
  };

  return(
    <Box sx={{p: 5}}>
      <Stack spacing={3}>
        <Typography variant='h6' fontWeight={600}>Violin</Typography>
        <Violin {...config} />
      </Stack>
    </Box>
  )
};

export default React.memo(ViolinplotComponent);