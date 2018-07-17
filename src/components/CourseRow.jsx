import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class CourseRow extends React.Component {

    render() {
        return (
            <tr>
                <td>
                    {this.props.course.title}
                </td>
                <td>
                    <button className="btn btn-danger" onClick={() => { this.props.delete(this.props.course.id) }}>
                        Delete
                    </button>
                    <Link to={`/course/${this.props.course.id}/edit`}>
                        {this.props.course.title}
                    </Link>
                </td>
            </tr>
        )
    }

}

CourseRow.propTypes = {
    course: PropTypes.object,
    delete: PropTypes.func
}