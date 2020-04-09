import React from 'react';
import {Switch, Route, Redirect, Link} from 'react-router-dom';
import Fib from './Fib';
import OtherPage from './OtherPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Welcome to Fibonacci calculator</h1>
        <Link to="/">Calculator</Link>
        <Link to="/other-page">Other Page</Link>
      </header>
      <Switch>
        <Route exact path="/" component={Fib}/>
        <Route exact path="/other-page" component={OtherPage} />
        <Route render={() => <Redirect to="/"/>}/>
      </Switch>
    </div>
  );
}

export default App;
