import React, { Component } from "react"
import { Box, Button, ButtonGroup, Flex } from "@chakra-ui/react"

export class BooleanAnswer extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <Flex>
                <Button colorScheme="green" variant="outline">
                    Yes
                </Button>
                <Button colorScheme="red" variant="outline">
                    No
                </Button>
            </Flex>
        )
    } 
}