import React from 'react'
import PropTypes from 'prop-types'

const Heading = ({ widget, updateWidget }) => {

    let text, size, title

    return (
        <div>
            <h3>Heading - {widget.title}</h3>
            <label htmlFor='headingTitle'>Heading Title</label>
            <input
                id='headingTitle'
                onChange={() => {
                    widget.title = title.value
                    updateWidget(widget)
                }}
                ref={node => title = node}
                value={widget.title}
                className='form-control'
                placeholder='Heading Text'>
            </input>
            <label htmlFor='headingText'>Heading Text</label>
            <input
                id='headingText'
                onChange={() => {
                    widget.text = text.value
                    updateWidget(widget)
                }}
                ref={node => text = node}
                className='form-control'
                placeholder='Heading Text'>
            </input>
            <label htmlFor='headingSize'>Heading Size</label>
            <select
                defaultValue=''
                id='headingSize'
                onChange={() => {
                    widget.size = size.value
                    updateWidget(widget)
                }}
                ref={node => size = node}
                className='form-control'>
                <option value="" disabled>Select your option</option>
                <option value='1'>Heading 1</option>
                <option value='2'>Heading 2</option>
                <option value='3'>Heading 3</option>
                <option value='4'>Heading 4</option>
                <option value='5'>Heading 5</option>
                <option value='6'>Heading 6</option>
            </select>
            <h4>Preview</h4><hr/>
            {widget.size === '1' && <h1>{widget.text}</h1>}
            {widget.size === '2' && <h2>{widget.text}</h2>}
            {widget.size === '3' && <h3>{widget.text}</h3>}
            {widget.size === '4' && <h4>{widget.text}</h4>}
            {widget.size === '5' && <h5>{widget.text}</h5>}
            {widget.size === '6' && <h6>{widget.text}</h6>}
        </div>
    )
}

export default Heading

Heading.propTypes = {
    widget: PropTypes.object,
    updateWidget: PropTypes.func
}