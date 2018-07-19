import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { Button, Col, ListGroup } from 'react-bootstrap'

import ModuleEditor from './ModuleEditor'
import ModuleListItem from '../components/ModuleListItem'

import CourseService from '../services/CourseService'
import ModuleService from '../services/ModuleService'

import './containers.css'

export default class ModuleList extends React.Component {

    constructor(props) {
        super(props)
        this.courseService = CourseService.instance
        this.moduleService = ModuleService.instance
    }

    state = {
        courseId: '',
        module: {
            title: ''
        },
        modules: [],
        selectedModule: null
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

            const date = new Date()

            const courseObj = {
                modified: date
            }

            this.setState({
                module: {
                    title: ''
                }
            })
            this.courseService.updateCourse(this.state.courseId, courseObj)
            this.findAllModulesForCourse(this.state.courseId)
        })
    }

    deleteModule = (moduleId) => {
        this.moduleService.deleteModule(moduleId).then(() => {
            this.findAllModulesForCourse(this.state.courseId)
        })
    }

    selectModule = (moduleId) => {
        this.setState({ selectedModule: moduleId })
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

        if (!this.state.modules) {
            return
        }

        let modules = this.state.modules.map((module) => {
            return (
                <ModuleListItem
                    key={module.id}
                    module={module}
                    courseId={this.state.courseId}
                    delete={this.deleteModule}
                    selectModule={this.selectModule}
                    selectedModule={this.state.selectedModule} />
            )
        })

        return (
            <ListGroup className='modulePadding'>
                {modules}
            </ListGroup>
        )
    }

    render() {
        return (
            <div>
                <Col md={5} lg={3} className='minusLeft'>
                    <div>
                        <h2>Modules</h2>
                        <div className="input-group">
                            <input value={this.state.module.title} onChange={this.setModuleTitle} className="col form-control" />
                            <span className='input-group-btn'>
                                <Button bsStyle='primary' onClick={this.createModule} className='col'>Create</Button>
                            </span>
                        </div>
                        {this.renderModules()}
                    </div>
                </Col>
                <Col md={7} lg={9} className='moduleCol'>
                    <Route
                        path="/course/:courseId/module/:moduleId"
                        render={(match) => <ModuleEditor {...match} findAllModulesForCourse={this.findAllModulesForCourse}/>} />
                </Col>
            </div>
        )
    }

}

ModuleList.propTypes = {
    courseId: PropTypes.string,
    module: PropTypes.object
}
