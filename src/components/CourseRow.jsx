import React from 'react'
import PropTypes from 'prop-types'
import { Button, DropdownButton } from 'react-bootstrap'

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
                        <DropdownButton
                            className='dropdownBtn-chase'
                            id='course-dropdown'
                            title='Course Actions'>
                            <div className='btn-group-vertical dropdown-chase'>
                                <Button bsSize='sm' bsStyle='info' onClick={() => { this.props.showModal(this.props.course.id) }}>
                                    Edit
                                </Button>
                                <Button bsSize='sm' bsStyle='danger' onClick={() => { this.props.delete(this.props.course.id) }}>
                                    Delete
                                </Button>
                                <LinkButton
                                    bsSize='sm'
                                    title='Select Course'
                                    params={{ courseTitle: this.props.course.title }}
                                    to={`/course/${this.props.course.id}`}
                                />
                            </div>
                        </DropdownButton>
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