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
    next = () => {
        let activeCard = this.state.activeCard;
        if(activeCard === this.state.cards.length - 1){
            return;
        }
        else{
            this.setState({
                activeCard: ++activeCard,
            });
        }
    }
    previous = () => {
        let activeCard = this.state.activeCard;
        if(activeCard === 0){
            return;
        }
        else{
            this.setState({
                activeCard: --activeCard,
            });
        }
    }
    renderCard(){
        let activeCardIndex = this.state.activeCard;
        console.log(activeCardIndex);
        let card = this.state.cards.find((el,index) => index === activeCardIndex);
        if(card){
            return <FlashCard key={card.id} word={card.word} definition={card.definition}/>;
        }
        else{
            return <div></div>;
        }
      }

    render() {
        // let cards = this.state.cards.slice();
        let card = this.renderCard();
        let currentIndex = this.state.activeCard;
        
        return (
            <div className="card-container">
                {/* { cards.map((card, i) => this.renderCard(card, i)) } */}

                <button className='btn btn-primary' onClick={this.previous}>previous</button>
                {card}
                <button className='btn btn-primary' onClick={this.next}>next</button>

                <div>{currentIndex + 1}/{this.state.cards.length}</div>
            </div>
           
        );
    }


}

export default Stack
