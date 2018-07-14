import React from 'react'
import PropTypes from 'prop-types'

import '../../node_modules/bootstrap/dist/css/bootstrap.css'

export default class ModuleListItem extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <li className="list-group-item">
                {this.props.title}
                <div className="pull-right">
                    <i className="fa fa-trash"></i>
                    <i className="fa fa-pencil"></i>
                </div>
            </li >
        )
    }
}

ModuleListItem.propTypes = {
    title: PropTypes.string
}
