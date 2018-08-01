import React from 'react'
import PropTypes from 'prop-types'

const Paragraph = ({ widget, updateWidget }) => {

    let text, name

    return (
        <div>
            <h3>Paragraph - {widget.name}</h3>
            <label htmlFor='paragraphName'>Paragraph Name</label>
            <input
                id='paragraphName'
                onChange={() => {
                    widget.name = name.value
                    updateWidget(widget)
                }}
                ref={node => name = node}
                value={widget.name}
                className='form-control'
                placeholder='Heading Text'>
            </input>
            <label htmlFor='paragraph'>Paragraph Text</label>
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
            <h4>Preview</h4><hr/>
            <p>{widget.text}</p>
        </div>
    )
}

export default Paragraph

Paragraph.propTypes = {
    widget: PropTypes.object,
    updateWidget: PropTypes.func
}