import axios from "axios"


const getTodoList = () => {
    return axios.get('https://63f81a221dc21d5465b9898b.mockapi.io/api/todolist')
    .then(res => res.data)
    .catch(err => console.log(err))
}

const getTodoListPage = (page, limit) => {
    return axios.get(`https://63f81a221dc21d5465b9898b.mockapi.io/api/todolist?page=${page}&limit=${limit}`)
    .then(res => res)
    .catch(err => console.log(err))
}

const addNewTodo = (data) => {
    return axios.post('https://63f81a221dc21d5465b9898b.mockapi.io/api/todolist', data)
    .then(res => res)
    .catch(err => console.log(err))
}

const updateTodo = (data) => {
    return axios.put(`https://63f81a221dc21d5465b9898b.mockapi.io/api/todolist/${data.id}`, data)
    .then(res => res)
    .catch(err => console.log(err))
}

export {getTodoList, getTodoListPage, addNewTodo, updateTodo}