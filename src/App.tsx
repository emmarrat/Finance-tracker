import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Container, CssBaseline} from "@mui/material";
import AddCategory from "./containers/AddCategory/AddCategory";


function App() {
  return (
    <>
      <CssBaseline/>
      <header>
      </header>
      <Container sx={{mt: 5}}>
        <Routes>
          <Route path="/categories/add-category" element={<AddCategory/>}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;
