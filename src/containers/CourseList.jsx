import React from 'react'

import CourseRow from '../components/CourseRow'
import CourseService from '../services/CourseService'

export default class CourseList extends React.Component {

    constructor(props) {
        super(props)

        this.courseService = CourseService.instance
    }

    state = {
        courses: []
    }

    componentDidMount() {
        this.courseService.findAllCourses().then(courses => this.setState({ courses: courses }))
    }

    renderCourseRows = () => {
        let rows = this.state.courses.map(function (course) {
            return <CourseRow course={course} key={course}/>
        })
        return rows
    }

    render() {
        return (
            <div>
                <h2>Course List</h2>
                <table className='table'>
                    <thead><tr><th>Title</th></tr></thead>
                    <tbody>
                        {this.renderCourseRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}