import * as React from 'react';
import Bubbleplot from './components/bubbleplot/bubbleplot';
import BoxplotComponent from './components/boxPlot';
import axios from 'axios';
import { httpMethod } from '../../core/constants';
import { Box, Button, Divider, Stack, TextField } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ViolinplotComponent from './components/violinplot';

function ProductionCharts() {
  const [data, setData] = React.useState({});
  const { id } = useParams();
  const [project, setProject] = React.useState(id);
  const navigate = useNavigate();
  React.useEffect(()=> {
    setData({});
    let getData = async () => {
      try {
        const res = await axios({
          method: httpMethod.get,
          url: `https://staging.gridmarket.com/e2e-api/api/project/${id}/financials?key=9pibbJMY7DyK7gEjf7Fc`,
        });
        res.data.buildings = res.data.buildings.filter(node => node.financials);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);
  function handleProjectChange(event){
    setProject(event.target.value);
  }
  function fetchProjectData(){
    navigate(`/project/${project}`);
  }
  return (
    <Stack>
        <Box sx={{padding: 5, height: '100%'}}>
            <Stack direction='row' mb={5} mt={2} spacing={2} alignItems={'end'} sx={{maxWidth: '500px'}}>
              <TextField value={project} onChange={handleProjectChange} id="search-id" label="Project ID" variant="outlined" size="small" fullWidth/>
              <Button onClick={fetchProjectData} variant="contained" size="medium" sx={{height: 'fit-content', textTransform:'none'}}>Search</Button>
            </Stack>
            {
              data.buildings &&
              <Stack spacing={5}>
                <Bubbleplot project={id} data={data.buildings}/>
                <Divider />
                <BoxplotComponent data={data.buildings}/>
                <Divider />
                <ViolinplotComponent data={data.buildings}/>
              </Stack>
            }
        </Box>
    </Stack>
  );
}

export default ProductionCharts;