import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

import LinkButton from '../components/LinkButton'

import './components.css'

export default class CourseRow extends React.Component {

    state = {
        visible: false
    }

    formatDateTime = (dateTime) => new Date(dateTime).toLocaleString()

    render() {
        return (
            <tr>
                <td>
                    {this.props.course.title}
                </td>
                <td>
                    {this.formatDateTime(this.props.course.created)}
                </td>
                <td>
                    {this.formatDateTime(this.props.course.modified)}
                </td>
                <td>
                    {this.props.course.owner}
                </td>
                <td>
                    <div>
                        <Button className='buttonLeft buttonRight' bsStyle='info' onClick={() => { this.props.showModal(this.props.course.id) }}>
                            Edit
                        </Button>
                        <Button className='buttonRight' bsStyle='danger' onClick={() => { this.props.delete(this.props.course.id) }}>
                            Delete
                        </Button>
                        <LinkButton
                            title='Select Course'
                            params={{ courseTitle: this.props.course.title }}
                            to={`/course/${this.props.course.id}`}
                        />
                    </div>
                </td>
            </tr>
        )
    }
}

CourseRow.propTypes = {
    course: PropTypes.object,
    delete: PropTypes.func,
    showModal: PropTypes.func
}