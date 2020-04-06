import React from 'react';
import './App.css';
import axios from 'axios';
import Stack from './Components/Stack';
import Button from 'react-bootstrap/Button';

class App extends React.Component {
  state = {
    stacks: [],
    selectedStack: 0,
  };

  componentDidMount() {
    if (this.state.stacks.length === 0) {
      let stacks = [];
      let data;
      axios.get('https://localhost:44393/api/collection')
        .then((response) => {
          data = response.data;
          data.forEach(x => {
            stacks.push({
              id: x.id,
              title: x.title,
              cards: x.cards,
            });
          });
          this.setState({
            stacks: stacks,
          });
        });
    }
  }

  handleSelectStack = (e) => {
    let id = parseInt(e.target.value);
    this.setState({
      stacks: this.state.stacks,
      selectedStack: id,
    });
  }

  renderStack = () => {
    if (this.state.selectedStack > 0) {
      let stack = this.state.stacks.find(x => x.id === this.state.selectedStack);
      return <Stack className="Stack" key={this.state.selectedStack} stack={stack} />;
    } else {
      return <></>;
    }
  }
  renderForm = () => {

  }

  render() {
    let stack = this.renderStack();
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-4 '>
            <select className="form-control" onChange={(event) => this.handleSelectStack(event)}>
              {this.state.stacks.map(x => <option value={x.id} key={x.id}>{x.title}</option>)}
            </select>
          </div>
          <div className='col-sm-8 d-flex justify-content-end'>
            <Button className="m-1">Add Card</Button>
            <Button className="m-1">Add Stack</Button>
          </div>
        </div>
        {stack}
      </div>
    );
  }

}

export default App;
