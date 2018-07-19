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
            title: '',
            owner: ''
        },
        selectedCourse: null,
        selectedCourseTitle: '',
        showModal: false,
        updatingCourse: '',
        updatingOwner: '',
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

    ownerChanged = (event) => {
        this.setState({
            newCourse: {
                title: this.state.newCourse.title,
                owner: event.target.value
            }
        })
    }

    titleChanged = (event) => {
        this.setState({
            newCourse: {
                owner: this.state.newCourse.owner,
                title: event.target.value
            }
        })
    }

    updatingOwnerChanged = (event) => {
        this.setState({ updatingOwner: event.target.value })
    }

    updatingCourseChanged = (event) => {
        this.setState({ updatingCourse: event.target.value })
    }

    showModal = (courseId) => {
        this.setState({ selectedCourse: courseId, showModal: true })
        this.courseService.findCourseById(courseId)
            .then(response =>
                this.setState({
                    selectedCourseTitle: response.title,
                    updatingCourse: response.title,
                    updatingOwner: response.owner
                })
            )
    }

    hideModal = () => {
        this.setState({ selectedCourse: null, showModal: false })
    }

    updateCourse = () => {

        const date = new Date()

        const courseObj = {
            title: this.state.updatingCourse,
            owner: this.state.updatingOwner,
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
            owner: this.state.newCourse.owner,
            created: date,
            modified: date
        }

        this.courseService.createCourse(courseObj)
            .then(() => {
                this.setState({
                    newCourse: {
                        title: '',
                        owner: ''
                    }
                })
                this.findAllCourses()
            })
    }

    renderCourseRows = () => {

        if (this.state.courses.length === 0) {
            return
        }

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
                    <Row id="buttonRow">
                        <Col md={6} lg={3}>
                            <h5>Course Name</h5>
                            <input id="titleFld" placeholder="CS0000" value={this.state.newCourse.title} onChange={this.titleChanged} className="form-control" />
                        </Col>
                        <Col md={6} lg={4}>
                            <h5>Course Owner</h5>
                            <div className="input-group">
                                <input id="ownerFld" placeholder="Jose Annunziato" value={this.state.newCourse.owner} onChange={this.ownerChanged} className="form-control" />
                                <span className='input-group-btn'>
                                    <Button
                                        disabled={this.state.newCourse.title === ''}
                                        onClick={this.createCourse}
                                        bsStyle='primary'>
                                        Add Course
                                    </Button>
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
                                <th>Owner</th>
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
                        <h5>Course Name</h5>
                        <input
                            value={this.state.updatingCourse}
                            onChange={this.updatingCourseChanged}
                            className="form-control" />
                        <h5>Owner Name</h5>
                        <input
                            value={this.state.updatingOwner}
                            onChange={this.updatingOwnerChanged}
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