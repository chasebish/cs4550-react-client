import React from 'react'
import PropTypes from 'prop-types'

export default class ModuleEditor extends React.Component {

    state = {
        courseId: '',
        moduleId: ''
    }

    componentDidMount() {
        this.setCourseId(this.props.match.params.courseId)
        this.setModuleId(this.props.match.params.moduleId)
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
            <h1>Module Editor</h1>
        )
    }
}

ModuleEditor.propTypes = {
    match: PropTypes.object
}