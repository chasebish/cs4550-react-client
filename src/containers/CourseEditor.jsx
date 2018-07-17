import React from 'react'
import PropTypes from 'prop-types'

import ModuleList from './ModuleList'

export default class CourseEditor extends React.Component {

    state = {
        courseId: '',
        courseTitle: ''
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId, this.props.match.params.title)
    }

    componentWillReceiveProps(newProps) {
        this.selectCourse(newProps.match.params.courseId, newProps.match.params.title)
    }

    selectCourse = (courseId, courseTitle) => {
        this.setState({
            courseId: courseId,
            courseTitle: courseTitle
        })
    }

    render() {
        return (
            <div>
                <h3>Course {(this.props.location.state && this.props.location.state.courseTitle) ? this.props.location.state.courseTitle : ''}
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