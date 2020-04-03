import React from 'react';
import './FlashCard.css';

class FlashCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            word: props.word,
            definition: props.definition,
            isFlipped: false,
        };
    }

    handleClick(){
        this.setState({
            word: this.state.word,
            definition: this.state.definition,
            isFlipped: !this.state.isFlipped,
        });
    }

    render(){
        let status;
        let content;
        if(this.state.isFlipped){
            status = "Back of card";
            content = this.state.definition;
        } else{
            status = "Front of card";
            content = this.state.word;
        }


        return (
            <div className="flash-card">

                <h1>{status}</h1>
                <h3>{content}</h3>

                <button onClick={() => this.handleClick()}>Flip</button>
            </div>


        );
    }
}

export default FlashCard;

