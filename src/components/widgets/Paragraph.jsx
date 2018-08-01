import React from 'react'
import PropTypes from 'prop-types'

const Paragraph = ({ preview, widget, updateWidget }) => {

    let text, name, widgetType

    if (widget.text === undefined || null) {
        widget.text = ''
    }

    return (
        <div>
            <h3>Paragraph - {widget.name}</h3>
            <div>
                <label htmlFor={`changeParagraph${widget.id}`}>Change Widget:</label>
                <select
                    id={`changeParagraph${widget.id}`}
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
            <label htmlFor={`paragraphName${widget.id}`}>Paragraph Name</label>
            <input
                id={`paragraphName${widget.id}`}
                onChange={() => {
                    widget.name = name.value
                    updateWidget(widget)
                }}
                ref={node => name = node}
                value={widget.name}
                className='form-control'
                placeholder='Heading Text'>
            </input>
            <label htmlFor={`paragraph${widget.id}`}>Paragraph Text</label>
            <textarea
                id={`paragraph${widget.id}`}
                onChange={() => {
                    widget.text = text.value
                    updateWidget(widget)
                }}
                ref={node => text = node}
                className='form-control'
                value={widget.text}>
            </textarea>
            {preview &&
            <div>
                <h4>Preview</h4><hr/>
                <p>{widget.text}</p>
            </div>
            }
        </div>
    )
}

export default Paragraph

Paragraph.propTypes = {
    preview: PropTypes.bool,
    widget: PropTypes.object,
    updateWidget: PropTypes.func
}