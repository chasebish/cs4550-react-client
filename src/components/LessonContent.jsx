import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

import LessonService from '../services/LessonService'

import './components.css'

export default class LesosnContent extends React.Component {

    constructor(props) {
        super(props)
        this.lessonService = LessonService.instance
    }

    state = {
        courseId: '',
        moduleId: '',
        lessonId: '',
        lessonTitle: ''
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId)
        this.setModuleId(this.props.moduleId)
        this.setLessonId(this.props.lessonId)
        this.setLessonTitle(this.props.lessonTitle)
    }

    setCourseId = (courseId) => this.setState({ courseId })
    setModuleId = (moduleId) => this.setState({ moduleId })
    setLessonId = (lessonId) => this.setState({ lessonId })
    setLessonTitle = (lessonTitle) => this.setState({ lessonTitle })

    deleteLesson = () => {
        this.lessonService.deleteLesson(this.state.lessonId)
            .then(() => {
                this.props.findAllLessons(this.state.courseId, this.state.moduleId)
                this.props.resetSelectedTab()
            })
    }

    render() {

        return (

            <div>
                <h4>Lesson Content: {this.state.lessonTitle}</h4>
                <Button bsSize='sm' bsStyle='danger' onClick={this.deleteLesson} className='buttonRight'>Delete Lesson</Button>
                <Button bsSize='sm' bsStyle='info' onClick={this.createModule}>Edit Lesson</Button>
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