import React, { Component } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import News from './components/News';
export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes >
            <Route exact path='/' element={<News pageSize={6} country={"in"} category={"sports"}/>} ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
