import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />   
      <AppRoutes />
      <Footer/>
    </BrowserRouter>
  );
};

export default App;