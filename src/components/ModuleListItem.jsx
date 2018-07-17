import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import '../../node_modules/bootstrap/dist/css/bootstrap.css'

export default class ModuleListItem extends React.Component {

    render() {
        return (
            <li>
                {this.props.module.title}
                <button
                    onClick={() => this.props.delete(this.props.module.id)}
                    className="btn-danger btn-sm">
                    DELETE
                </button>
                <Link to={`/course/${this.props.courseId}/module/${this.props.module.id}`}>
                    {this.props.module.title}
                </Link>
            </li>
        )
    }

}

ModuleListItem.propTypes = {
    courseId: PropTypes.string,
    delete: PropTypes.func,
    module: PropTypes.object
}
