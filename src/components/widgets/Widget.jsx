import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'

import WidgetType1 from './WidgetType1'
import WidgetType2 from './WidgetType2'
import WidgetType3 from './WidgetType3'

const WidgetComponent = ({ widget, deleteWidget }) => {

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
                {widget.type === 'WT1' && <WidgetType1 />}
                {widget.type === 'WT2' && <WidgetType2 />}
                {widget.type === 'WT3' && <WidgetType3 />}
            </div>
        </li>
    )
}

const mapStateToProps = state => (
    state
)

const mapDispatchToProps = dispatch => (
    {
        deleteWidget: (widgetId) => dispatch({ type: 'DELETE_WIDGET', widgetId })
    }
)

const Widget = connect(mapStateToProps, mapDispatchToProps)(WidgetComponent)

export default Widget

WidgetComponent.propTypes = {
    widget: PropTypes.object,
    deleteWidget: PropTypes.func
}