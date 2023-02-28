import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Container, CssBaseline} from "@mui/material";
import AddCategory from "./containers/AddCategory/AddCategory";
import Categories from "./containers/Categories/Categories";
import EditCategory from "./containers/EditCategory/EditCategory";
import Navbar from "./components/Navbar/Navbar";
import AddTransaction from "./containers/AddTransaction/AddTransaction";
import Home from "./containers/Home/Home";


function App() {
  return (
    <>
      <CssBaseline/>
      <header>
        <Navbar/>
      </header>
      <Container sx={{mt: 5}}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/categories" element={<Categories/>}/>
          <Route path="/categories/add-category" element={<AddCategory/>}/>
          <Route path="/categories/edit-category/:id" element={<EditCategory/>}/>
          <Route path="/add-transaction" element={<AddTransaction/>}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;
