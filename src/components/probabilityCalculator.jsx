import React, { Component } from 'react'

export default class ProbabilityCalculator extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            fieldCards: 3,
            stage: 'flop',
            players: 1,
            probability: 1
        }
        this.chanceOfAPair = this.chanceOfAPair.bind(this)
        this.stages = this.stages.bind(this)
    }

    chanceOfAPair(e) {
        e.preventDefault();
        let p = 1
        for(let i=0; i<(2+this.state.fieldCards);i++) {
            p = p*((52-4*i)/(52-i))
        }
        p = Math.pow(p,this.state.players)
        this.setState({probability:p})
    }

    update(property) {
        return e => this.setState({
            [property]: parseInt(e.target.value)
        });
    }

    stages() {
        let stage;
        switch(this.state.fieldCards) {
            case 3:
                stage = 'flop'
            case 4:
                stage = 'turn'
            case 5:
                stage = 'river'
        }
        this.setState({
            stage: stage
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.chanceOfAPair}>
                    <div>Number of field Cards</div>
                    <div placeholder="fieldCards">{this.state.fieldCards} field cards</div>
                    <input type="range" min="3" max="5" value={this.state.fieldCards} onChange={this.update('fieldCards')}></input>
                    <div placeholder="players">{this.state.players} players</div>
                    <input type="range" min="1" max="6" value={this.state.players} onChange={this.update('players')}></input>
                    <button type="submit">Submit</button>
                </form>
                <div>Chance that no-one has pairs:</div>
                <div>{this.state.probability}</div>
            </div>
        )
    }
}