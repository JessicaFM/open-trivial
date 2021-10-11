import React from 'react'
import { Box, Spacer, Button, Flex } from "@chakra-ui/react"

// Components
import { BooleanAnswer } from './answers/BooleanAnswer'
import { MultipleAnswer } from './answers/MultipleAnswer'

class Question extends React.Component {
    constructor(props) {
        super(props)
        console.log("PROPRS")
        console.log(props)
        this.handleAnswer = this.handleAnswer.bind(this)
        this.updateHits = this.updateHits.bind(this)
        this.state =  { 
            question: props.questionItem, 
            index: props.index,
            selected: false,
            correctAnswer: false
        } 
    }

    // Sometimes, question string is encode
    provisionalDecode = (string) => {
        var txt = document.createElement('textarea');
        txt.innerHTML = string;
        return txt.value;
    }

    updateHits(value) {
        this.props.onChange(value)
    }

    handleAnswer(type) {
        if(this.state.question.correct_answer.toString().toLowerCase() == type.toString().toLowerCase()) {
            this.updateHits(1);
        } else {
            console.log("fuk")
            this.updateHits(0)
        }
        this.setState({ correctAnswer: type })
    }

    render() {
        let answeComponent = 
        <BooleanAnswer 
            item={this.state.question} 
            correct={this.state.correctAnswer}
            onChange={this.handleAnswer}>
        </BooleanAnswer>

        if(this.state.question.type == 'multiple') {
            answeComponent = 
            <MultipleAnswer 
                item={this.state.question}
                correct={this.state.correctAnswer}>
                </MultipleAnswer>
        } 
        
        return(
            <Box pt={3}>
                { this.provisionalDecode(this.state.question.question) }
                <Box>
                    { answeComponent }
                </Box>
                <Box pt={8}>
                    <Flex>
                        <Spacer />
                        { this.state.selected &&
                            <Button colorScheme="teal" size="md">
                                Next
                            </Button>
                        }
                    </Flex>
                </Box>
            </Box>
        )
    }
}
export default Question;
