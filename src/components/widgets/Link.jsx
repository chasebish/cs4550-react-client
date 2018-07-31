import React from 'react'
import PropTypes from 'prop-types'

const Link = ({ widget, updateWidget }) => {

    let text, title

    return (
        <div>
            <h3>Link - {widget.title}</h3>
            <label htmlFor='linkTitle'>Link Title</label>
            <input
                id='linkTitle'
                onChange={() => {
                    widget.title = title.value
                    updateWidget(widget)
                }}
                ref={node => title = node}
                value={widget.title}
                className='form-control'
                placeholder='Heading Text'>
            </input>
            <label htmlFor='link'>Link Text</label>
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
            <h4>Preview</h4><hr/>
            <a href={widget.text}>{widget.text}</a>
        </div>
    )
}

export default Link

Link.propTypes = {
    widget: PropTypes.object,
    updateWidget: PropTypes.func
}