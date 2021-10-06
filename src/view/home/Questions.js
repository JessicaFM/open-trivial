import React, { Component } from "react"
import PropTypes from 'prop-types';
import { compose } from "redux";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

// UI
import Loader from "react-loader-spinner";
import { Box, Button, Badge, Container, Progress, Flex, Spacer } from "@chakra-ui/react"

// Actions
import { fetchQuestionsIfNeeded } from "actions/index.js";

// Custom components
import Question from 'components/Question.js'

class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = { questionNum: 1 }
    }

    componentWillMount(){
        if (this.props.history.location.state.data)
        {
            let parameters = this.props.history.location.state.data;
            this.setState({ parameters, searching: true });
        }
    }

    componentDidMount() {
        console.log("componentDidMount");
        console.log(this.props);
        console.log(this.state)
        const { dispatch } = this.props
        dispatch(fetchQuestionsIfNeeded(this.state.parameters))
      }
    
      componentDidUpdate(prevProps) {
        if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
          const { dispatch, selectedSubreddit } = this.props
          dispatch(fetchQuestionsIfNeeded(selectedSubreddit))
        }
      }
    

    render() {
        const { questions, isLoading } = this.props

        console.log("RENDER")
        console.log(this.state)
        console.log(questions)
        console.log(isLoading)
        console.log("-----")
        console.log(questions[this.state.parameters.amount])
        let currentProgress = parseInt((this.state.questionNum/this.state.parameters.amount)*100)

        return (
            <Container>
                Questions Blocks!
                <Box align="left">
                    {isLoading && 
                        <Loader
                            type="Bars"
                            color="#00BFFF"
                            height={100}
                            width={100}
                        />
                    }
                    {!isLoading && questions.length>0 &&
                        <Box>
                            <Flex>
                                <Box>
                                    <Badge variant="outline" colorScheme="green">
                                        { this.state.questionNum } / { this.state.parameters.amount }
                                    </Badge>
                                </Box>
                                <Box>
                                    Questions
                                </Box>
                            </Flex>
                            <Box>
                                <Progress hasStripe value={currentProgress} isAnimated={true} />
                            </Box>
                            <Box>
                                <Question pt={3} questionItem={questions[this.state.questionNum]} index={this.state.questionNum}></Question>
                                <Box pt={8}>
                                    <Flex>
                                        <Button colorScheme="teal" size="md">
                                            Prev
                                        </Button>
                                        <Spacer />
                                        <Button colorScheme="teal" size="md">
                                            Next
                                        </Button>
                                    </Flex>
                                </Box>
                            </Box>
                        </Box>   
                    }
                </Box>   
            </Container>
        )
    }
}

Questions.propTypes = {
    isLoading: PropTypes.bool,
    questions: PropTypes.array
}

function mapStateToProps(state) {
    console.log("mapStateToProps")
    console.log(state)
    console.log(this.state)
    console.log("------")
    const { questionSelected } = state
    console.log("questionSelected:")
    console.log(questionSelected)

    const {
        isLoading,
        items: questions
    } = questionSelected.data || {
      isFetching: true,
      items: []
    }
  
    console.log("questionSelected")
    console.log(questionSelected.data)

    console.log("-----")

    return {
        isLoading,
        questions
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps)
  )(Questions);