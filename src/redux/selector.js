import { createSelector } from "@reduxjs/toolkit";

export const todoListSelector = (state) => state.todoList;
const searchTextSelector = (state) => state.filter.searchText;
const statusSelector = (state) => state.filter.status;
const prioritysSelector = (state) => state.filter.prioritys;

// export const todoListSelector = (state) => {
//     const todoListFilter = state.todoList.filter((todo) => {
//         return todo.name.includes(state.filter.searchText)
//     })
//     return todoListFilter
// }

export const todoListFilter = createSelector(
  todoListSelector,
  searchTextSelector,
  statusSelector,
  prioritysSelector,
  (todoList, searchText, status, prioritys) => {
    return todoList.filter((todo) => {
      if (status === "All") {
        return prioritys.length
          ? todo.name.toLowerCase().includes(searchText.toLowerCase()) && prioritys.includes(todo.priority)
          : todo.name.toLowerCase().includes(searchText.toLowerCase());
      }
      return (
        todo.name.toLowerCase().includes(searchText.toLowerCase()) &&
        (status === "Completed" ? todo.completed : !todo.completed) &&
        (prioritys.length ? prioritys.includes(todo.priority) : true)
      );
    });
  }
);
