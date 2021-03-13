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
        this.updateProbability = this.updateProbability.bind(this)
        // this.stages = this.stages.bind(this)
        this.convertToPercentage = this.convertToPercentage.bind(this)
    }

    updateProbability(e) {
        e.preventDefault();
        let p = this.Calculation()
        this.setState({probability:p})
    }

    Calculation() {
        let p = 1
        for(let i=0; i<(2+parseInt(this.state.fieldCards));i++) {
            p = p*((52-4*i)/(52-i))
        }
        p = p**this.state.players
        return p
    }

    update(property) {
        return e => this.setState({
            ...this.state,
            [property]: parseInt(e.target.value),
        },()=> {
            let p = this.Calculation()
            this.setState({
                ...this.state,
                probability:p
            })
        });
    }

    // stages() {
    //     let stage;
    //     switch(this.state.fieldCards) {
    //         case 3:
    //             stage = 'flop'
    //         case 4:
    //             stage = 'turn'
    //         case 5:
    //             stage = 'river'
    //     }
    //     this.setState({
    //         stage: stage
    //     });
    // }

    convertToPercentage() {
        return (this.state.probability*100).toFixed(2)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.updateProbability}>
                    <div>Number of field Cards</div>

                    <div placeholder="fieldCards">{this.state.fieldCards} field cards</div>
                    <input type="range" min="3" max="5" value={this.state.fieldCards} onChange={this.update('fieldCards')}></input>

                    <div placeholder="players">{this.state.players} players</div>
                    <input type="range" min="1" max="6" value={this.state.players} onChange={this.update('players')}></input>

                </form>
                <div>Chance that no-one has pairs:</div>
                <div>{this.convertToPercentage()}%</div>
            </div>
        )
    }
}