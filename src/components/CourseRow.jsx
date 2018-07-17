import React from 'react'
import PropTypes from 'prop-types'

import LinkButton from '../components/LinkButton'

export default class CourseRow extends React.Component {

    render() {
        return (
            <tr>
                <td>
                    {this.props.course.title}
                </td>
                <td>
                    {this.props.course.created}
                </td>
                <td>
                    {this.props.course.modified}
                </td>
                <td>
                    <button className="btn btn-danger" onClick={() => { this.props.delete(this.props.course.id) }}>
                        Delete
                    </button>
                    <LinkButton title='Select Course' to={`/course/${this.props.course.id}/edit`} />
                </td>
            </tr>
        )
    }

}

CourseRow.propTypes = {
    course: PropTypes.object,
    delete: PropTypes.func
}