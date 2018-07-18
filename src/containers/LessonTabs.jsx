import React from 'react'
import PropTypes from 'prop-types'
import { Tab, Tabs } from 'react-bootstrap'

import LessonService from '../services/LessonService'

export default class LessonTabs extends React.Component {

    constructor(props) {
        super(props)
        this.lessonService = LessonService.instance
    }

    state = {
        courseId: '',
        moduleId: '',
        moduleTitle: '',
        lessons: [],
        lesson: {
            title: ''
        }
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId)
        this.setModuleId(this.props.moduleId)
        this.setModuleTitle(this.props.moduleTitle)
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId)
        this.setModuleId(newProps.moduleId)
        this.setModuleTitle(newProps.moduleTitle)
        this.findAllLessonsForModule(newProps.courseId, newProps.moduleId)
    }

    setCourseId = () => {
        this.setState({ courseId: this.props.courseId })
    }

    setModuleId = () => {
        this.setState({ moduleId: this.props.moduleId })
    }

    setModuleTitle = () => {
        this.setState({ moduleTitle: this.props.moduleTitle })
    }

    setLessons = (lessons) => {
        this.setState({ lessons: lessons })
    }

    findAllLessonsForModule = (courseId, moduleId) => {
        this.lessonService.findAllLessonsForModule(courseId, moduleId)
            .then(lessons => this.setLessons(lessons))
    }

    render() {
        return (
            <div>
                <h3>Lesson Tabs</h3>

                <ul className="nav nav-tabs">
                    <li className="nav-item"><a className="nav-link active"
                        href="#">Active Tab</a></li>
                    <li className="nav-item"><a className="nav-link"
                        href="#">Another Tab</a></li>
                </ul>
            </div>
        )
    }
}

LessonTabs.propTypes = {
    courseId: PropTypes.string,
    moduleId: PropTypes.string,
    moduleTitle: PropTypes.string
}