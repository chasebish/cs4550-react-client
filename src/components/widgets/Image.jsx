import React from 'react'
import PropTypes from 'prop-types'

const Image = ({ widget, updateWidget }) => {

    let src, title

    return (
        <div>
            <h3>Image - {widget.title}</h3>
            <label htmlFor='imageTitle'>Image Title</label>
            <input
                id='imageTitle'
                onChange={() => {
                    widget.title = title.value
                    updateWidget(widget)
                }}
                ref={node => title = node}
                value={widget.title}
                className='form-control'
                placeholder='Heading Text'>
            </input>
            <label htmlFor='img'>Image Source</label>
            <input
                id='img'
                onChange={() => {
                    widget.src = src.value
                    updateWidget(widget)
                }}
                ref={node => src = node}
                className='form-control'
                placeholder='Image Source'
                value={widget.src}>
            </input>
            <h4>Preview</h4>
            <img src={widget.src} alt={widget.text} />
        </div>
    )
}

export default Image

Image.propTypes = {
    widget: PropTypes.object,
    updateWidget: PropTypes.func
}