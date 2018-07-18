import React from 'react'

import CourseRow from '../components/CourseRow'
import CourseService from '../services/CourseService'

import { Button, Col, Grid, Table, Row, Modal } from 'react-bootstrap'

import './containers.css'

export default class CourseList extends React.Component {

    constructor(props) {
        super(props)
        this.courseService = CourseService.instance
    }

    state = {
        courses: [],
        newCourse: {
            title: ''
        },
        selectedCourse: null,
        selectedCourseTitle: '',
        showModal: false,
        updatingCourse: ''
    }

    componentDidMount() {
        this.findAllCourses()
    }

    findAllCourses = () => {
        this.courseService.findAllCourses()
            .then((courses) => {
                this.setState({ courses: courses })
            })
    }

    titleChanged = (event) => {
        this.setState({
            newCourse: {
                title: event.target.value
            }
        })
    }

    updatingCourseChanged = (event) => {
        this.setState({ updatingCourse: event.target.value })
    }

    showModal = (courseId) => {
        this.setState({ selectedCourse: courseId, showModal: true })
        this.courseService.findCourseById(courseId)
            .then(response => this.setState({ selectedCourseTitle: response.title, updatingCourse: response.title }))
    }

    hideModal = () => {
        this.setState({ selectedCourse: null, showModal: false })
    }

    updateCourse = () => {

        const date = new Date()

        const courseObj = {
            title: this.state.updatingCourse,
            modified: date
        }

        this.courseService.updateCourse(this.state.selectedCourse, courseObj)
            .then(() => {
                this.hideModal()
                this.findAllCourses()
            })
    }

    deleteCourse = (courseId) => {
        this.courseService.deleteCourse(courseId)
            .then(() => { this.findAllCourses() })
    }

    createCourse = () => {

        const date = new Date()

        const courseObj = {
            title: this.state.newCourse.title,
            created: date,
            modified: date
        }

        this.courseService.createCourse(courseObj)
            .then(() => {
                this.setState({
                    newCourse: {
                        title: ''
                    }
                })
                this.findAllCourses()
            })
    }

    renderCourseRows = () => {
        let rows = this.state.courses.map((course) => {
            return <CourseRow course={course} key={course.id} showModal={this.showModal} delete={this.deleteCourse} />
        })
        return rows
    }

    render() {
        return (
            <div>
                <Grid fluid={true}>
                    <h2>Course List</h2>
                    <Row>
                        <Col sm={9}>
                            <div className="input-group">
                                <input id="titleFld" placeholder="CS0000" value={this.state.newCourse.title} onChange={this.titleChanged} className="form-control" />
                                <span className='input-group-btn'>
                                    <button onClick={this.createCourse} className="btn btn-primary">Add Course</button>
                                </span>
                            </div>
                        </Col>
                    </Row>
                    <Table responsive bordered hover>
                        <thead>
                            <tr>
                                <th>Course Name</th>
                                <th>Date Created</th>
                                <th>Date Modified</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderCourseRows()}
                        </tbody>
                    </Table>
                </Grid>
                <Modal
                    show={this.state.showModal}
                    onHide={this.hideModal}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            Editing Course
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            value={this.state.updatingCourse}
                            onChange={this.updatingCourseChanged}
                            className="form-control" />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.hideModal}>Close</Button>
                        <Button onClick={this.updateCourse} bsStyle="primary">Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}