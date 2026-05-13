import React from "react";
import { Routes, Route } from "react-router-dom";
import RoomDetails from "./pages/RoomDetails";
import Home from '../src/components/Home'
import Rooms from '../src/components/Rooms.jsx'
import SearchBar from "./pages/SearchBar";
import Login from '../src/components/Login'
import ProviderSignup from "./components/ProviderSignup";
import ProviderDashboard from "./pages/ProviderDashboard";
import Dashboard from '../src/pages/Dashboard'
import AddListing from "./pages/AddListing";
import List from "./pages/List";
import Contact from "./pages/Contact";
import ProviderLogin from "./pages/ProviderLogin";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/Home" element={<Home />} />
         <Route path="/RoomDetails/:id" element={<RoomDetails />} />
        <Route path="/SearchBar" element={<SearchBar />} />
      <Route path="/Rooms" element={<Rooms />} />
      <Route path="/Login" element={<Login />} />
                 <Route path="/ProviderDashboard" element={<ProviderDashboard />} />
    <Route path="/AddListing" element={<AddListing />} />
         <Route path="/ProviderSignup" element={<ProviderSignup />} />
              <Route path="/Dashboard" element={<Dashboard />} />
<Route path="/List" element={<List />} /> 
              <Route path="/Contact" element={<Contact />} />
               <Route path="/ProviderLogin" element={<ProviderLogin />} />

    </Routes>
  );
};

export default AppRoutes;