import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import Todo from "./Todo";
import listPriority from "./listPriority";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo, toggleCompleted } from "../redux/todoListSlice";
import { todoListFilter } from "../redux/selector";

function TodoList() {
  const filter = useSelector(state => state.filter)
  const todoList = useSelector(todoListFilter)
  const dispatch = useDispatch()
  const [newTodo, setNewTodo] = useState({
    id: uuidv4(),
    name: "",
    priority: "Medium",
    completed: false,
  })
  
  const handleToggleTodoList = (id) => () => {
    dispatch(toggleCompleted(id))
  };

  const handleChangeName = (e) => {
    setNewTodo(prev => ({
      ...prev,
      name: e.target.value
    }))
  }
  
  const handleChangePriority = (event) => {
    setNewTodo(prev => ({
      ...prev,
      priority: event.target.value
    }))
  };
  
  const handleAddNew = () => {
    dispatch(addNewTodo(newTodo))
    setNewTodo({
      id: uuidv4(),
      name: "",
      priority: "Medium",
      completed: false,
    })
  }

  return (
    <Box sx={{ pt: "8px" }}>
      <List
        sx={{ width: "100%", height: "240px", bgcolor: "background.paper", overflowY: 'auto' }}
      >
        {todoList.map((item) => {
          const labelId = item.id;

          return (
            <ListItem key={labelId} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggleTodoList(item.id)}
                dense
              >
                <Checkbox
                  edge="start"
                  checked={item.completed}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                  size="small"
                />
                <ListItemText
                  id={labelId}
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
      <Grid container spacing={0}>
        <Grid item xs={8}>
          <TextField
            id="outlined-basic"
            label="Add new"
            variant="outlined"
            size="small"
            // style={{
            //   borderRadius: 0
            // }}
            sx={{
              width: "100%",
              borderRadius: 0,
            }}
            InputProps={{
              className: "rounded-r-none",
            }}
            value={newTodo.name}
            onChange={handleChangeName}
          />
        </Grid>
        <Grid item xs={2.5}>
          <Select
            value={newTodo.priority}
            onChange={handleChangePriority}
            size="small"
            sx={{
              width: "100%",
              borderRadius: "0",
            }}
            defaultValue={newTodo.priority}
            inputProps={{
              className: 'h-[20.7px] flex items-center'
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
                    cursor: "pointer"
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
            }}
            variant="contained"
            onClick={handleAddNew}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TodoList;
