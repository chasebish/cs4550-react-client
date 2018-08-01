import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'

import CourseService from '../services/CourseService'
import TopicService from '../services/TopicService'

import WidgetList from './WidgetList'

import './components.css'

export default class TopicContent extends React.Component {

    constructor(props) {
        super(props)
        this.topicService = TopicService.instance
        this.courseService = CourseService.instance
    }

    state = {
        courseId: '',
        moduleId: '',
        lessonId: '',
        topicId: '',
        topicTitle: '',

        showModal: false,
        newTitle: ''
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId)
        this.setModuleId(this.props.moduleId)
        this.setLessonId(this.props.lessonId)
        this.setTopicId(this.props.topicId)
        this.setTopicTitle(this.props.topicTitle)
        this.setNewTitle(this.props.topicTitle)
    }

    showModal = () => this.setState({ showModal: true })
    hideModal = () => this.setState({ showModal: false })
    titleChanged = (event) => this.setState({ newTitle: event.target.value })

    setCourseId = (courseId) => this.setState({ courseId })
    setModuleId = (moduleId) => this.setState({ moduleId })
    setLessonId = (lessonId) => this.setState({ lessonId })
    setTopicId = (topicId) => this.setState({ topicId })
    setTopicTitle = (topicTitle) => this.setState({ topicTitle })
    setNewTitle = (topicTitle) => this.setState({ newTitle: topicTitle })

    deleteTopic = () => {

        const courseObj = {
            modified: new Date()
        }

        this.topicService.deleteTopic(this.state.topicId)
            .then(() => {
                this.props.findAllTopics(this.state.courseId, this.state.moduleId, this.state.lessonId)
                this.courseService.updateCourse(this.state.courseId, courseObj)
            })

    }

    updateTopic = () => {

        const courseObj = {
            modified: new Date()
        }

        const topicObj = {
            title: this.state.newTitle
        }

        this.topicService.updateTopic(this.state.topicId, topicObj)
            .then((response) => {
                this.setTopicTitle(response.title)
                this.props.findAllTopics(this.state.courseId, this.state.moduleId, this.state.lessonId)
                this.hideModal()
                this.courseService.updateCourse(this.state.courseId, courseObj)
            })
    }

    render() {

        return (
            <div className='topicBtns'>
                <h5>Topic: {this.state.topicTitle}</h5>
                <Button bsSize='sm' bsStyle='danger' onClick={this.deleteTopic} className='buttonRight'>Delete Topic</Button>
                <Button bsSize='sm' bsStyle='info' onClick={this.showModal}>Edit Topic</Button>

                <WidgetList
                    courseId={this.state.courseId}
                    moduleId={this.state.moduleId}
                    lessonId={this.state.lessonId}
                    topicId={this.state.topicId}
                />

                <Modal
                    show={this.state.showModal}
                    onHide={this.hideModal}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            Editing Topic
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
                            onClick={this.updateTopic}
                            bsStyle="primary">
                            Save changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}

TopicContent.propTypes = {
    courseId: PropTypes.string,
    moduleId: PropTypes.string,
    lessonId: PropTypes.string,
    topicId: PropTypes.string,
    topicTitle: PropTypes.string,

    findAllTopics: PropTypes.func,
}