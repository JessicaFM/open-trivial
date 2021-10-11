import React, { Component } from "react"
import { Box, Button, ButtonGroup, Flex } from "@chakra-ui/react"

export class BooleanAnswer extends Component {
    constructor(props) {
        super(props)
        this.state = { correct: false }
        this.handleAnswer = this.handleAnswer.bind(this)
    }
    
    handleAnswer(type) {
        this.props.onChange(type)
    } 

    render() {
        return (
            <Flex>
                <Button colorScheme="green" variant="outline" onClick={() => this.handleAnswer(true)}>
                    True
                </Button>
                <Button colorScheme="red" variant="outline" onClick={() => this.handleAnswer(false)}>
                    False
                </Button>
            </Flex>
        )
    } 
}