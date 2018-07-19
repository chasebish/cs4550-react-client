import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button, Tab, Tabs } from 'react-bootstrap'

import CourseService from '../services/CourseService'
import LessonService from '../services/LessonService'
import LessonContent from '../components/LessonContent'

import './containers.css'

export default class LessonTabs extends React.Component {

    constructor(props) {
        super(props)
        this.courseService = CourseService.instance
        this.lessonService = LessonService.instance
    }

    state = {
        courseId: '',
        moduleId: '',
        moduleTitle: '',
        lessons: [],
        lesson: {
            title: ''
        },
        selectedTab: undefined
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId)
        this.setModuleId(this.props.moduleId)
        this.setModuleTitle(this.props.moduleTitle)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.moduleId !== this.props.moduleId) {
            this.findAllLessonsForModule(this.props.courseId, this.props.moduleId)
        }
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId)
        this.setModuleId(newProps.moduleId)
        this.setModuleTitle(newProps.moduleTitle)
    }

    resetSelectedTab = () => {
        this.setState({ selectedTab: undefined })
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

    createLesson = () => {

        const courseObj = {
            modified: new Date()
        }

        this.lessonService.createLesson(this.state.courseId, this.state.moduleId, this.state.lesson)
            .then(() => {
                this.setState({ lesson: { title: '' } })
                this.courseService.updateCourse(this.state.courseId, courseObj)
                this.findAllLessonsForModule(this.state.courseId, this.state.moduleId)

            })
    }

    setLessonTitle = (event) => {
        this.setState({
            lesson: {
                title: event.target.value
            }
        })
    }

    handleSelect = (key) => {
        this.setState({ selectedTab: key })
    }

    renderLessons = () => {

        if (this.state.lessons.length === 0) {
            return
        }

        let lessons = this.state.lessons.map((lesson) => {
            return (
                <Tab key={lesson.id} eventKey={lesson.id} title={lesson.title}>
                    <div className='lessonContent'>
                        <LessonContent
                            courseId={this.state.courseId}
                            moduleId={this.state.moduleId}
                            lessonId={lesson.id.toString()}
                            lessonTitle={lesson.title}
                            findAllLessons={this.findAllLessonsForModule}
                            resetSelectedTab={this.resetSelectedTab} />
                    </div>
                </Tab>
            )
        })

        return (
            <Tabs id='lessonTabs' defaultActiveKey={this.state.selectedTab} onSelect={this.handleSelect} animation={true}>
                {lessons}
            </Tabs>
        )


    }

    render() {
        return (
            <Router>
                <div className="row">
                    <div className='col-4'>
                        <div className='input-group'>
                            <input
                                value={this.state.lesson.title}
                                onChange={this.setLessonTitle}
                                className="col form-control" />
                            <span className='input-group-btn'>
                                <Button
                                    disabled={this.state.lesson.title === ''}
                                    bsStyle='primary'
                                    onClick={this.createLesson}
                                    className='col'>Create</Button>
                            </span>
                        </div>
                        <div className='modulePadding'>
                            {this.renderLessons()}
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

LessonTabs.propTypes = {
    courseId: PropTypes.string,
    moduleId: PropTypes.string,
    moduleTitle: PropTypes.string
}