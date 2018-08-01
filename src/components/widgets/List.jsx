import React from 'react'
import PropTypes from 'prop-types'

const List = ({ widget, updateWidget }) => {

    let text, listType, name

    return (
        <div>
            <h3>List - {widget.name}</h3>
            <label htmlFor='listName'>List Name</label>
            <input
                id='listName'
                onChange={() => {
                    widget.name = name.value
                    updateWidget(widget)
                }}
                ref={node => name = node}
                value={widget.name}
                className='form-control'
                placeholder='Heading Text'>
            </input>
            <label htmlFor='list'>List Text</label>
            <textarea
                id='list'
                onChange={() => {
                    widget.listItems = text.value
                    updateWidget(widget)
                }}
                ref={node => text = node}
                className='form-control'
                value={widget.listItems}>
            </textarea>
            <label htmlFor='listType'>List Type</label>
            <select
                id='listType'
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
    )

}

export default List

List.propTypes = {
    widget: PropTypes.object,
    updateWidget: PropTypes.func
}