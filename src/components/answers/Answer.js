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
        // If we wanna mark as correct, ex. green
        if(item === this.state.answerCorrect) {
            this.setState = ({ answerState: 1 })
        }
        this.props.onChange(item);
    }

    componentDidUpdate(prevProps) {
        if (this.props.answerCorrect !== prevProps.answerCorrect) {
            this.setState({
                answerType: this.props.answerType,
                answerCorrect: this.answerCorrect,
                answerItem: this.props.answerItem
            })
        }
    }

    render() {
        return (
            <Box className={ "state_" + this.state.state }>
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