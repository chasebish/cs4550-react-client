import React from 'react'
import PropTypes from 'prop-types'

import ModuleList from './ModuleList'

export default class CourseEditor extends React.Component {

    state = {
        courseId: '',
        courseTitle: ''
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId)

        if (this.props.location.state && this.props.location.state.courseTitle) {
            this.setCourseTitle(this.props.location.state.courseTitle)
        } else {
            this.setCourseTitle('')
        }

    }

    componentWillReceiveProps(newProps) {
        this.selectCourse(newProps.match.params.courseId)
    }

    selectCourse = (courseId) => {
        this.setState({
            courseId: courseId
        })
    }

    setCourseTitle = (courseTitle) => {
        this.setState({
            courseTitle: courseTitle
        })
    }

    render() {
        return (
            <div>
                <h3>Course {this.state.courseTitle}
                </h3>
                <ModuleList courseId={this.state.courseId} />
            </div>
        )
    }

}

CourseEditor.propTypes = {
    courseTitle: PropTypes.string,
    location: PropTypes.object,
    match: PropTypes.object
}