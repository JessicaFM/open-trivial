import React, { Component } from "react"
import { Checkbox, Button, Stack, Flex } from "@chakra-ui/react"


export class MultipleAnswer extends Component {
    constructor(props){
        super(props)
        console.log("IN MULTI")
        console.log(props)
        this.state = {
            question: this.props.item,
            answer_pool: this.optionAnswer()
        }
    }

    optionAnswer = () => {
        // All cases
        console.log("OP")
        console.log(this.props.item)
        let answersPool = [...this.props.item.incorrect_answers, this.props.item.correct_answer]
        return this.shuffleAnswers(answersPool)
    }

    // Random order of all answer as a pool
    shuffleAnswers = (answersArray) => {
        for (var i = answersArray.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = answersArray[i];
            answersArray[i] = answersArray[j];
            answersArray[j] = temp;
        }
        return answersArray
    }

    render() {
        return (
            <Flex>
                <Stack spacing={5} direction="row">
                    {this.state.answer_pool.length>0 && 
                        this.state.answer_pool.map((item, i) =>
                            <Checkbox key={i}>{item}</Checkbox>        
                        )
                    }
                </Stack>
            </Flex>
        )
    }
}