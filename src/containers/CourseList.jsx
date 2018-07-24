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
        todayCourses: [],
        yesterdayCourses: [],
        weekCourses: [],
        monthCourses: [],
        yearCourses: [],
        oldCourses: [],
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
                this.binCourses(courses)
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

    binCourses = (courses) => {

        let todayCourses = []
        let yesterdayCourses = []
        let weekCourses = []
        let monthCourses = []
        let yearCourses = []
        let oldCourses = []

        const now = new Date()

        for (let course of courses) {

            let modified = new Date(course.modified)

            const timeDiff = Math.abs(now.getTime() - modified.getTime())
            const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24))

            if (diffDays === 0) {
                todayCourses.push(course)
            } else if (diffDays === 1) {
                yesterdayCourses.push(course)
            } else if (diffDays <= 7) {
                weekCourses.push(course)
            } else if (diffDays <= 31) {
                monthCourses.push(course)
            } else if (diffDays <= 365) {
                yearCourses.push(course)
            } else {
                oldCourses.push(course)
            }

            this.setState({
                todayCourses,
                yesterdayCourses,
                weekCourses,
                monthCourses,
                yearCourses,
                oldCourses
            })
        }
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

    renderSpecificCourseRows = (courses) => {

        if (courses.length === 0) {
            return
        }

        let rows = courses.map((course) => {
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
                    {this.state.todayCourses.length >= 1 &&
                        <div>
                            <h3>Today</h3>
                            <Table bordered hover className='table-responsive'>
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
                                    {this.renderSpecificCourseRows(this.state.todayCourses)}
                                </tbody>
                            </Table>
                        </div>
                    }
                    {this.state.yesterdayCourses.length >= 1 &&
                        <div>
                            <h3>Yesterday</h3>
                            <Table bordered hover className='table-responsive'>
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
                                    {this.renderSpecificCourseRows(this.state.yesterdayCourses)}
                                </tbody>
                            </Table>
                        </div>
                    }
                    {this.state.weekCourses.length >= 1 &&
                        <div>
                            <h3>This Week</h3>
                            <Table bordered hover className='table-responsive'>
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
                                    {this.renderSpecificCourseRows(this.state.weekCourses)}
                                </tbody>
                            </Table>
                        </div>
                    }
                    {this.state.monthCourses.length >= 1 &&
                        <div>
                            <h3>This Month</h3>
                            <Table bordered hover className='table-responsive'>
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
                                    {this.renderSpecificCourseRows(this.state.monthCourses)}
                                </tbody>
                            </Table>
                        </div>
                    }
                    {this.state.yearCourses.length >= 1 &&
                        <div>
                            <h3>This Year</h3>
                            <Table bordered hover className='table-responsive'>
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
                                    {this.renderSpecificCourseRows(this.state.yearCourses)}
                                </tbody>
                            </Table>
                        </div>
                    }
                    {this.state.oldCourses.length >= 1 &&
                        <div>
                            <h3>Before This Year</h3>
                            <Table bordered hover className='table-responsive'>
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
                                    {this.renderSpecificCourseRows(this.state.oldCourses)}
                                </tbody>
                            </Table>
                        </div>
                    }
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
                        <Button
                            disabled={this.state.updatingCourse === ''}
                            onClick={this.updateCourse}
                            bsStyle="primary">
                            Save changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}