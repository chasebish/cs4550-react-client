import React from 'react'
import PropTypes from 'prop-types'
import { Button, ListGroupItem } from 'react-bootstrap'

import LinkButton from './LinkButton'

import './components.css'

export default class ModuleListItem extends React.Component {

    render() {
        return (
            <ListGroupItem>
                <div className="buttonContainer">
                    <span className="pull-right">
                        <Button
                            bsStyle='danger'
                            bsSize='sm'
                            onClick={() => this.props.delete(this.props.module.id)}>
                            Delete
                        </Button>
                        <LinkButton
                            bsSize='sm'
                            to={`/course/${this.props.courseId}/module/${this.props.module.id}`}>
                            {this.props.module.title}
                        </LinkButton>
                    </span>
                    {this.props.module.title}
                </div>
            </ListGroupItem>
        )
    }
}

ModuleListItem.propTypes = {
    courseId: PropTypes.string,
    delete: PropTypes.func,
    module: PropTypes.object
}
