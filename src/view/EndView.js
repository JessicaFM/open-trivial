import React, { Component } from "react";
import { Container, Box, Link } from "@chakra-ui/react"
import { withRouter } from "react-router"
import { Link as ReachLink } from "react-router-dom"

class End extends Component {
    constructor(props) {
        super(props)
    }

    render(){
        return(
            <Container>
                Game has end!
                <Box>
                    <Link color="teal.500" as={ReachLink} to="/">
                        Go to home
                    </Link>
                </Box>
               
            </Container>
        )
    }
}

export default withRouter(End);