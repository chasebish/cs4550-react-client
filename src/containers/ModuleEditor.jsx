import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

import ModuleService from '../services/ModuleService'

export default class ModuleEditor extends React.Component {

    constructor(props) {
        super(props)
        this.moduleService = ModuleService.instance
    }

    state = {
        courseId: '',
        moduleId: '',
        moduleTitle: ''
    }

    componentDidMount() {
        this.setCourseId(this.props.match.params.courseId)
        this.setModuleId(this.props.match.params.moduleId)
        this.moduleService.findModuleById(this.props.match.params.moduleId)
            .then(response => this.setState({ moduleTitle: response.title}))
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.match.params.courseId)
        this.setModuleId(newProps.match.params.moduleId)
    }

    setCourseId = (courseId) => {
        this.setState({ courseId: courseId })
    }

    setModuleId = (moduleId) => {
        this.setState({ moduleId: moduleId })
    }

    render() {
        return (
            <div>
                <h1>Module Editor</h1>
                <div className='row'>
                    <h3>Module {this.state.moduleTitle}</h3>
                    <Button
                        bsStyle='info'
                        bsSize='sm'>
                        Change Name
                    </Button>
                </div>
            </div>
        )
    }
}

ModuleEditor.propTypes = {
    match: PropTypes.object
}