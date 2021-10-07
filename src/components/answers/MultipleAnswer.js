import React, { Component } from "react"
import { Checkbox, CheckboxGroup, HStack, Flex, RadioGroup, Radio, Stack } from "@chakra-ui/react"


export class MultipleAnswer extends Component {
    constructor(props){
        super(props)
        console.log("IN MULTI")
        console.log(props)
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

    render() {
        return (
            <Flex>
                <RadioGroup>
                    <Stack spacing={4} direction="row">
                    {this.state.answerPool.length>0 && 
                        this.state.answerPool.map((item, i) =>
                            <Radio key={i} value={item}>{item}</Radio>        
                        )
                    }
                    </Stack>
                </RadioGroup>
            </Flex>
        )
    }
}