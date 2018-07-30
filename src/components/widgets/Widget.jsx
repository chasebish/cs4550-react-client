import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'

import Heading from './Heading'
import List from './List'
import Paragraph from './Paragraph'
import Link from './Link'

const WidgetComponent = ({ widget, deleteWidget, updateWidget }) => {

    return (
        <li className='list-group-item'>
            {widget.title} ({widget.id}) - {widget.type}
            <Button
                className='pull-right'
                bsStyle='danger'
                onClick={() => deleteWidget(widget.id)}>
                Delete
            </Button>
            <div>
                {widget.type === 'HEADING' && <Heading widget={widget} updateWidget={updateWidget} />}
                {widget.type === 'LIST' && <List widget={widget} updateWidget={updateWidget} />}
                {widget.type === 'PARAGRAPH' && <Paragraph widget={widget} updateWidget={updateWidget} />}
                {widget.type === 'LINK' && <Link widget={widget} updateWidget={updateWidget} />}
            </div>
        </li>
    )
}

const mapStateToProps = state => (
    state
)

const mapDispatchToProps = dispatch => (
    {
        deleteWidget: (widgetId) => dispatch({ type: 'DELETE_WIDGET', widgetId }),
        updateWidget: (widget) => dispatch({ type:'UPDATE_WIDGET', widget })
    }
)

const Widget = connect(mapStateToProps, mapDispatchToProps)(WidgetComponent)

export default Widget

WidgetComponent.propTypes = {
    widget: PropTypes.object,
    deleteWidget: PropTypes.func,
    updateWidget: PropTypes.func
}