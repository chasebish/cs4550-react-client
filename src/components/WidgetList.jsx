import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Button} from 'react-bootstrap'

import Widget from './widgets/Widget'

const WidgetListComponent = ({ widgets, createWidget }) => {

    let widgetTitle
    let widgetType

    return (
        <div>
            <h2>Widget List</h2>
            <ul className='list-group'>
                <li className='list-group-item'>
                    <input ref={node => widgetTitle = node} className='form-control'/>
                    <select ref={node => widgetType = node} className='form-control'>
                        <option value = 'WT1'>Widget Type 1</option>
                        <option value = 'WT2'>Widget Type 2</option>
                        <option value = 'WT3'>Widget Type 3</option>
                    </select>
                    <Button
                        bsStyle='primary'
                        onClick={() => {
                            let widget = {
                                title: widgetTitle.value,
                                id: new Date().getTime(),
                                type: widgetType.value
                            }
                            widgetTitle.value = ''
                            createWidget(widget)}
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
    console.log(state)
    return {
        widgets: state.widgets
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createWidget: (widget) => dispatch({
            type: 'CREATE_WIDGET',
            widget
        })
    }
}

const WidgetList = connect(mapStateToProps, mapDispatchToProps)(WidgetListComponent)

export default WidgetList

WidgetListComponent.propTypes = {
    widgets: PropTypes.array,
    createWidget: PropTypes.func
}