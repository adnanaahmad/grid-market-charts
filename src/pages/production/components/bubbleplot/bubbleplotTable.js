import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Collapse, Stack, TableHead } from '@mui/material';
import { useSelector } from 'react-redux';
import BubbleplotTableFilters from './bubbleplotTableFilters';


function BubbleplotTable(props) {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    const tableFilters = useSelector((state) => state.bubbleplotSlice.tableFilters);
    const {minIRR, maxIRR, minCP, maxCP, minCA, maxCA, minNPVEC, maxNPVEC, minNPVEP, maxNPVEP, minPPA, maxPPA} = tableFilters;
    const applyTableFilter = (minVal, maxVal, property, element) => {
        if (minVal !== '' && maxVal !== '') {
            return element.data.financials[property] >= minVal && element.data.financials[property] <= maxVal;
        } else {
            return element;
        }
    }

    return (
        <React.Fragment>
            <Button onClick={handleExpandClick} variant="text" color='secondary' sx={{width: 'fit-content', textTransform: 'none', fontSize: 'medium'}}>
                {expanded ? 'Hide' : 'Show'} Table
            </Button>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Stack spacing={5}>
                    <BubbleplotTableFilters/>
                    <Paper sx={{width: props.width}}> 
                        <TableContainer sx={{ maxHeight: 720 }}>
                            <Table aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Address</TableCell>
                                    <TableCell align="right">Building ID</TableCell>
                                    <TableCell align="right">IRR</TableCell>
                                    <TableCell align="right">Capex Payback</TableCell>
                                    <TableCell align="right">Capex Asset</TableCell>
                                    <TableCell align="right">NPV Estimated Capex</TableCell>
                                    <TableCell align="right">NPV Estimated PPA</TableCell>
                                    <TableCell align="right">PPA</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                    props.data
                                    .filter( element => applyTableFilter(minIRR, maxIRR, 'IRR', element))
                                    .filter( element => applyTableFilter(minCP, maxCP, 'payback_period', element))
                                    .filter( element => applyTableFilter(minCA, maxCA, 'total_gross_project_cost', element))
                                    .filter( element => applyTableFilter(minNPVEC, maxNPVEC, 'net_present_value', element))
                                    .filter( element => applyTableFilter(minNPVEP, maxNPVEP, 'npv_estimated_customer_ppa', element))
                                    .filter( element => applyTableFilter(minPPA, maxPPA, 'ppa_kwh_rate', element))
                                    .map(({data:node}) => (
                                        <TableRow
                                        key={node.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell component="th" scope="row">
                                            {node.address}
                                        </TableCell>
                                        <TableCell align="right">{node.id}</TableCell>
                                        <TableCell align="right">{Number(node.financials.IRR).toFixed(1)}%</TableCell>
                                        <TableCell align="right">{Number(node.financials.payback_period).toFixed(1)}</TableCell>
                                        <TableCell align="right">{`${Math.round(Number(node.financials.total_gross_project_cost))}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)} USD</TableCell>
                                        <TableCell align="right">{`${Math.round(Number(node.financials.net_present_value))}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)} USD</TableCell>
                                        <TableCell align="right">{`${Math.round(Number(node.financials.npv_estimated_customer_ppa))}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)} USD</TableCell>
                                        <TableCell align="right">{Number(node.financials.ppa_kwh_rate).toFixed(2)} cents</TableCell>
                                        </TableRow>
                                    ))
                                }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Stack>
            </Collapse>
        </React.Fragment>
    );
}
export default React.memo(BubbleplotTable);