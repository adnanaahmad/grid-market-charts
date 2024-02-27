import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';
import barchartData from '../data/stacked_chart.json';
import { each, groupBy } from '@antv/util';

export default function StackedBar () {
  const [data, setData] = useState([]);
  const [annotations, setAnnotations] = useState([]);
  let formatter = (v) => v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  useEffect(() => {
    let bdata =[];
    let units = {
      'CapEx': '($)',
      'Savings': '($)',
      'Generation': '(kW)',
      'Demand Reduction': '(kW-month)',
      'CO2': '(kg)'
    }

    barchartData.forEach(x => {
      bdata.push({
        'Type': x.Type+units[x.Type],
        'pct': Number(x.pct),
        'Group': x.Group,
        'Spending': x.Spending,
      })
    });
    // const an = [];
    // each(groupBy(bdata, 'Type'), (values, k) => {
    //   const value = values.reduce((a, b) => a + b.pct, 0);
    //   an.push({
    //     type: 'text',
    //     position: [k, value],
    //     content: `${value}`,
    //     style: { textAlign: 'center', fontSize: 14, fill: 'rgba(0,0,0,0.85)' },
    //     offsetY: -10,
    //   });
    // });
    // setAnnotations(an);
    setData(bdata);

  }, []);

  const config = {
    data,
    isStack: true,
    isPercent: true,
    xField: 'Type',
    yField: 'pct',
    seriesField: 'Group',
    yAxis: {
      label: {
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    label: {
      position: 'middle',
      content: (item) => {
        return formatter(item.Spending);
      },
      layout: [
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
    },
    annotations,

  };

  return <Column {...config} />;
};
