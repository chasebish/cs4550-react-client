import React from 'react'
import PropTypes from 'prop-types'

import ModuleListItem from '../components/ModuleListItem'
import ModuleService from '../services/ModuleService'

export default class ModuleList extends React.Component {

    constructor(props) {
        super(props)
        this.moduleService = ModuleService.instance
    }

    state = {
        courseId: '',
        module: {
            title: ''
        },
        modules: []
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId)
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId)
        this.findAllModulesForCourse(newProps.courseId)
    }

    createModule = () => {
        this.moduleService.createModule(this.state.courseId, this.state.module).then(() => {
            this.findAllModulesForCourse(this.state.courseId)
        })
    }

    deleteModule = (moduleId) => {
        this.moduleService.deleteModule(moduleId).then(() => {
            this.findAllModulesForCourse(this.state.courseId)
        })
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

    setModules = (modules) => {
        this.setState({ modules: modules })
    }

    findAllModulesForCourse = (courseId) => {
        this.moduleService.findAllModulesForCourse(courseId).then((modules) => this.setModules(modules))
    }

    renderModules = () => {

        let modules = this.state.modules.map((module) => {
            return (
                <ModuleListItem key={module.id} module={module} delete={this.deleteModule}/>
            )
        })

        return <ul>{modules}</ul>
    }

    render() {
        return (
            <div>
                <h4>Module List for courseId: {this.state.courseId}</h4>
                <input value={this.state.module.title} onChange={this.setModuleTitle} className="form-control" />
                <button onClick={this.createModule} className="btn btn-secondary">Create</button>
                {this.renderModules()}
            </div>
        )
    }

}

ModuleList.propTypes = {
    courseId: PropTypes.string,
    module: PropTypes.object
}
