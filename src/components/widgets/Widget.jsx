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

const WidgetComponent = ({ widget, widgets, preview, deleteWidget, updateWidget, moveDown, moveUp }) => {

    return (
        <li className='list-group-item'>
            <Button
                className='pull-right deleteWidgetButton'
                bsStyle='danger'
                onClick={() => deleteWidget(widget.id)}>
                Delete
            </Button>
            <Button
                disabled={widget.widgetOrder === widgets.length}
                className='pull-right deleteWidgetButton middleButton'
                bsStyle='warning'
                onClick={() => moveDown(widget, widget.widgetOrder)}>
                <Glyphicon glyph="menu-down" />
            </Button>
            <Button
                disabled={widget.widgetOrder <= 1}
                className='pull-right deleteWidgetButton'
                bsStyle='warning'
                onClick={() => moveUp(widget, widget.widgetOrder)}>
                <Glyphicon glyph="menu-up" />
            </Button>
            <div>
                {widget.className === 'HEADING' && <Heading widget={widget} preview={preview} updateWidget={updateWidget} />}
                {widget.className === 'LIST' && <List widget={widget} preview={preview} updateWidget={updateWidget} />}
                {widget.className === 'PARAGRAPH' && <Paragraph widget={widget} preview={preview} updateWidget={updateWidget} />}
                {widget.className === 'LINK' && <Link widget={widget} preview={preview} updateWidget={updateWidget} />}
                {widget.className === 'IMAGE' && <Image widget={widget} preview={preview} updateWidget={updateWidget} />}
            </div>
        </li>
    )
}

const mapStateToProps = state => (
    {
        preview: state.preview,
        widgets: state.widgets
    }
)

const mapDispatchToProps = dispatch => (
    {
        deleteWidget: (widgetId) => dispatch({ type: 'DELETE_WIDGET', widgetId }),
        updateWidget: (widget) => dispatch({ type: 'UPDATE_WIDGET', widget }),
        moveDown: (widget, widgetOrder) => dispatch({ type: 'MOVE_DOWN', widget, widgetOrder }),
        moveUp: (widget, widgetOrder) => dispatch({ type: 'MOVE_UP', widget, widgetOrder })
    }
)

const Widget = connect(mapStateToProps, mapDispatchToProps)(WidgetComponent)

export default Widget

WidgetComponent.propTypes = {
    widget: PropTypes.object,
    widgets: PropTypes.array,
    preview: PropTypes.bool,
    deleteWidget: PropTypes.func,
    updateWidget: PropTypes.func,
    moveDown: PropTypes.func,
    moveUp: PropTypes.func
}