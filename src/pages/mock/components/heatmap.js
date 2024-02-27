import React, { useState, useEffect } from 'react';
import { Heatmap } from '@ant-design/plots';
import hdata from '../data/individual.json';
import { Box, Stack, Typography } from '@mui/material';

export default function HeatmapExample() {
  const [data, setData] = useState([]);

  useEffect(() => {

    let heatmapData = hdata.map((node) => {
      return {
          'hour': node.hour,
          'day': node.day,
          'solar_gen': Number(node['solar_gen'])
      }
    });
    // let h = [...heatmapData];
    // setData(h.slice(1,274));

    // setTimeout(()=> {
    //   setData(heatmapData);
    // }, 5000);
    setData(heatmapData);

  }, []);

  const config = {
    width: 650,
    height: 500,
    autoFit: true,
    data,
    xField: 'day',
    yField: 'hour',
    colorField: 'solar_gen',
    color: ['#174c83', '#7eb6d4', '#efefeb', '#efa759', '#9b4d16'],
    legend: {
      layout: 'vertical',
      position: 'right',
      title: {
        text: 'solar_gen'
      }
    },
    meta: {
      'day': {
        type: 'cat',
      },
      'hour': {
        type: 'cat',
      },
    },
    yAxis: {
      label: {
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    xAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    tooltip:{
      customContent: (title, items) => {
        const data = items[0]?.data || {};
        const color = items[0]?.color || '#174c83';
        let val = data.solar_gen ?  data.solar_gen.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : data.solar_gen
        console.log(data, items);
        return (
          <Box sx={{paddingX: 1, paddingY: 1.5}}>
            <Stack spacing={2}>
              <div>{data.day}</div>
              <Stack direction={'row'} spacing={1} alignItems='center'>
                <div style={{background: color, height: 10, width: 10, borderRadius: 10}}></div>
                <div>solar_gen:</div>
                <div>{val} kWh</div>
              </Stack>
            </Stack>
          </Box>
          )
        // {hour: 14, day: 332, solar_gen: 31629}

      }
    }
  };

  return (
    <div>
      <div style={{ fontWeight: 500, fontSize: 'large', textAlign: 'center', marginBottom: 10}}>Solar Generation(kWh)</div>
      <Heatmap {...config} />
    </div>
  );
};
