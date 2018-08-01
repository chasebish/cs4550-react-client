import React from 'react'
import PropTypes from 'prop-types'

const Image = ({ widget, updateWidget }) => {

    let src, name, widgetType

    return (
        <div>
            <h3>Image - {widget.name}</h3>
            <div>
                <label htmlFor={`changeImage${widget.id}`}>Change Widget:</label>
                <select
                    id={`changeImage${widget.id}`}
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
            <label htmlFor={`imageName${widget.id}`}>Image Name</label>
            <input
                id={`imageName${widget.id}`}
                onChange={() => {
                    widget.name = name.value
                    updateWidget(widget)
                }}
                ref={node => name = node}
                value={widget.name}
                className='form-control'
                placeholder='Heading Text'>
            </input>
            <label htmlFor={`img${widget.id}`}>Image Source</label>
            <input
                id={`img${widget.id}`}
                onChange={() => {
                    widget.src = src.value
                    updateWidget(widget)
                }}
                ref={node => src = node}
                className='form-control'
                placeholder='Image Source'
                value={widget.src}>
            </input>
            <h4>Preview</h4><hr/>
            <img src={widget.src} alt={widget.text} />
        </div>
    )
}

export default Image

Image.propTypes = {
    widget: PropTypes.object,
    updateWidget: PropTypes.func
}