import { createSlice } from "@reduxjs/toolkit"

export const TODO_LIST_SLICE_NAME = 'todoList'

const initialState = [
    {
        id: 0,
        name: "Learn ReactJS",
        priority: "High",
        completed: false,
      },
      {
        id: 1,
        name: "Learn NextJS",
        priority: "Medium",
        completed: false,
      },
      {
        id: 2,
        name: "Learn JavaScript",
        priority: "Low",
        completed: true,
      },
]

const todoListSlice = createSlice({
    name: TODO_LIST_SLICE_NAME,
    initialState,
    reducers: {
        addNewTodo: (state, action) => {
          state.push(action.payload)
        },
        toggleCompleted: (state, action) => {
          const index = state.findIndex(state => state.id === action.payload)
          state[index].completed = !state[index].completed
        }
    }
})

export const {addNewTodo, toggleCompleted} = todoListSlice.actions
export default todoListSlice.reducer