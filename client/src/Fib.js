import React, { Component } from "react";
import axios from "axios";

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: "",
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    this.setState({ values: values.data.data });
  }

  fetchIndexes = async () => {
    const seenIndexes = await axios.get("/api/values/all");
    this.setState({ seenIndexes: seenIndexes.data.data });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('/api/values', {
      index: this.state.index
    });
    this.setState({
      index: ''
    });
  }

  renderSeenIndexes = () => {
    return this.state.seenIndexes.map(({number}) => number).join(', ');
  }

  renderCalculatedValues = () => {
    return Object.entries(this.state.values).map(([index, value]) => (
      <div key={index}>
        <span>For index {index} I calculated {value}</span>
      </div>
    ));
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input value={this.state.index} onChange={e => this.setState({index: e.target.value})}/>
          <button>Submit</button>
        </form>
        <div>
          <h3>Indexes I have seen</h3>
          {this.renderSeenIndexes()}
        </div>
        <div>
          <h3>Calculated values</h3>
          {this.renderCalculatedValues()}
        </div>
      </div>
    )
  }
}

export default Fib;