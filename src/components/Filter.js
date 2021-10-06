import React from "react"
import { withRouter } from 'react-router-dom';

import { Box, SimpleGrid, Text, Button, VStack, Flex } from "@chakra-ui/react"
import { CheckIcon } from '@chakra-ui/icons'

import FilterComponent from "./FilterComponent"

class Filter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            amount: 10,
            category: "",
            difficulty: "",
            type: "",
            showError: false,
            errorText: "",
            submited: false
        }
        this.handler = this.handler.bind(this)
        this.submitForm = this.submitForm.bind(this)

        console.log(props)

    }

    handler(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    submitForm(e) {
        var elements = this.state;
        if(elements.amount <= 0) {
            // Minim 1 question is required, if not we need to show error message
            console.log("Thre is a error");
            this.setState({showError: true, errorText: this.showError("questionNull")});
        } else {
            var query = this.constructQuery();
            console.log(query);
            this.props.history.push('/questions', { data: query });
        }
        
    }

    // Showing error if something going wrong
    showError = (errorType) => {
        var errorsList = {
            "questionNull" : "Minimun 1 question is required!"
        }
        return errorsList[errorType];
    }

    // Construct submited GET query
    constructQuery = () => {
        var query = { "amount": this.state.amount };
        if(this.state.category != '') {
            query.category = this.state.category;
        }
        if(this.state.difficulty != '') {
            query.difficulty = this.state.difficulty;
        }
        if(this.state.type != '') {
            query.type = this.state.type;
        }
        console.log(query);
        return query;
    }

    render() {
        let errorBlock;
        if(this.state.showError) {
            errorBlock = <Box backgroundColor="red.300"><Text>{this.state.errorText}</Text></Box>
        }
        return (
            <VStack className="filter">
                <React.Fragment> 
                    <Box w="450px" p="8" backgroundColor="gray.50">
                        <Box p="3">
                            <Text fontSize="2xl">Open trivial</Text>
                        </Box>
                        <Box p="3" spacing="40px" p="5">
                            <Text fontSize="lg" pb="3">Select custom questions</Text>
                                <SimpleGrid minChildWidth="225px" spacing="10px">
                                    <Box><FilterComponent name="questions" value={this.state.questions} handler={this.handler} /></Box>
                                    <Box><FilterComponent name="category" value={this.state.category} handler={this.handler} /></Box>
                                    <Box><FilterComponent name="difficulty" value={this.state.difficulty} handler={this.handler} /></Box>
                                    <Box><FilterComponent name="type" value={this.state.type} handler={this.handler} /></Box>
                                </SimpleGrid>
                            {errorBlock}           
                            <Flex justifyContent="flex-end" pt="4">
                                <Button rightIcon={<CheckIcon />} colorScheme="pink" variant="solid" onClick={this.submitForm}>
                                    Create trivial
                                </Button>
                            </Flex>
                        </Box>
                    </Box>         
                </React.Fragment>
            </VStack>
        )
    }  
}

export default withRouter(Filter);