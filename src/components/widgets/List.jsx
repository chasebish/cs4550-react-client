import React from 'react'
import PropTypes from 'prop-types'

const List = ({ preview, widget, updateWidget }) => {

    let text, listType, name, widgetType

    return (
        <div>
            <h3>List - {widget.name}</h3>
            <div>
                <label htmlFor={`changeList${widget.id}`}>Change Widget:</label>
                <select
                    id={`changeList${widget.id}`}
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
            <label htmlFor={`listName${widget.id}`}>List Name</label>
            <input
                id={`listName${widget.id}`}
                onChange={() => {
                    widget.name = name.value
                    updateWidget(widget)
                }}
                ref={node => name = node}
                value={widget.name}
                className='form-control'
                placeholder='Heading Text'>
            </input>
            <label htmlFor={`list${widget.id}`}>List Text</label>
            <textarea
                id={`list${widget.id}`}
                onChange={() => {
                    widget.listItems = text.value
                    updateWidget(widget)
                }}
                ref={node => text = node}
                className='form-control'
                value={widget.listItems}>
            </textarea>
            <label htmlFor={`listType${widget.id}`}>List Type</label>
            <select
                id={`listType${widget.id}`}
                onChange={() => {
                    widget.listType = listType.value
                    updateWidget(widget)
                }}
                value={widget.listType}
                ref={node => listType = node}
                className='form-control'>
                <option value={undefined} disabled>Select your option</option>
                <option value='ORDERED'>Ordered List</option>
                <option value='UNORDERED'>Unordered List</option>
            </select>
            {preview &&
            <div>
                <h4>Preview</h4><hr />
                {widget.listType === 'UNORDERED' &&
                    <ul>
                        {widget.listItems.split('\n').map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                }
                {widget.listType === 'ORDERED' &&
                    <ol>
                        {widget.listItems.split('\n').map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ol>
                }
            </div>
            }
        </div>
    )

}

export default List

List.propTypes = {
    preview: PropTypes.bool,
    widget: PropTypes.object,
    updateWidget: PropTypes.func
}