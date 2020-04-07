import React from 'react';
import './App.css';
import axios from 'axios';
import Stack from './Components/Stack';
import Button from 'react-bootstrap/Button';
import StackForm from './Components/StackForm';
import CardForm from './Components/CardForm';


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

  handleCardSubmit = (e) => {
    let form = e.target;
    e.preventDefault();
    let data = {
      word: form['Word'].value,
      definition: form['Definition'].value,
      stackId: parseInt(form['StackId'].value),
    };

    axios.post("https://localhost:44393/api/card", data)
      .then(response => {
        let card = response.data;
        this.setState(x => {
          let stacks = this.state.stacks.slice();
          stacks.map(x => {
            if (x.id === card.stackId) {
              x.cards.push(card);
            }
            return x;
          });
          return { stacks }
        });

        form.reset();
      })
      .catch(error => console.log(error));
  }

  handleStackSubmit = (e) => {
    let data = {
      title: e.target['Title'].value,
    };
    axios.post("https://localhost:44393/api/stack", data);
    e.preventDefault();

  }

  renderStack = () => {
    if (this.state.selectedStack > 0) {
      let stack = this.state.stacks.find(x => x.id === this.state.selectedStack);
      return <Stack className="Stack" key={this.state.selectedStack} stack={stack} />;
    } else {
      return <></>;
    }
  }
  renderCardForm = () => {
    let stacks = this.state.stacks.slice();
    console.log(this.state.stacks.length);
    if (this.state.stacks.length > 0) {
      return <CardForm className="card-form" stacks={stacks} submit={(e) => this.handleCardSubmit(e)} />
    } else {
      return <div>hello</div>;
    }
  }
  renderStackForm = () => {
    return <StackForm />
  }
  handleClick() {

  }

  render() {
    let stack = this.renderStack();
    let cardForm;
    if (this.state.stacks.length > 0) {
      cardForm = this.renderCardForm();
    }
    // let cardForm = this.renderCardForm();
    console.log(cardForm);

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-4 '>
            <select className="form-control" onChange={(event) => this.handleSelectStack(event)}>
              {this.state.stacks.map(x => <option value={x.id} key={x.id}>{x.title}</option>)}
            </select>
          </div>
          <div className='col-sm-8 d-flex justify-content-end'>
            <Button className="m-1" onClick={this.handleClick}>Add Card</Button>
            <Button className="m-1" onClick={this.handleClick}>Add Stack</Button>
          </div>
        </div>
        {stack}
        {cardForm}
      </div>
    );
  }

}




export default App;
