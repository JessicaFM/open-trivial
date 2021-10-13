import React, { Component } from 'react'

import { Box, Radio, Button } from '@chakra-ui/react'

export class Answer extends Component {
    constructor(props) {
        //TODO
        super(props)
        this.state = {
            answerType: this.props.answerType,
            answerCorrect: this.props.answerCorrect,
            answerItem: this.props.answerItem,
            answerState: '' // 0->Fail & 1->OK ???
        }
        this.handleAnswer = this.handleAnswer.bind(this)
    }

    handleAnswer(item) {
        console.log(item + " _ " + this.state.answerCorrect)
        if(item === this.state.answerCorrect) {
            this.setState = ({ answerState: 1 })
            console.log("YIKES")
        }
        console.log(this.state)
    }

    render() {
        console.log(this.state)
        return (
            <Box className={ "state_" + this.state.state } id="hola">
                {this.state.answerType=='radio' &&
                <Radio value={this.state.answerItem} 
                    onChange={() => this.handleAnswer(this.state.answerItem) }>{this.state.answerItem}</Radio>
                }
                {this.state.answerType=='button'  && 
                <div></div>
                }
            </Box>
        )
    }


}