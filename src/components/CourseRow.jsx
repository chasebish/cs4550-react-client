import React from 'react'
import PropTypes from 'prop-types'

export default class CourseRow extends React.Component {

    render() {
        return (
            <tr>
                <td>
                    {this.props.course.title}
                </td>
            </tr>
        )
    }

}

CourseRow.propTypes = {
    course: PropTypes.object
}