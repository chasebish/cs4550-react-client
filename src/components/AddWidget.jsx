import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

let nextWidgetId = 0

const AddWidgetComponent = (props) => {

    let input

    return (
        <div>
            <input className='form-control' ref={node => input = node} />
            <button type="submit" onClick={() => {
                props.dispatch({
                    type: 'ADD_WIDGET',
                    id: nextWidgetId++,
                    text: input.value
                })
            }}>Add Widget
            </button>
        </div>
    )

}

const AddWidget = connect()(AddWidgetComponent)

export default AddWidget

AddWidgetComponent.propTypes = {
    dispatch: PropTypes.func
}