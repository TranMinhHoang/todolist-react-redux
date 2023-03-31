import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Pagination,
  Select,
  TextField,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import listPriority from "./listPriority";
import { useDispatch, useSelector } from "react-redux";
// import { addNewTodo, toggleCompleted } from "../redux/todoListSlice";
import { todoListFilter } from "../redux/selector";
import { getTodoList, getTodoListPage, addNewTodo, updateTodo } from "../apis/todoList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link } from "react-router-dom";
import classnames from "classnames";

const LIMIT = 3;
const TODO_LIST_KEY = 'todolist'

function TodoList() {
  // const todoList = useSelector(todoListFilter);
  const [newTodo, setNewTodo] = useState({
    id: uuidv4(),
    name: "",
    priority: "Medium",
    completed: false,
  });
  const queryClient = useQueryClient()
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchParamsObj = Object.fromEntries([...searchParams]);
  const page = Number(searchParamsObj.page) || 1;
  const [disableTodo, setDisableTodo] = useState(0)

  const { data: allTodoList } = useQuery({
    queryKey: [TODO_LIST_KEY],
    queryFn: () => getTodoList(),
  });

  const totalPage = Math.ceil(allTodoList?.length / LIMIT) || 0;

  const { data } = useQuery({
    queryKey: [TODO_LIST_KEY, page],
    queryFn: () => getTodoListPage(page, LIMIT),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (newTodo) => {
      return addNewTodo(newTodo);
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: (todo) => {
      return updateTodo(todo)
    }
  })

  
  const handleToggleTodoList = (todo) => () => {
    const newTodo = {
      ...todo,
      completed: !todo.completed
    }
    setDisableTodo(todo.id)
    updateTodoMutation.mutate(newTodo, {
      onSettled: () => {
        queryClient.invalidateQueries([TODO_LIST_KEY])
        setDisableTodo(0)
      }
    })

    // dispatch(toggleCompleted(id));
  };

  const handleChange = (name) => event => {
    setNewTodo((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };

  const handleAddNew = () => {
    // dispatch(addNewTodo(newTodo));
    mutate(newTodo, {
      onSuccess: () => {
        queryClient.invalidateQueries([TODO_LIST_KEY])
        setNewTodo({
          id: uuidv4(),
          name: "",
          priority: "Medium",
          completed: false,
        });
      },
    });
  };

  const todoList = data?.data?.filter((todo) => {
    if (filter.status === "All") {
      return filter.prioritys.length
        ? todo.name.toLowerCase().includes(filter.searchText.toLowerCase()) &&
            filter.prioritys.includes(todo.priority)
        : todo.name.toLowerCase().includes(filter.searchText.toLowerCase());
    }
    return (
      todo.name.toLowerCase().includes(filter.searchText.toLowerCase()) &&
      (filter.status === "Completed" ? todo.completed : !todo.completed) &&
      (filter.prioritys.length
        ? filter.prioritys.includes(todo.priority)
        : true)
    );
  });

  return (
    <Box sx={{ pt: "8px" }}>
      <List
        sx={{
          width: "100%",
          height: "190px",
          bgcolor: "background.paper",
        }}
      >
        {todoList?.map((item) => {
          const id = item.id;

          return (
            <ListItem key={id} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggleTodoList(item)}
                dense
                disabled={disableTodo === id}
              >
                <Checkbox
                  edge="start"
                  checked={item.completed}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": id }}
                  size="small"
                />
                <ListItemText
                  id={id}
                  primary={
                    <Todo
                      name={item.name}
                      completed={item.completed}
                      priority={item.priority}
                    />
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <div className="flex justify-center items-center">
        {page === 1 ? (
          <IconButton aria-label="arrow-left" size="large" disabled>
            <ArrowLeftIcon fontSize="inherit" />
          </IconButton>
        ) : (
          <Link to={`?page=${page - 1}`}>
            <IconButton aria-label="arrow-left" size="large">
              <ArrowLeftIcon fontSize="inherit" />
            </IconButton>
          </Link>
        )}
        {Array(totalPage)
          .fill(0)
          .map((_, index) => {
            const pageNumber = index + 1;
            const isActive = page === pageNumber;
            return (
              <Link
                key={pageNumber}
                className={classnames(
                  "h-8 w-8 rounded-full border border-black border-solid flex items-center justify-center m-1 hover:bg-blue-500 hover:text-white",
                  {
                    "bg-blue-500 text-white": isActive,
                  }
                )}
                to={`?page=${pageNumber}`}
              >
                {pageNumber}
              </Link>
            );
          })}
        {page === totalPage ? (
          <IconButton aria-label="arrow-right" size="large" disabled>
            <ArrowRightIcon fontSize="inherit" />
          </IconButton>
        ) : (
          <Link to={`?page=${page + 1}`}>
            <IconButton aria-label="arrow-right" size="large">
              <ArrowRightIcon fontSize="inherit" />
            </IconButton>
          </Link>
        )}
      </div>
      <Grid container spacing={0}>
        <Grid item xs={8}>
          <TextField
            id="outlined-basic"
            label="Add new"
            variant="outlined"
            size="small"
            sx={{
              width: "100%",
              borderRadius: 0,
            }}
            InputProps={{
              className: "rounded-r-none",
            }}
            value={newTodo.name}
            onChange={handleChange('name')}
          />
        </Grid>
        <Grid item xs={2.5}>
          <Select
            value={newTodo.priority}
            onChange={handleChange('priority')}
            size="small"
            sx={{
              width: "100%",
              borderRadius: "0",
            }}
            defaultValue={newTodo.priority}
            inputProps={{
              className: "h-[20.7px] flex items-center",
            }}
          >
            {listPriority.map((item, index) => (
              <MenuItem key={index} value={item.title}>
                <Chip
                  variant="filled"
                  label={item.title}
                  size="small"
                  sx={{
                    borderColor: item?.borderColor,
                    border: "1px solid",
                    backgroundColor: item.backgroundColor,
                    color: item.color,
                    cursor: "pointer",
                  }}
                />
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={1.5}>
          <Button
            sx={{
              height: "100%",
              width: "100%",
              borderTopLeftRadius: "0",
              borderBottomLeftRadius: "0",
              minWidth: "unset",
            }}
            variant="contained"
            onClick={handleAddNew}
            disabled = {isLoading}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TodoList;
