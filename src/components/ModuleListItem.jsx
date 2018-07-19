import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, ListGroupItem } from 'react-bootstrap'

import LinkButton from './LinkButton'

import './components.css'

export default class ModuleListItem extends React.Component {

    selectModule = () => {
        this.props.selectModule(this.props.module.id)
    }

    selectedModule = () => {
        if (this.props.module.id === this.props.selectedModule) {
            return 'selectedModule'
        }
    }

    render() {

        return (
            <ListGroupItem className={(this.props.module.id === this.props.selectedModule ? 'selectedModule' : 'defaultModule')}>
                <div className="buttonContainer">
                    <span className="pull-right">
                        <Link to={`/course/${this.props.courseId}`}>
                            <Button
                                bsStyle='danger'
                                bsSize='sm'
                                className='buttonRight'
                                onClick={() => this.props.delete(this.props.module.id)}>
                                Delete
                            </Button>
                        </Link>
                        <LinkButton
                            onClick={this.selectModule}
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
    module: PropTypes.object,
    selectModule: PropTypes.func,
    selectedModule: PropTypes.number
}
