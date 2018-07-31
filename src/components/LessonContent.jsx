import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'

import TopicTabs from '../containers/TopicTabs'

import CourseService from '../services/CourseService'
import LessonService from '../services/LessonService'

import './components.css'

export default class LesosnContent extends React.Component {

    constructor(props) {
        super(props)
        this.lessonService = LessonService.instance
        this.courseService = CourseService.instance
    }

    state = {
        courseId: '',
        moduleId: '',
        lessonId: '',
        lessonTitle: '',

        showModal: false,
        newTitle: ''
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId)
        this.setModuleId(this.props.moduleId)
        this.setLessonId(this.props.lessonId)
        this.setLessonTitle(this.props.lessonTitle)
        this.setNewTitle(this.props.lessonTitle)
    }

    showModal = () => this.setState({ showModal: true })
    hideModal = () => this.setState({ showModal: false })
    titleChanged = (event) => this.setState({ newTitle: event.target.value })

    setCourseId = (courseId) => this.setState({ courseId })
    setModuleId = (moduleId) => this.setState({ moduleId })
    setLessonId = (lessonId) => this.setState({ lessonId })
    setLessonTitle = (lessonTitle) => this.setState({ lessonTitle })
    setNewTitle = (lessonTitle) => this.setState({ newTitle: lessonTitle })

    deleteLesson = () => {

        const courseObj = {
            modified: new Date()
        }

        this.lessonService.deleteLesson(this.state.lessonId)
            .then(() => {
                this.props.findAllLessons(this.state.courseId, this.state.moduleId)
                this.props.resetSelectedTab()
                this.courseService.updateCourse(this.state.courseId, courseObj)
            })
    }

    updateLesson = () => {

        const courseObj = {
            modified: new Date()
        }

        const lessonObj = {
            title: this.state.newTitle
        }

        this.lessonService.updateLesson(this.state.lessonId, lessonObj)
            .then((response) => {
                this.setLessonTitle(response.title)
                this.props.findAllLessons(this.state.courseId, this.state.moduleId)
                this.hideModal()
                this.courseService.updateCourse(this.state.courseId, courseObj)
            })
    }

    render() {

        return (
            <div>
                <h4>Lesson Content: {this.state.lessonTitle}</h4>
                <Button bsSize='sm' bsStyle='danger' onClick={this.deleteLesson} className='buttonRight marginBottom'>Delete Lesson</Button>
                <Button bsSize='sm' bsStyle='info' onClick={this.showModal} className='marginBottom'>Edit Lesson</Button>
                <TopicTabs
                    courseId={this.props.courseId}
                    moduleId={this.props.moduleId}
                    lessonId={this.props.lessonId} />

                <Modal
                    show={this.state.showModal}
                    onHide={this.hideModal}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            Editing Lesson
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            value={this.state.newTitle}
                            onChange={this.titleChanged}
                            className="form-control" />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.hideModal}>Close</Button>
                        <Button
                            disabled={this.state.newTitle === ''}
                            onClick={this.updateLesson}
                            bsStyle="primary">
                            Save changes
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>

        )
    }

}

LesosnContent.propTypes = {
    courseId: PropTypes.string,
    moduleId: PropTypes.string,
    lessonId: PropTypes.string,
    lessonTitle: PropTypes.string,
    findAllLessons: PropTypes.func,
    resetSelectedTab: PropTypes.func
}