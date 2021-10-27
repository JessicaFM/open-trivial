import React from "react";
import { Box, Select, Input, Text } from "@chakra-ui/react"

import * as constants from '../constants/itemsElements.js'
import { customStyles as styles } from '../constants/styles.js'

class FilterComponent extends React.Component {
    constructor(props) {
        super(props)
        this.setComponent()
    }

    setComponent = () => {
        if(this.props.name == 'category') {
            this.state = { title: "Select Category", items: constants.categoryElements, value: this.props.value }
        } else if(this.props.name == 'difficulty') {
            this.state = { title: "Select Difficulty", items: constants.difficultyElements, value: this.props.value }
        } else if(this.props.name == 'type') {
            this.state = { title: "Select Type", items: constants.typeElements, value: this.props.value }
        } else {
            this.state = { title: "Number of Questions", value: this.props.value }
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value })
    }

    render() {
        let item
        if(this.state.items) {
            item = <Select name={this.props.name} variant="outline" backgroundColor="white" onChange={this.props.handler}>
                    {this.state.items.map((item) => <option value={item.value} key={item.value}>{item.name}</option>)}
                </Select>
        } else {
            item = <Input name={this.props.name} placeholder="10" backgroundColor="white" onChange={this.props.handler} value={this.state.value} />
        }

        return (
            <Box key={this.props.name}>
                <Text fontSize="md" style={ styles.formLabels }>{ this.props.name }</Text>
                { item }
            </Box>
        )
    }
}

export default FilterComponent;