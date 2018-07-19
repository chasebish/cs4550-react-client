import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'

import CourseService from '../services/CourseService'
import ModuleService from '../services/ModuleService'
import LessonTabs from './LessonTabs'

import './containers.css'

export default class ModuleEditor extends React.Component {

    constructor(props) {
        super(props)
        this.moduleService = ModuleService.instance
        this.courseService = CourseService.instance
    }

    state = {
        courseId: '',
        moduleId: '',
        moduleTitle: '',
        showModal: false,
        updatingModuleTitle: ''

    }

    componentDidMount() {
        this.setCourseId(this.props.match.params.courseId)
        this.setModuleId(this.props.match.params.moduleId)
        this.setModuleTitle(this.props.match.params.moduleId)
        this.setState({ updatingModuleTitle: this.props.match.params.moduleId })
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.match.params.courseId)
        this.setModuleId(newProps.match.params.moduleId)
        if (newProps.match.params.moduleId !== this.state.moduleId) {
            this.setModuleTitle(newProps.match.params.moduleId)
        }
    }

    updateModule = () => {

        const courseObj = {
            modified: new Date()
        }

        const moduleObj = {
            title: this.state.updatingModuleTitle
        }

        this.moduleService.updateModule(this.state.moduleId, moduleObj)
            .then((response) => {
                this.setModuleTitle(response.id.toString(), true)
                this.hideModal()
                this.props.findAllModulesForCourse(this.state.courseId)
                this.courseService.updateCourse(this.state.courseId, courseObj)
            })
    }

    showModal = () => {
        this.setState({ showModal: true })
    }

    hideModal = () => {
        this.setState({ showModal: false })
    }

    updatingModuleChanged = (event) => {
        this.setState({ updatingModuleTitle: event.target.value })
    }

    setCourseId = (courseId) => {
        this.setState({ courseId: courseId })
    }

    setModuleId = (moduleId) => {
        this.setState({ moduleId: moduleId })
    }

    setModuleTitle = (moduleId, skip) => {
        this.moduleService.findModuleById(moduleId)
            .then((response) => {
                this.setState({ moduleTitle: response.title })
                !skip && this.setState({ updatingModuleTitle: response.title })
            })
    }

    render() {
        return (
            <div>
                <div className='row'>
                    <h2 className='moduleHeader'>Module {this.state.moduleTitle}</h2>
                    <Button onClick={this.showModal} bsStyle='info' id='editModuleButton'>
                        Edit Module
                    </Button>
                </div>
                <LessonTabs
                    courseId={this.state.courseId}
                    moduleId={this.state.moduleId}
                    moduleTitle={this.state.moduleTitle} />
                <Modal
                    show={this.state.showModal}
                    onHide={this.hideModal}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            Editing Module
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            value={this.state.updatingModuleTitle}
                            onChange={this.updatingModuleChanged}
                            className="form-control" />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.hideModal}>Close</Button>
                        <Button onClick={this.updateModule} bsStyle="primary">Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

ModuleEditor.propTypes = {
    findAllModulesForCourse: PropTypes.func,
    match: PropTypes.object
}