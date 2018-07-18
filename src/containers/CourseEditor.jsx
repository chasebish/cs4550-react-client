import React from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Row } from 'react-bootstrap'

import CourseService from '../services/CourseService'
import ModuleList from './ModuleList'

export default class CourseEditor extends React.Component {

    constructor(props) {
        super(props)
        this.courseService = CourseService.instance
    }

    state = {
        courseId: '',
        courseTitle: ''
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId)
        this.courseService.findCourseById(this.props.match.params.courseId)
            .then((response) => this.setCourseTitle(response.title))
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
            <Grid fluid={true}>
                <h1>Course {this.state.courseTitle}</h1>
                {/* <Button
                    bsStyle='info'
                    bsSize='sm'>
                    Change Name
                </Button> */}
                <ModuleList courseId={this.state.courseId} courseTitle={this.state.courseTitle} />
            </Grid>
        )
    }

}

CourseEditor.propTypes = {
    courseTitle: PropTypes.string,
    location: PropTypes.object,
    match: PropTypes.object
}