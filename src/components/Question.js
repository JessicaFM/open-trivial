import React from 'react'
import { Box, Container, Text, Badge } from "@chakra-ui/react"

// Components
import { BooleanAnswer } from './answers/BooleanAnswer'
import { MultipleAnswer } from './answers/MultipleAnswer'

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

    render() {
        console.log("RRR")
        console.log(this.state)
        let answeComponent = <BooleanAnswer></BooleanAnswer>

        if(this.state.question.type == 'multiple') {
            answeComponent = <MultipleAnswer item={this.state.question}></MultipleAnswer>
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
