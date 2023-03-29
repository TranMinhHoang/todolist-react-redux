import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    searchText: '',
    status: 'All',
    prioritys: []
}

export const FILTER_SLICE_NAME = 'filter'

const filterSlice = createSlice({
    name: FILTER_SLICE_NAME,
    initialState,
    reducers: {
        filterByText: (state, action) => {
            state.searchText = action.payload
        },
        filterByStatus: (state, action) => {
            state.status = action.payload
        },
        filterByPriority: (state, action) => {
            const prioritys = []
            action.payload.forEach(priority => {
                prioritys.push(priority.title)
            })
            state.prioritys = [...prioritys]
        }
    }
})

export const {filterByText, filterByStatus, filterByPriority} = filterSlice.actions
export default filterSlice.reducer