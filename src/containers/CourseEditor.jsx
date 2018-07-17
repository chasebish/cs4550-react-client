import React from 'react'
import PropTypes from 'prop-types'

import ModuleList from './ModuleList'

export default class CourseEditor extends React.Component {

    state = {
        courseId: ''
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId)
    }

    componentWillReceiveProps(newProps) {
        this.selectCourse(newProps.match.params.courseId)
    }


    selectCourse = (courseId) => {
        this.setState({ courseId: courseId })
    }

    render() {
        return (
            <div>
                <h3>Course {this.state.courseId}
                </h3>
                <ModuleList courseId={this.state.courseId} />
            </div>
        )
    }

}

CourseEditor.propTypes = {
    match: PropTypes.object
}