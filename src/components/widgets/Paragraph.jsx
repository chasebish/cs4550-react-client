import React from 'react'
import PropTypes from 'prop-types'

const Paragraph = ({ widget, updateWidget }) => {

    let text

    return (
        <div>
            <h3>Paragraph - {widget.title}</h3>
            <label htmlFor='paragraph'>List Text</label>
            <textarea
                id='paragraph'
                onChange={() => {
                    widget.text = text.value
                    updateWidget(widget)
                }}
                ref={node => text = node}
                className='form-control'
                value={widget.text}>
            </textarea>
            <h4>Preview</h4>
            <p>{widget.text}</p>
        </div>
    )
}

export default Paragraph

Paragraph.propTypes = {
    widget: PropTypes.object,
    updateWidget: PropTypes.func
}