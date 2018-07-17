import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

import LinkButton from '../components/LinkButton'

const CourseRow = (props) => {

    const formatDateTime = (dateTime) => dateTime.substr(0, 19).replace('T', ' ')

    return (
        <tr>
            <td>
                {props.course.title}
            </td>
            <td>
                {formatDateTime(props.course.created)}
            </td>
            <td>
                {formatDateTime(props.course.modified)}
            </td>
            <td>
                <Button bsStyle='danger' onClick={() => { props.delete(props.course.id) }}>
                    Delete
                </Button>
                <LinkButton title='Select Course' to={`/course/${props.course.id}/edit`} />
            </td>
        </tr>
    )
}

CourseRow.propTypes = {
    course: PropTypes.object,
    delete: PropTypes.func
}

export default CourseRow