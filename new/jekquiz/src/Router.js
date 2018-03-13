import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './main.css'
import Screens from './screens'

const Router = () => (
  <BrowserRouter>
    <Screens.Home />
  </BrowserRouter>
)

export default Router
