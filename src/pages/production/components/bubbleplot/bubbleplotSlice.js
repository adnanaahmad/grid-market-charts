import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  advanceFilters: {
    minX: '',
    maxX: '',
    minY: '',
    maxY: ''
  },
  tableFilters: {
    minIRR: '',
    maxIRR: '',
    minCP: '',
    maxCP: '',
    minCA: '',
    maxCA: '',
    minNPVEC: '',
    maxNPVEC: '',
    minNPVEP: '',
    maxNPVEP: '',
    minPPA: '',
    maxPPA: ''
  }
}

export const bubbleplotSlice = createSlice({
  name: 'bubbleplotSlice',
  initialState,
  reducers: {
    setAdvanceFilters: (state, action) => {
      state.advanceFilters = action.payload.advanceFilters;
    },
    setTableFilters: (state, action) => {
      state.tableFilters = action.payload.tableFilters;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAdvanceFilters, setTableFilters } = bubbleplotSlice.actions

export default bubbleplotSlice.reducer;