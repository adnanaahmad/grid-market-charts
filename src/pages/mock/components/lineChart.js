import React, { useState, useEffect, useMemo } from 'react';
import { Line } from '@ant-design/plots';
import lineData from '../data/individual.json';
import Box from '@mui/material/Box';
import { Button, Stack } from '@mui/material';
import Slider from '@mui/material/Slider';


const marks = [
  {
    value: 25,
    label: '.5',
  },
  {
    value: 50,
    label: '.75',
  },
  {
    value: 75,
    label: '1',
  },
  {
    value: 100,
    label: '1.25',
  },
];

function valuetext(value) {
  return `${value}`;
}

function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

export default function LineChartExample() {
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [to, setTo] = useState([]);
  const [liveGraph, setLiveGraph] = useState(false);

  useEffect(() => {
    if(originalData.length) {
      let max = Math.max(...originalData.map(o => o.x));
      setHighestX(max);
    }
  }, [data])
  //const [value2, setValue2] = React.useState([0, 100]);
  const [highestX, setHighestX] = React.useState(0);
  const [valueX, setValueX] = React.useState(100);
  //const minDistance = 10;
  // React.useMemo(() =>
  // (() => {
  //   let next = Math.round((value2[1]/100)*highestX);
  //   let prev = Math.round((value2[0]/100)*highestX);
  //   if (prev !== next) {
  //     console.log(prev, next);
  //     let cdata = originalData.filter(element => element.x <= next && element.x >= prev);
  //     setData([]);
  //     setTimeout(() => {
  //       setData(cdata);
  //     }, 300)
  //   }
  // })(), [value2]);
  React.useMemo(() =>
  (() => {
    setLiveGraph(false);
    let next = Math.round((valueX/100)*highestX);
    let prev = 0;
    if (prev !== next) {
      console.log(prev, next);
      let cdata = originalData.filter(element => element.x <= next && element.x >= prev);
      setData(cdata);
    }
  })(), [valueX]);
  const handleChangeX = (event, val, activeThumb) => {
    setValueX(val);
  }
  // const handleChange2 = (event, newValue, activeThumb) => {
  //   if (!Array.isArray(newValue)) {
  //     return;
  //   }
  //   if (newValue[1] - newValue[0] < minDistance) {
  //     if (activeThumb === 0) {
  //       const clamped = Math.min(newValue[0], 100 - minDistance);
  //       setValue2([clamped, clamped + minDistance]);
  //     } else {
  //       const clamped = Math.max(newValue[1], minDistance);
  //       setValue2([clamped - minDistance, clamped]);
  //     }
  //   } else {
  //     setValue2(newValue);
  //   }
  // };

  //  const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), []);


  useEffect(() => {
    const type = ['battery_output', 'original_load', 'solar_gen', 'net_load'];
    let cdata = [];
    lineData.forEach((element, index) => {
        type.forEach(graph => {
          cdata.push({
            x: index,
            y: Number(element[graph]),
            category: graph
          });
        })
    });
    setOriginalData(cdata);
    setData(cdata);
  }, []);

  function setChart(hours) {
    setLiveGraph(false);
    to.forEach(el => {
      window.clearTimeout(el);
    });
    if (hours === 8760) {
      setData(originalData);
    } else {
      let cdata = originalData.filter(element => element.x <= hours);
      setData(cdata);
    }
  }

  function liveData() {
    setLiveGraph(true);
    var i = 1;
    let next = 49;
    let prev = 25;
    let ccdata = originalData.filter(element => element.x <= next && element.x >= prev);
    setData(ccdata);
    function myLoop() {
     setTo([...to,
      setTimeout(function() {
        console.log('hello', i);
        i++;
        if (i < 50) {
          prev++;
          next++;
          let cdata = originalData.filter(element => element.x <= next && element.x >= prev);
          setData(cdata);
          myLoop();
        }
      }, 1000)])
    }
    myLoop();
  }

  const config = {
    data,
    padding: 'auto',
    xField: 'x',
    yField: 'y',
    seriesField: 'category',
    smooth: true,
  };

  const config1 = {
    ...config,
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
    tooltip: {
      formatter: (node) => ({
        name: node.category,
        value: node.y ?  node.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : node.y
      }),
      title: (v) => v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    // animation: {
    //   appear: {
    //     animation: 'path-in',
    //     duration: 5000,
    //   },
    // },
  }

  const config2 = {
    ...config
  }

  return (
    <div style={{direction: 'row', display: 'flex', width: '100%', marginBottom: '100px'}}>
      <div style={{width: '100%'}}>
        <Stack direction={'row'} spacing={3} sx={{mb:10}}>
          <Button onClick={() => liveData()} variant="outlined">Live</Button>
          <Button onClick={() => setChart(1*24)} variant="outlined">1D</Button>
          <Button onClick={() => setChart(7*24)} variant="outlined">7D</Button>
          <Button onClick={() => setChart(30*24)} variant="outlined">1M</Button>
          <Button onClick={() => setChart(180*24)} variant="outlined">6M</Button>
          <Button onClick={() => setChart(365*24)} variant="outlined">Max</Button>
        </Stack>
        <Box>
          {
            !liveGraph &&
            <Line {...config1} />
          }
          {
            liveGraph &&
            <Line {...config2} />
          }
        </Box>
        <div style={{marginTop: 2, margin: 'auto', textAlign: 'center'}}>Hour</div>
        <Box sx={{ width: 300 }}>
        {/* <Slider
        getAriaLabel={() => 'Minimum distance shift'}
        value={value2}
        onChange={handleChange2}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        /> */}
          <Slider defaultValue={50}
          value={valueX}
          onChange={handleChangeX}
          aria-label="Default"
          valueLabelDisplay="auto"
          step={10}
          marks
          />
        </Box>
      </div>
    </div>
  )
};
