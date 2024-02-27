import React, { useState, useEffect } from 'react';
import { Violin } from '@ant-design/plots';
import dataOne from '../data/group_one.json';
import { Box, Stack } from '@mui/material';

export default function Violinplot() {
  const [data, setData] = useState([]);

  const [w, setW] = useState(false);

  useEffect(() => {
    let vdata = [];
    dataOne.forEach((el, index) => {
      vdata.push({
        x: el.Technology,
        y: el.usage
      })
    })
    let v = [...vdata];
    setData(v.slice(1, vdata.length/2));
    setTimeout(() => {
      setW(true);
    },1000)
    setTimeout(() => {
      setW(false);
      setData([...vdata]);
    },3000)

    //asyncFetch();
  }, []);

  const config = {
    //height: 500,
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
        //let val = data.solar_gen ?  data.solar_gen.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : data.solar_gen
        console.log(data, items);
        return (
          <Box sx={{paddingX: 1, paddingY: 1.5}}>
            <Stack spacing={2}>
              <div>{data.x}</div>
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
    <div style={{width: w ?'100%' : '99%'}}>
      <Violin {...config} />
    </div>
  )
};
