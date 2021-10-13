import React, { Component } from "react"
import PropTypes from 'prop-types';
import { compose } from "redux";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

// UI
import Loader from "react-loader-spinner";
import { Box, Center, Badge, Container, Progress, Flex } from "@chakra-ui/react"
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

// Actions
import { fetchQuestionsIfNeeded } from "actions/index.js";

// Custom components
import Question from 'components/Question.js'

class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            questionNum: 1,
            selected: false,
            finish: false,
            hits: 0,
            fails: 0
        }
        this.updateHits = this.updateHits.bind(this)
    }

    componentWillMount(){
        if (this.props.history.location.state.data) {
            let parameters = this.props.history.location.state.data;
            this.setState({ parameters, searching: true });
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchQuestionsIfNeeded(this.state.parameters))
      }
    
      componentDidUpdate(prevProps) {
        if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
          const { dispatch, selectedSubreddit } = this.props
          dispatch(fetchQuestionsIfNeeded(selectedSubreddit))
        }
    }

    updateHits(value) {
        if(value == 0) {
            this.setState({ fails: this.state.fails+1})
        } else {
            this.setState({ hits: this.state.hits+parseInt(value)})
        }
    }

    render() {
        const { questions, isLoading } = this.props
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
                                <Box flex="1">
                                    <Badge variant="outline" colorScheme="green">
                                        { this.state.questionNum } / { this.state.parameters.amount }
                                    </Badge>
                                </Box>
                                <Box flex="3">
                                    Questions
                                </Box>
                                <Box flex="1">
                                    <Flex>
                                        <Center flex="1">
                                            <FaThumbsUp />
                                            {this.state.hits}
                                        </Center>
                                        <Center>/</Center>
                                        <Center flex="1">
                                            <FaThumbsDown />
                                            {this.state.fails}
                                        </Center>
                                    </Flex>
                                </Box>
                            </Flex>
                            <Box>
                                <Progress hasStripe value={currentProgress} isAnimated={true} />
                            </Box>
                            <Box>
                                <Question pt={3} 
                                    questionItem={questions[this.state.questionNum]} 
                                    index={this.state.questionNum}
                                    onChange={this.updateHits}>
                                </Question>
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
    const { questionSelected } = state
    const {
        isLoading,
        items: questions
    } = questionSelected.data || {
      isFetching: true,
      items: []
    }
    return {
        isLoading,
        questions
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps)
  )(Questions);