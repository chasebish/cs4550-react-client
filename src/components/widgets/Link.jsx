import React from 'react'
import PropTypes from 'prop-types'

const Link = ({ widget, updateWidget }) => {

    let text, name, widgetType

    return (
        <div>
            <h3>Link - {widget.name}</h3>
            <div>
                <label htmlFor={`changeLink${widget.id}`}>Change Widget:</label>
                <select
                    id={`changeLink${widget.id}`}
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
            <label htmlFor={`linkName${widget.id}`}>Link Name</label>
            <input
                id={`linkName${widget.id}`}
                onChange={() => {
                    widget.name = name.value
                    updateWidget(widget)
                }}
                ref={node => name = node}
                value={widget.name}
                className='form-control'
                placeholder='Heading Text'>
            </input>
            <label htmlFor={`link${widget.id}`}>Link Text</label>
            <input
                id={`link${widget.id}`}
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