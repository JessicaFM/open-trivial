import React, { Component } from "react"
import { Box, Flex, RadioGroup, Radio, Stack } from "@chakra-ui/react"

import { Answer } from "./Answer"

export class MultipleAnswer extends Component {
    constructor(props){
        super(props)
        this.handleAnswer = this.handleAnswer.bind(this)
        this.state = {
            question: this.props.item,
            answerPool: this.optionAnswer(),
            selectedAnswer: false
        }
    }

    optionAnswer = () => {
        return this.shuffleAnswers([...this.props.item.incorrect_answers, this.props.item.correct_answer])
    }

    // Random order of all answer as a pool
    shuffleAnswers = (pool) => {
        for (var i = pool.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = pool[i];
            pool[i] = pool[j];
            pool[j] = temp;
        }
        return pool
    }

    componentDidUpdate(prevProps) {
        if (this.props.item !== prevProps.item) {
            this.setState({
                question: this.props.item,
                answerPool: this.optionAnswer()
            })
        }
    }

    handleAnswer(option) {
        this.props.onChange(option)
    }

    render() {
        var correct = this.state.question.correct_answer
        return (
            <Flex>
                <RadioGroup>
                    <Stack spacing={4} direction="row">
                    {this.state.answerPool.length>0 && 
                        this.state.answerPool.map((item, i) =>
                            <Answer key={i} 
                                answerType="radio" 
                                answerCorrect={correct}
                                answerItem={item}
                                onChange={() => this.handleAnswer(item) } />
                        )
                    }
                    </Stack>
                </RadioGroup>
            </Flex>
        )
    }
}