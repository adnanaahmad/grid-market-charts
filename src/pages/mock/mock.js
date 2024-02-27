import * as React from 'react';
import LineChartExample from './components/lineChart';
import StackedBar from './components/stacked';
import HeatmapExample from './components/heatmap';
import BoxplotExample from './components/boxPlot';
import Violinplot from './components/violinplot';
import Bubbleplot from './components/bubbleplot';
import { Box, Stack } from '@mui/material';

function MockCharts() {
  return (
    <Stack>
        <Box style={{padding: 5, height: '100%'}}>
            <div style={{marginBottom: 100, marginLeft: 50, marginTop: 20, fontWeight: 500, fontSize: 'large', textDecoration: 'underline'}}>Mock Charts</div>
            <LineChartExample/>
            <Bubbleplot/>
            <div style={{ marginBottom: '100px'}}>
                <StackedBar/>
            </div>
            <div style={{ marginBottom: '100px', height: 500, width: '100%'}}>
                <Violinplot/>
            </div>
            <div style={{direction: 'row', display: 'flex', width: '100%', marginBottom: '100px'}}>
                <div style={{margin: 'auto'}}>Hour</div>
                <div style={{width: '100%'}}>
                <HeatmapExample/>
                <div style={{marginTop: 2, margin: 'auto', textAlign: 'center'}}>Day</div>
                </div>
            </div>
            <div>
                <BoxplotExample/>
            </div>
            <div style={{height: 200}}></div>
        </Box>
    </Stack>
  );
}

export default MockCharts;
