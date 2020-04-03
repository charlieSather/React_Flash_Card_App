import React from 'react'
import axios from 'axios'
import './FlashCards.css';
import FlashCard from './FlashCard'

class FlashCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
        };
    }
    componentDidMount(){
        
        if(this.state.cards.length === 0){
            let cards = [];
            let data;
            axios.get('https://localhost:44393/api/collection')
            .then((response) =>{
                 data = response.data;
                 data.forEach(x => {
                     x.cards.forEach(card =>{
                         cards.push(card)
                     });
                 });
                 this.setState({ cards });
                 console.log(cards);
            });
        }
        
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

export default FlashCards
