import React from 'react'
import PropTypes from 'prop-types'

const Link = ({ widget, updateWidget }) => {

    let text, name

    return (
        <div>
            <h3>Link - {widget.name}</h3>
            <label htmlFor='linkName'>Link Name</label>
            <input
                id='linkName'
                onChange={() => {
                    widget.name = name.value
                    updateWidget(widget)
                }}
                ref={node => name = node}
                value={widget.name}
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
                value={widget.text}
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