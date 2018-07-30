import React from 'react'
import PropTypes from 'prop-types'

const Link = ({ widget, updateWidget }) => {

    let text

    return (
        <div>
            <h3>Link</h3>
            <label htmlFor='link'>List Text</label>
            <input
                id='link'
                onChange={() => {
                    widget.text = text.value
                    updateWidget(widget)
                }}
                ref={node => text = node}
                className='form-control'
                placeholder='Link Text'>
            </input>
            <h4>Preview</h4>
            <a href={widget.text}>{widget.text}</a>
        </div>
    )
}

export default Link

Link.propTypes = {
    widget: PropTypes.object,
    updateWidget: PropTypes.func
}