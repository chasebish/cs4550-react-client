import React from 'react'
import PropTypes from 'prop-types'

import '../../node_modules/bootstrap/dist/css/bootstrap.css'

export default class ModuleListItem extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <li>
                {this.props.module.title}
                <button
                    onClick={() => this.props.delete(this.props.module.id)}
                    className="btn-danger btn-sm">
                    DELETE
                </button>
            </li>
            // <li className="list-group-item">
            //     {this.props.title}
            //     <div className="pull-right">
            //         <i className="fa fa-trash"></i>
            //         <i className="fa fa-pencil"></i>
            //     </div>
            // </li>
        )
    }

}

ModuleListItem.propTypes = {
    delete: PropTypes.func,
    module: PropTypes.object
}
