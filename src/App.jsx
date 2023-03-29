
import { Box, Container } from "@mui/material";
import Filter from './components/Filter'
import TodoList from './components/TodoList'
import "./App.css";

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm" sx={{my:'30px'}}>
        <Box
          sx={{
            width: "100%",
            boxShadow: 'rgb(191, 191, 191) 0px 0px 10px 4px',
            borderRadius: '4px',
            padding: '16px'
          }}
        >
          <h1 className="text-center text-4xl font-bold uppercase">Todo list</h1>
          <Filter />
      <TodoList />
        </Box>
      </Container>
    </div>
  );
}

export default App;
