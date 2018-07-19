import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

import ModuleService from '../services/ModuleService'
import LessonTabs from './LessonTabs'

import './containers.css'

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
        this.setModuleTitle(this.props.match.params.moduleId)
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.match.params.courseId)
        this.setModuleId(newProps.match.params.moduleId)
        if (newProps.match.params.moduleId !== this.state.moduleId) {
            this.setModuleTitle(newProps.match.params.moduleId)
        }
    }

    setCourseId = (courseId) => {
        this.setState({ courseId: courseId })
    }

    setModuleId = (moduleId) => {
        this.setState({ moduleId: moduleId })
    }

    setModuleTitle = (moduleId) => {
        this.moduleService.findModuleById(moduleId)
            .then(response => this.setState({ moduleTitle: response.title }))
    }

    render() {

        return (
            <div>
                <div className='row'>
                    <h2>Module {this.state.moduleTitle}</h2>
                </div>
                <LessonTabs
                    courseId={this.state.courseId}
                    moduleId={this.state.moduleId}
                    moduleTitle={this.state.moduleTitle} />
            </div>
        )
    }
}

ModuleEditor.propTypes = {
    match: PropTypes.object
}