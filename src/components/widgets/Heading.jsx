import React from 'react'
import PropTypes from 'prop-types'

const Heading = ({ widget, updateWidget }) => {

    let text, size, name, widgetType

    return (
        <div>
            <h3>Heading - {widget.name}</h3>
            <div>
                <label htmlFor={`changeHeading${widget.id}`}>Change Widget:</label>
                <select
                    id={`changeHeading${widget.id}`}
                    onChange={() => {
                        widget.className = widgetType.value
                        updateWidget(widget)
                    }}
                    value={widget.className}
                    ref={node => widgetType = node}
                    className='form-control-static changeWidget'>
                    <option value='HEADING'>Heading Widget</option>
                    <option value='IMAGE'>Image Widget</option>
                    <option value='LINK'>Link Widget</option>
                    <option value='LIST'>List Widget</option>
                    <option value='PARAGRAPH'>Paragraph Widget</option>
                </select>
            </div>
            <label htmlFor={`headingName${widget.id}`}>Heading Name</label>
            <input
                id={`headingName${widget.id}`}
                onChange={() => {
                    widget.name = name.value
                    updateWidget(widget)
                }}
                ref={node => name = node}
                value={widget.name}
                className='form-control'
                placeholder='Heading Text'>
            </input>
            <label htmlFor={`headingText${widget.id}`}>Heading Text</label>
            <input
                id={`headingText${widget.id}`}
                onChange={() => {
                    widget.text = text.value
                    updateWidget(widget)
                }}
                value={widget.text}
                ref={node => text = node}
                className='form-control'
                placeholder='Heading Text'>
            </input>
            <label htmlFor={`headingSize${widget.id}`}>Heading Size</label>
            <select
                id={`changeHeading${widget.id}`}
                value={widget.size}
                onChange={() => {
                    widget.size = parseInt(size.value, 8)
                    updateWidget(widget)
                }}
                ref={node => size = node}
                className='form-control'>
                <option value={undefined} disabled>Select your option</option>
                <option value='1'>Heading 1</option>
                <option value='2'>Heading 2</option>
                <option value='3'>Heading 3</option>
                <option value='4'>Heading 4</option>
                <option value='5'>Heading 5</option>
                <option value='6'>Heading 6</option>
            </select>
            <h4>Preview</h4><hr />
            {widget.size === 1 && <h1>{widget.text}</h1>}
            {widget.size === 2 && <h2>{widget.text}</h2>}
            {widget.size === 3 && <h3>{widget.text}</h3>}
            {widget.size === 4 && <h4>{widget.text}</h4>}
            {widget.size === 5 && <h5>{widget.text}</h5>}
            {widget.size === 6 && <h6>{widget.text}</h6>}
        </div>
    )
}

export default Heading

Heading.propTypes = {
    widget: PropTypes.object,
    updateWidget: PropTypes.func
}