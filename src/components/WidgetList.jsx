import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

import Widget from './widgets/Widget'

const WidgetListComponent = ({ widgets, createWidget, saveWidgets }) => {

    let widgetTitle
    let widgetType

    return (
        <div>
            <Button
                onClick={() => saveWidgets()}
                className='pull-right'
                bsStyle='success'>Save Widgets</Button>
            <h2>Widget List</h2>
            <ul className='list-group'>
                <li className='list-group-item'>
                    <input ref={node => widgetTitle = node} className='form-control' />
                    <select ref={node => widgetType = node} className='form-control'>
                        <option value='HEADING'>Heading Widget</option>
                        <option value='IMAGE'>Image Widget</option>
                        <option value='LINK'>Link Widget</option>
                        <option value='LIST'>List Widget</option>
                        <option value='PARAGRAPH'>Paragraph Widget</option>
                    </select>
                    <Button
                        className='form-control'
                        bsStyle='primary'
                        onClick={() => {
                            let widget = {
                                title: widgetTitle.value,
                                id: new Date().getTime(),
                                type: widgetType.value
                            }
                            widgetTitle.value = ''
                            createWidget(widget)
                        }
                        }>
                        Add Widget
                    </Button>
                </li>
                {widgets.map((widget, index) =>
                    <Widget key={index} widget={widget} />)}
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        widgets: state.widgets
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createWidget: (widget) => dispatch({
            type: 'CREATE_WIDGET',
            widget
        }),
        saveWidgets: () => dispatch({
            type: 'SAVE_WIDGETS'
        })
    }
}

const WidgetList = connect(mapStateToProps, mapDispatchToProps)(WidgetListComponent)

export default WidgetList

WidgetListComponent.propTypes = {
    widgets: PropTypes.array,
    createWidget: PropTypes.func,
    saveWidgets: PropTypes.func
}