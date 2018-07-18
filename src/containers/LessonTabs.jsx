import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { Tab, Tabs } from 'react-bootstrap-tabs'

import CourseService from '../services/CourseService'
import LessonService from '../services/LessonService'

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

    createLesson = () => {
        this.lessonService.createLesson(this.state.courseId, this.state.moduleId, this.state.lesson)
            .then(() => {

                const modified = new Date()

                const courseObj = {
                    modified: modified
                }

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

    renderLessons = () => {

        if (!this.state.lessons) {
            return
        }

        // let lessons = this.state.lessons.map((lesson) => {
        //     return <Tab tabClassName='nav' key={lesson.id} title={lesson.title} />
        // })

        return (
            <Tabs onSelect={(index, label) => console.log(label + ' selected')}>
                <Tab label="Tab1">Tab 1 content</Tab>
                <Tab label="Tab2">Tab 2 content</Tab>
            </Tabs>
        )


    }

    render() {
        return (
            <Router>
                <div className="row">
                    <div className='col-4'>
                        <h4>Module List for courseId: {this.state.courseId}</h4>
                        <input value={this.state.lesson.title} onChange={this.setLessonTitle} className="col form-control" />
                        <Button bsStyle='primary' onClick={this.createLesson} className='col'>Create</Button>
                        {this.renderLessons()}
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