import React from 'react'
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
                </td>
            </tr>
        )
    }

}

CourseRow.propTypes = {
    course: PropTypes.object,
    delete: PropTypes.func
}