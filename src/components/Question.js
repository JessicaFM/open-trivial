import React from 'react'
import { Box, Container, Text, Badge } from "@chakra-ui/react"

// Components
import { BooleanAnswer } from './answers/BooleanAnswer'

class Question extends React.Component {
    constructor(props) {
        super(props)
        console.log("PROPRS")
        console.log(props)
        this.state =  { 
            question: props.questionItem, 
            index: props.index,
            selected: false
        } 
    }

    // Sometimes, question string is encode
    provisionalDecode = (string) => {
        var txt = document.createElement('textarea');
        txt.innerHTML = string;
        return txt.value;
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

    optionAnswer = (answersArray) => {
        // All cases
        let answersPool = [...this.state.question.incorrect_answers, this.state.question.correct_answer]
        console.log(answersPool)
        answersPool = this.shuffleAnswers(answersPool)
    }
        
    
    render() {
        console.log("RRR")
        console.log(this.state)
        let answeComponent = <BooleanAnswer></BooleanAnswer>

        if(this.state.question.type == 'multiple') {
            answeComponent = <BooleanAnswer></BooleanAnswer>
        } 
        
        return(
            <Box pt={3}>
                { this.provisionalDecode(this.state.question.question) }
                <Box>
                    { answeComponent }
                </Box>
            </Box>
        )
    }
}
export default Question;
