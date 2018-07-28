import React from 'react'
import PropTypes from 'prop-types'

const Widget = (props) => (
    <li> {props.widget.text} </li>
)

export default Widget

Widget.propTypes = {
    widget: PropTypes.object
}