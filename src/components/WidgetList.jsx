import React from 'react'
import PropTypes from 'prop-types'

import Widget from './Widget'

const WidgetList = (props) => (
    <ul>
        {props.widgets.map(widget =>
            <Widget key={widget.id} widget={widget} />)}
    </ul>)

export default WidgetList

WidgetList.propTypes = {
    widgets: PropTypes.array
}