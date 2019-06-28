import React, { Component } from 'react'
import axios from 'axios';

export default class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  };

  componentDidMount(){
    this.fetchValues();
    this.fetchIndexes();
  }

  fetchValues = async () => {
    const values = await axios.get('/api/values/current');
    this.setState({
      ...this.state,
      values: values.data
    });
  }

  fetchIndexes = async () => {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({
      ...this.state,
      seenIndexes: seenIndexes.data
    });
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}
