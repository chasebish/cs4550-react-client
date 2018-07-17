import React from 'react'
import PropTypes from 'prop-types'

import ModuleService from '../services/ModuleService'

export default class ModuleList extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        courseId: '',
        module: {
            title: ''
        }
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId)
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId)
    }

    createModule = () => {
        ModuleService.createModule(this.state.courseId, this.state.module)
    }

    setCourseId = (courseId) => {
        this.setState({ courseId: courseId })
    }

    setModuleTitle = (event) => {
        this.setState({
            module: {
                title: event.target.value
            }
        })
    }

    render() {
        return (
            <div>
                <h4>Module List for courseId: {this.state.courseId}</h4>
                <input value={this.state.module.title} onChange={this.setModuleTitle} className="form-control" />
                <button onClick={this.createModule} className="btn btn-secondary">Create</button>
            </div>
        )
    }

}

ModuleList.propTypes = {
    courseId: PropTypes.string,
    module: PropTypes.object
}
