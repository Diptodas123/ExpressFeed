import React, { Component } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import News from './components/News';
export default class App extends Component {

  apiKey = process.env.REACT_APP_NEWS_API;

  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes >
            <Route exact path='/' element={<News apiKey={this.apiKey} key={"general"} pageSize={6} country={"in"} category={"general"} />} ></Route>
            <Route exact path='/business' element={<News apiKey={this.apiKey} key={"business"} pageSize={6} country={"in"} category={"business"} />} ></Route>
            <Route exact path='/entertainment' element={<News apiKey={this.apiKey} key={"entertainment"} pageSize={6} country={"in"} category={"entertainment"} />} ></Route>
            <Route exact path='/health' element={<News apiKey={this.apiKey} s key={"health"} pageSize={6} country={"in"} category={"health"} />} ></Route>
            <Route exact path='/science' element={<News apiKey={this.apiKey} key={"science"} pageSize={6} country={"in"} category={"science"} />} ></Route>
            <Route exact path='/sports' element={<News apiKey={this.apiKey} key={"sports"} pageSize={6} country={"in"} category={"sports"} />} ></Route>
            <Route exact path='/technology' element={<News apiKey={this.apiKey} key={"technology"} pageSize={6} country={"in"} category={"technology"} />} ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
