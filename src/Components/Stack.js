import React from 'react'
import './Stack.css';
import FlashCard from './FlashCard'

class Stack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            title: "",
            cards: [],
            activeCard: 0,
        };
    }

    componentDidMount(){
        this.setState({
            id: this.props.stack.id,
            title: this.props.stack.title,
            cards: this.props.stack.cards,
            activeCard: 0,
        });
    }
    renderCard(card, i){
        return (
          <FlashCard key={i} word={card.word} definition={card.definition}  />
        );
      }

    render() {
        let cards = this.state.cards.slice();
        
        return (
            <div className="card-container">
                { cards.map((card, i) => this.renderCard(card, i)) }
            </div>
           
        );
    }


}

export default Stack
