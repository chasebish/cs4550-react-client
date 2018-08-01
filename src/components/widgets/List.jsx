import React from 'react'
import PropTypes from 'prop-types'

const List = ({ widget, updateWidget }) => {

    let text, order, name

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
            <label>
                <input
                    onClick={() => {
                        widget.ordered = order.checked
                        updateWidget(widget)
                    }}
                    ref={node => order = node}
                    checked={widget.ordered}
                    type='checkbox'/> Ordered
            </label>
            <h4>Preview</h4><hr/>
            {!widget.ordered &&
                <ul>
                    {widget.listItems.split('\n').map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            }
            {widget.ordered &&
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