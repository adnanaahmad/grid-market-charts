import React from 'react';
import { Button, Collapse, Paper, Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAdvanceFilters } from './bubbleplotSlice';

function AdvanceFiltersForBubblePlot({data: {filterStyle}}) {
    const dispatch = useDispatch();
    filterStyle = {...filterStyle, ...{margin: 1}};
    // common filters
    const [minX, setMinX] = React.useState('');
    const [maxX, setMaxX] = React.useState('');
    const [minY, setMinY] = React.useState('');
    const [maxY, setMaxY] = React.useState('');
    const handleChangeXY = (field, value) => {
        switch (field) {
            case 'minX':
                setMinX(value);
                dispatch(setAdvanceFilters({advanceFilters:{minX: value, maxX, minY, maxY}}));
                break;
            case 'maxX':
                setMaxX(value);
                dispatch(setAdvanceFilters({advanceFilters:{minX, maxX: value, minY, maxY}}));
                break;
            case 'minY':
                setMinY(value);
                dispatch(setAdvanceFilters({advanceFilters:{minX, maxX, minY: value, maxY}}));
                break;
            case 'maxY':
                setMaxY(value);
                dispatch(setAdvanceFilters({advanceFilters:{minX, maxX, minY, maxY: value}}));
                break;        
            default:
        }
    }
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return (
        <Stack spacing={2}>
            <Button onClick={handleExpandClick} variant="text" color='secondary' sx={{width: 'fit-content', textTransform: 'none', fontSize: 'medium'}}>
                {expanded ? 'Hide' : 'Show'} Advance Filters
            </Button>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Paper sx={{p:2}}>
                    <Stack spacing={2}>
                        <Stack flexDirection={'row'} justifyContent='space-between'>
                            <TextField
                            type="number"
                            label="Min x"
                            id="min-x"
                            size="small"
                            value={minX}
                            sx={filterStyle}
                            onChange={(e) => handleChangeXY('minX', e.target.value)}
                            />
                            <TextField
                            type="number"
                            label="Max x"
                            id="max-x"
                            size="small"
                            value={maxX}
                            sx={filterStyle}
                            onChange={(e) => handleChangeXY('maxX', e.target.value)}
                            />                 
                            <TextField
                            type="number"
                            label="Min y"
                            id="min-y"
                            size="small"
                            value={minY}
                            sx={filterStyle}
                            onChange={(e) => handleChangeXY('minY', e.target.value)}
                            />
                            <TextField
                            type="number"
                            label="Max y"
                            id="max-y"
                            size="small"
                            value={maxY}
                            sx={filterStyle}
                            onChange={(e) => handleChangeXY('maxY', e.target.value)}
                            />                 
                        </Stack>
                    </Stack>
                </Paper>
            </Collapse>
      </Stack>
    )
}
export default React.memo(AdvanceFiltersForBubblePlot);