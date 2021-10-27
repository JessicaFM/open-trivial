import React from 'react'
import { Box, Center, Spacer, Button, Flex } from "@chakra-ui/react"

// Components
import { BooleanAnswer } from './answers/BooleanAnswer'
import { MultipleAnswer } from './answers/MultipleAnswer'

class Question extends React.Component {
    constructor(props) {
        super(props)
        this.handleAnswer = this.handleAnswer.bind(this)
        this.updateHits = this.updateHits.bind(this)
        this.state =  { 
            question: props.questionItem, 
            index: props.index,
            selected: false,
            correctAnswer: false
        } 
    }

    componentWillReceiveProps(props) {
        this.setState({ question: props.questionItem })
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

    handleAnswer(option) {
        if(this.state.question.correct_answer.toString().toLowerCase() == option.toString().toLowerCase()) {
            this.updateHits(1);
        } else {
            this.updateHits(0)
        }
        this.setState({ correctAnswer: option })
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
                correct={this.state.correctAnswer}
                onChange={this.handleAnswer}>
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
                <Center bg="tomato">

                </Center>
            </Box>
        )
    }
}
export default Question;
