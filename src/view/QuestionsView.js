import React, { Component } from "react"
import PropTypes from 'prop-types';
import { compose } from "redux";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

// UI
import Loader from "react-loader-spinner";
import { Box, Center, Badge, Container, Progress, Flex, Text } from "@chakra-ui/react"
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

// Actions
import { fetchQuestionsIfNeeded } from "actions/index.js";

// Custom components
import Question from 'components/Question.js'

class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            questionNum: 0,
            selected: false,
            finish: false,
            hits: 0,
            fails: 0,
            questionFail: false,
            questionOk: false,
            nextQuestionTimer: 0,
            end: false
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

    // I really need to optimize this, my good!
    updateHits(value) {
        let that = this // sorry 
        if(value == 0) {
            this.setState({ fails: this.state.fails+1, questionFail: true, questionOk: false })
        } else {
            this.setState({ hits: this.state.hits+parseInt(value), isQuestionFail: false, questionOk: true })
        }

        let num = this.state.questionNum+1
        
        var seconds = parseInt(5 % 60, 10);
        var timer = setInterval(function() {
            if(seconds <= 0) {
                that.setState({ 
                    questionNum: num, 
                    nextQuestionTimer: 0,
                    questionFail: false, 
                    questionOk: false 
                })
                clearInterval(timer);
            } else {
                that.setState({ 
                    nextQuestionTimer: seconds
                });
            }
            seconds -= 1
        }, 1000);

        if(this.props.questions.length === num) {
            this.setState({ end: true })
            this.props.history.push('/end');
        } 
    }

    render() {
        const { questions, isLoading, category } = this.props
        let currentProgress = parseInt((this.state.questionNum/this.state.parameters.amount)*100)
        let currentQuestion = ''
        if(this.state.end == false) {
            currentQuestion = questions[this.state.questionNum];
        }
        let isQuestionOk = this.state.questionOk
        let isQuestionFail = this.state.questionFail
        let timer = this.state.nextQuestionTimer
        return (
            <Box className="questions" backgroundColor="gray.100">
                <Container maxW="container.lg" h="100%" backgroundColor="gray.100">
                    <Center h="100%">
                        <Box p="8" backgroundColor="gray.50">
                            <Flex>
                                <Box mt={4} pr={3}>
                                    <Badge variant="outline" colorScheme="pink" fontSize="1em">
                                        { this.state.questionNum + 1 } / { this.state.parameters.amount }
                                    </Badge>
                                </Box>
                                <Text fontSize="4xl">Questions</Text>
                            </Flex>
                            <Box align="left" pt={4}>
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
                                        <Flex pb={3}>
                                            <Box flex="4">
                                                { category }
                                            </Box>
                                            <Box flex="1">
                                                <Flex>
                                                    <Center flex="1">
                                                        <Text fontSize="lg" color="green.300"><FaThumbsUp /></Text>
                                                        <Text fontSize="md" pl={1}>{this.state.hits}</Text>
                                                    </Center>
                                                    <Center>/</Center>
                                                    <Center flex="1">
                                                        <Text fontSize="lg" color="red.300"><FaThumbsDown /></Text>
                                                        <Text fontSize="md" pl={1}>{this.state.fails}</Text>
                                                    </Center>
                                                </Flex>
                                            </Box>
                                        </Flex>
                                        <Box>
                                            <Progress hasStripe value={currentProgress} isAnimated={true} />
                                        </Box>
                                        <Box>
                                            { !this.state.end &&
                                                <Question pt={3} 
                                                    questionItem={currentQuestion} 
                                                    index={this.state.questionNum}
                                                    onChange={this.updateHits}>
                                                </Question>
                                            }
                                        </Box>
                                        { isQuestionOk &&
                                            <Box bg="green.200" p={3}>
                                                Correct question!
                                            </Box>
                                        }
                                        { isQuestionFail && 
                                            <Box bg="tomato" p={3}>
                                                Fail!
                                            </Box>
                                        }
                                        { !this.state.end && timer !=0 &&
                                        <Box>
                                            Next question in: {timer}
                                        </Box>
                                        }
                                    </Box>   
                                }
                            </Box> 
                        </Box>
                    </Center>  
                </Container>
            </Box>
           
        )
    }
}

Questions.propTypes = {
    isLoading: PropTypes.bool,
    questions: PropTypes.array,
    category: PropTypes.string
}

function mapStateToProps(state) {
    const { questionSelected } = state
    const {
        isLoading,
        category,
        items: questions
    } = questionSelected.data || {
      isFetching: true,
      category: "",
      items: []
    }
    return {
        isLoading,
        category,
        questions
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps)
  )(Questions);