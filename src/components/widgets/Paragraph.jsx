import React from 'react'
import PropTypes from 'prop-types'

const Paragraph = ({ widget, updateWidget }) => {

    let text, title

    return (
        <div>
            <h3>Paragraph - {widget.title}</h3>
            <label htmlFor='paragraphTitle'>Paragraph Title</label>
            <input
                id='paragraphTitle'
                onChange={() => {
                    widget.title = title.value
                    updateWidget(widget)
                }}
                ref={node => title = node}
                value={widget.title}
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