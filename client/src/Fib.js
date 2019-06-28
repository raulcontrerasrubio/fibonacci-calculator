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

  handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('/api/values', {
      index: this.state.index
    });
    this.setState({
      index: ''
    });
  }

  renderSeenIndexes = () => this.state.seenIndexes.map(({n}) => n).join(', ');
  renderCalculatedValues = () => {
    const entries = [];
    for(let key in this.state.values){
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }
    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input type="text" value={this.state.index} onChange={event => this.setState({index: event.target.value})}/>
          <button>Submit</button>
        </form>
        <div>
          <h3>Indexes I have seen:</h3>
          {
            this.renderSeenIndexes()
          }
        </div>
        <div>
          <h3>Calculated Values:</h3>
          {
            this.renderCalculatedValues()
          }
        </div>
      </div>
    )
  }
}
