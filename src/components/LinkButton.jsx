import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const LinkButton = (props) => {
    return (
        <Link to={props.to}>
            <button className="btn btn-secondary">
                Select Course
            </button>
        </Link>
    )
}

LinkButton.propTypes = {
    title: PropTypes.string,
    to: PropTypes.string
}

export default LinkButton