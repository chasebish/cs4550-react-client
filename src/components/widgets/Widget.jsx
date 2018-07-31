import React from 'react'
import PropTypes from 'prop-types'
import { Button, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'

import Heading from './Heading'
import List from './List'
import Paragraph from './Paragraph'
import Link from './Link'
import Image from './Image'

import './widgets.css'

const WidgetComponent = ({ widget, widgets, deleteWidget, updateWidget, moveDown, moveUp }) => {

    return (
        <li className='list-group-item'>
            <Button
                className='pull-right deleteWidgetButton'
                bsStyle='danger'
                onClick={() => deleteWidget(widget.id)}>
                Delete
            </Button>
            <Button
                disabled={widget.order === widgets.length}
                className='pull-right deleteWidgetButton middleButton'
                bsStyle='warning'
                onClick={() => moveDown(widget, widget.order)}>
                <Glyphicon glyph="menu-down" />
            </Button>
            <Button
                disabled={widget.order <= 1}
                className='pull-right deleteWidgetButton'
                bsStyle='warning'
                onClick={() => moveUp(widget, widget.order)}>
                <Glyphicon glyph="menu-up" />
            </Button>
            <div>
                {widget.type === 'HEADING' && <Heading widget={widget} updateWidget={updateWidget} />}
                {widget.type === 'LIST' && <List widget={widget} updateWidget={updateWidget} />}
                {widget.type === 'PARAGRAPH' && <Paragraph widget={widget} updateWidget={updateWidget} />}
                {widget.type === 'LINK' && <Link widget={widget} updateWidget={updateWidget} />}
                {widget.type === 'IMAGE' && <Image widget={widget} updateWidget={updateWidget} />}
            </div>
        </li>
    )
}

const mapStateToProps = state => (
    {
        widgets: state.widgets
    }
)

const mapDispatchToProps = dispatch => (
    {
        deleteWidget: (widgetId) => dispatch({ type: 'DELETE_WIDGET', widgetId }),
        updateWidget: (widget) => dispatch({ type: 'UPDATE_WIDGET', widget }),
        moveDown: (widget, order) => dispatch({ type: 'MOVE_DOWN', widget, order }),
        moveUp: (widget, order) => dispatch({ type: 'MOVE_UP', widget, order })
    }
)

const Widget = connect(mapStateToProps, mapDispatchToProps)(WidgetComponent)

export default Widget

WidgetComponent.propTypes = {
    widget: PropTypes.object,
    widgets: PropTypes.array,
    deleteWidget: PropTypes.func,
    updateWidget: PropTypes.func,
    moveDown: PropTypes.func,
    moveUp: PropTypes.func
}