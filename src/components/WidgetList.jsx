/* global alert */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Col, Row } from 'react-bootstrap'

import Widget from './widgets/Widget'

const WidgetListComponent = ({ widgets, createWidget, saveWidgets, togglePreview, topicId }) => {

    let widgetName, widgetType

    return (
        <div>
            <Button
                onClick={() => saveWidgets(topicId)}
                className='pull-right'
                bsStyle='success'>
                Save Widgets
            </Button>
            <Button
                onClick={() => togglePreview()}
                className='pull-right buttonRight'
                bsStyle='info'>
                Toggle Preview
            </Button>
            <h2>Widget List</h2>
            <ul className='list-group'>
                <li className='list-group-item'>
                    <Row>
                        <Col sm={6}>
                            <input placeholder='Widget Name' ref={node => widgetName = node} className='form-control addWidgetMargin' />
                        </Col>
                        <Col sm={6}>
                            <select ref={node => widgetType = node} className='form-control addWidgetMargin'>
                                <option value='HEADING'>Heading Widget</option>
                                <option value='IMAGE'>Image Widget</option>
                                <option value='LINK'>Link Widget</option>
                                <option value='LIST'>List Widget</option>
                                <option value='PARAGRAPH'>Paragraph Widget</option>
                            </select>
                        </Col>
                    </Row>
                    <Button
                        className='form-control addWidgetMargin'
                        bsStyle='primary'
                        onClick={() => {

                            let name = widgetName.value
                            let arr = widgets.filter((widget) => name === widget.name)

                            if (arr.length >= 1) {
                                alert('Widget name must be unique!')
                                return
                            } else {

                                let newOrder

                                if (widgets.length <= 0) { newOrder = 1} else { newOrder = widgets[widgets.length - 1].widgetOrder + 1 }

                                let widget = {
                                    name: widgetName.value,
                                    id: newOrder,
                                    className: widgetType.value,
                                    widgetOrder: newOrder,
                                    editorOpen: true
                                }
                                widgetName.value = ''
                                createWidget(widget)
                            }
                        }}>
                        Add Widget
                    </Button>
                </li>
                {widgets
                    .sort((a, b) => a.widgetOrder - b.widgetOrder)
                    .map((widget, index) => <Widget key={index} widget={widget} />)}
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
        saveWidgets: (topicId) => dispatch({
            type: 'SAVE_WIDGETS',
            topicId
        }),
        togglePreview: () => dispatch({
            type: 'TOGGLE_PREVIEW'
        })
    }
}

const WidgetList = connect(mapStateToProps, mapDispatchToProps)(WidgetListComponent)

export default WidgetList

WidgetListComponent.propTypes = {
    widgets: PropTypes.array,
    createWidget: PropTypes.func,
    saveWidgets: PropTypes.func,
    togglePreview: PropTypes.func,
    courseId: PropTypes.string,
    moduleId: PropTypes.string,
    lessonId: PropTypes.string,
    topicId: PropTypes.string
}