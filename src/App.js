import { Routes, Route, Navigate, useLocation, useNavigate, withRouter } from 'react-router-dom';
import React, { useState, useEffect, Suspense, useRef, useContext } from "react";
import './App.css';
import "./i18n";
import { useDispatch, useSelector } from 'react-redux'
import SignIn from './pages/auth/signin';
import SignUp from './pages/auth/signup';
import Forgot from './pages/auth/forgot';

import Product from './pages/products';
import Menu from './pages/menu';
import MenuEdit from './pages/menuedit';
import Company from './pages/company';
import User from './pages/user';

import Sortable from './components/MenuEdit/Sortable';

import {
  getAllCategory, getAllWineColor, getAllBottleSize, getAllCountry, getTotalRegion, getAllGlobalProductType,
  getTotalSubRegion, getAllGrape, getAllAroma, getAllFood, getAllAllergy, getAllClosureType, getAllTaste
} from './redux/locationReducer';
import { getTotalProducer } from './redux/producerReducer';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllWineColor());
    dispatch(getAllBottleSize());
    dispatch(getAllCountry());
    dispatch(getTotalRegion());
    dispatch(getTotalSubRegion());
    dispatch(getAllGrape());
    dispatch(getAllAroma());
    dispatch(getAllFood());
    dispatch(getAllAllergy());
    dispatch(getAllClosureType());
    dispatch(getAllTaste());
    dispatch(getTotalProducer());
    dispatch(getAllGlobalProductType());
  }, [])

  return (
    <Suspense fallback="loading">
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/products" element={<Product />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menuedit" element={<MenuEdit />} />
          <Route path="/company" element={<Company />} />
          <Route path="/user" element={<User />} />

          <Route path="/sort" element={<Sortable />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
