import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const LinkButton = (props) => {
    return (
        <Link to={props.to}>
            <Button onClick={props.onClick} bsSize={props.bsSize ? props.bsSize : null} bsStyle='primary'>
                {props.title ? props.title : 'Select'}
            </Button>
        </Link>
    )
}

LinkButton.propTypes = {
    bsSize: PropTypes.string,
    title: PropTypes.string,
    to: PropTypes.any,
    onClick: PropTypes.func
}

export default LinkButton