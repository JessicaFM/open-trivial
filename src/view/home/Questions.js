import React, { Component, PropTypes } from "react"
import { compose } from "redux";

import { withRouter } from 'react-router-dom';
import Loader from "react-loader-spinner";

import { Provider, connect } from 'react-redux'
import configureStore from '../../configureStore.js'

import { fetchQuestionsIfNeeded } from "actions/index.js";

import { Box, SimpleGrid, Container, VStack, Flex } from "@chakra-ui/react"

const store = configureStore()

class Questions extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }

    componentWillMount(){
        console.log(this.props.history.location) 
        if (this.props.history.location.state.data)
        {
            let parameters = this.props.history.location.state.data;
            this.setState({ parameters, searching: true });
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchQuestionsIfNeeded("react"))
      }
    
      componentDidUpdate(prevProps) {
        if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
          const { dispatch, selectedSubreddit } = this.props
          dispatch(fetchQuestionsIfNeeded(selectedSubreddit))
        }
      }
    

    render() {
        console.log(this.state);
        return (
            <Provider store={store}>
                <Container>
                    Questions Blocks!
                    <Box align="center">
                        <Loader
                            type="Bars"
                            color="#00BFFF"
                            height={100}
                            width={100}
                        />
                    </Box>   
                </Container>
            </Provider>
        )
    }
}

// Questions.propTypes = {
//     isLoading: PropTypes.bool.isRequired,
//     questionList: PropTypes.object.isRequired
// }

function mapStateToProps(state) {

    console.log(state)
    const { questionSelected } = state
    const {
        isLoading,
        items: questionList
    } = questionSelected || {
      isFetching: true,
      items: []
    }
  
    return {
        isLoading,
        questionList
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps)
  )(Questions);