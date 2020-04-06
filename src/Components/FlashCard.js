import React from 'react';
import Button from 'react-bootstrap/Button';
import './FlashCard.css';

class FlashCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            word: "",
            definition: "",
            isFlipped: false,
        };
    }

    componentDidMount(){
        this.setState({
            word: this.props.word,
            definition: this.props.definition,
            isFlipped: false,
        });
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

                <Button className='btn-primary' onClick={() => this.handleClick()}>Flip Card</Button>
            </div>


        );
    }
}

export default FlashCard;

