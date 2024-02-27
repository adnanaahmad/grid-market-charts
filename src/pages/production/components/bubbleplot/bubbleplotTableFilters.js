import React from 'react';
import { Button, Collapse, Paper, Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setTableFilters } from './bubbleplotSlice';

const filterStyle = {
    flexGrow: 1,
    flexBasis: 0,
    margin: 1
}

function FiltersForBubblePlotTable() {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    // table filters
    const [minIRR, setMinIRR] = React.useState('');
    const [maxIRR, setMaxIRR] = React.useState('');
    const [minCP, setMinCP] = React.useState('');
    const [maxCP, setMaxCP] = React.useState('');
    const [minCA, setMinCA] = React.useState('');
    const [maxCA, setMaxCA] = React.useState('');
    const [minNPVEC, setMinNPVEC] = React.useState('');
    const [maxNPVEC, setMaxNPVEC] = React.useState('');
    const [minNPVEP, setMinNPVEP] = React.useState('');
    const [maxNPVEP, setMaxNPVEP] = React.useState('');
    const [minPPA, setMinPPA] = React.useState('');
    const [maxPPA, setMaxPPA] = React.useState('');

    const handleChangeTableFilters = (field, value) => {
        switch (field) {
            case "minIRR":
                setMinIRR(value);
                dispatch(setTableFilters({
                    tableFilters: {
                        minIRR: value, maxIRR, minCP, maxCP, minCA, maxCA, minNPVEC, maxNPVEC, minNPVEP, maxNPVEP, minPPA, maxPPA
                    }
                }));
                break;
            case "maxIRR":
                setMaxIRR(value);
                dispatch(setTableFilters({
                    tableFilters: {
                        minIRR, maxIRR: value, minCP, maxCP, minCA, maxCA, minNPVEC, maxNPVEC, minNPVEP, maxNPVEP, minPPA, maxPPA
                    }
                }));
                break;
            case "minCP":
                setMinCP(value);
                dispatch(setTableFilters({
                    tableFilters: {
                        minIRR, maxIRR, minCP: value, maxCP, minCA, maxCA, minNPVEC, maxNPVEC, minNPVEP, maxNPVEP, minPPA, maxPPA
                    }
                }));
                break;
            case "maxCP":
                setMaxCP(value);
                dispatch(setTableFilters({
                    tableFilters: {
                        minIRR, maxIRR, minCP, maxCP: value, minCA, maxCA, minNPVEC, maxNPVEC, minNPVEP, maxNPVEP, minPPA, maxPPA
                    }
                }));
                break;
            case "minCA":
                setMinCA(value);
                dispatch(setTableFilters({
                    tableFilters: {
                        minIRR, maxIRR, minCP, maxCP, minCA: value, maxCA, minNPVEC, maxNPVEC, minNPVEP, maxNPVEP, minPPA, maxPPA
                    }
                }));
                break;
            case "maxCA":
                setMaxCA(value);
                dispatch(setTableFilters({
                    tableFilters: {
                        minIRR, maxIRR, minCP, maxCP, minCA, maxCA: value, minNPVEC, maxNPVEC, minNPVEP, maxNPVEP, minPPA, maxPPA
                    }
                }));
                break;
            case "minNPVEC":
                setMinNPVEC(value);
                dispatch(setTableFilters({
                    tableFilters: {
                        minIRR, maxIRR, minCP, maxCP, minCA, maxCA, minNPVEC: value, maxNPVEC, minNPVEP, maxNPVEP, minPPA, maxPPA
                    }
                }));
                break;
            case "maxNPVEC":
                setMaxNPVEC(value);
                dispatch(setTableFilters({
                    tableFilters: {
                        minIRR, maxIRR, minCP, maxCP, minCA, maxCA, minNPVEC, maxNPVEC: value, minNPVEP, maxNPVEP, minPPA, maxPPA
                    }
                }));
                break;
            case "minNPVEP":
                setMinNPVEP(value);
                dispatch(setTableFilters({
                    tableFilters: {
                        minIRR, maxIRR, minCP, maxCP, minCA, maxCA, minNPVEC, maxNPVEC, minNPVEP: value, maxNPVEP, minPPA, maxPPA
                    }
                }));
                break;
            case "maxNPVEP":
                setMaxNPVEP(value);
                dispatch(setTableFilters({
                    tableFilters: {
                        minIRR, maxIRR, minCP, maxCP, minCA, maxCA, minNPVEC, maxNPVEC, minNPVEP, maxNPVEP: value, minPPA, maxPPA
                    }
                }));
                break;
            case "minPPA":
                setMinPPA(value);
                dispatch(setTableFilters({
                    tableFilters: {
                        minIRR, maxIRR, minCP, maxCP, minCA, maxCA, minNPVEC, maxNPVEC, minNPVEP, maxNPVEP, minPPA: value, maxPPA
                    }
                }));
                break;
            case "maxPPA":
                setMaxPPA(value);
                dispatch(setTableFilters({
                    tableFilters: {
                        minIRR: value, maxIRR, minCP, maxCP, minCA, maxCA, minNPVEC, maxNPVEC, minNPVEP, maxNPVEP, minPPA, maxPPA: value
                    }
                }));
                break;                            
            default:
        }
    }

    return (
        <Stack spacing={2}>
            <Button onClick={handleExpandClick} variant="text" color='secondary' sx={{width: 'fit-content', textTransform: 'none', fontSize: 'medium'}}>
                {expanded ? 'Hide' : 'Show'} Filters
            </Button>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Paper sx={{p:2}}>
                    <Stack spacing={2}>
                        <Stack flexDirection={'row'} justifyContent='space-between'>
                            <TextField
                            type="number"
                            label="Min IRR"
                            id="min-irr"
                            size="small"
                            value={minIRR}
                            sx={filterStyle}
                            onChange={(e) => handleChangeTableFilters('minIRR', e.target.value)}
                            />
                            <TextField
                            type="number"
                            label="Max IRR"
                            id="max-irr"
                            size="small"
                            value={maxIRR}
                            sx={filterStyle}
                            onChange={(e) => handleChangeTableFilters('maxIRR', e.target.value)}
                            />
                            <TextField
                            type="number"
                            label="Min Capex Payback"
                            id="min-cp"
                            size="small"
                            value={minCP}
                            sx={filterStyle}
                            onChange={(e) => handleChangeTableFilters('minCP', e.target.value)}
                            />
                            <TextField
                            type="number"
                            label="Max Capex Payback"
                            id="max-cp"
                            size="small"
                            value={maxCP}
                            sx={filterStyle}
                            onChange={(e) => handleChangeTableFilters('maxCP', e.target.value)}
                            />
                        </Stack>
                        <Stack flexDirection={'row'} justifyContent='space-between'>
                            <TextField
                            type="number"
                            label="Min Capex Asset"
                            id="min-ca"
                            size="small"
                            value={minCA}
                            sx={filterStyle}
                            onChange={(e) => handleChangeTableFilters('minCA', e.target.value)}
                            />
                            <TextField
                            type="number"
                            label="Max Capex Asset"
                            id="max-ca"
                            size="small"
                            value={maxCA}
                            sx={filterStyle}
                            onChange={(e) => handleChangeTableFilters('maxCA', e.target.value)}
                            />
                            <TextField
                            type="number"
                            label="Min NPV Estimated Capex"
                            id="min-npvec"
                            size="small"
                            value={minNPVEC}
                            sx={filterStyle}
                            onChange={(e) => handleChangeTableFilters('minNPVEC', e.target.value)}
                            />
                            <TextField
                            type="number"
                            label="Max NPV Estimated Capex"
                            id="max-npvec"
                            size="small"
                            value={maxNPVEC}
                            sx={filterStyle}
                            onChange={(e) => handleChangeTableFilters('maxNPVEC', e.target.value)}
                            />                             
                        </Stack>
                        <Stack flexDirection={'row'} justifyContent='space-between'>
                            <TextField
                            type="number"
                            label="Min NPV Estimated PPA"
                            id="min-npvep"
                            size="small"
                            value={minNPVEP}
                            sx={filterStyle}
                            onChange={(e) => handleChangeTableFilters('minNPVEP', e.target.value)}
                            />
                            <TextField
                            type="number"
                            label="Max NPV Estimated PPA"
                            id="max-npvep"
                            size="small"
                            value={maxNPVEP}
                            sx={filterStyle}
                            onChange={(e) => handleChangeTableFilters('maxNPVEP', e.target.value)}
                            />
                            <TextField
                            type="number"
                            label="Min PPA"
                            id="min-ppa"
                            size="small"
                            value={minPPA}
                            sx={filterStyle}
                            onChange={(e) => handleChangeTableFilters('minPPA', e.target.value)}
                            />
                            <TextField
                            type="number"
                            label="Max PPA"
                            id="max-ppa"
                            size="small"
                            value={maxPPA}
                            sx={filterStyle}
                            onChange={(e) => handleChangeTableFilters('maxPPA', e.target.value)}
                            />
                        </Stack>
                    </Stack>
                </Paper>
            </Collapse>
      </Stack>
    )
}
export default React.memo(FiltersForBubblePlotTable);