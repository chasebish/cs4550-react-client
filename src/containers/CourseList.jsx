import React from 'react'

import CourseRow from '../components/CourseRow'
import CourseService from '../services/CourseService'

export default class CourseList extends React.Component {

    constructor(props) {
        super(props)

        this.courseService = CourseService.instance
    }

    state = {
        courses: [],
        newCourse: {
            title: ''
        }
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
            .then(() => { this.findAllCourses() })
    }

    renderCourseRows = () => {
        let rows = this.state.courses.map((course) => {
            return <CourseRow course={course} key={course.title} delete={this.deleteCourse}/>
        })
        return rows
    }

    render() {
        return (
            <div>
                <h2>Course List</h2>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Title</th>
                        </tr>
                        <tr>
                            <th><input id="titleFld" placeholder="CS0000" onChange={this.titleChanged} className="form-control" /></th>
                            <th><button onClick={this.createCourse} className="btn btn-primary">Add</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCourseRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}