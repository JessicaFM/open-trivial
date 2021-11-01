import React, { Component } from "react";
import { Container, Link } from "@chakra-ui/react"
import { withRouter } from "react-router";

class End extends Component {
    constructor(props) {
        super(props)
    }

    render(){
        return(
            <Container>
                Game has end!
                <Link color="teal.500" to="/">
                    links can live inline with text
                </Link>
            </Container>
        )
    }
}

export default withRouter(End);