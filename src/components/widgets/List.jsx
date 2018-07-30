import React from 'react'
import PropTypes from 'prop-types'

const List = ({ widget, updateWidget }) => {

    let text
    let order

    return (
        <div>
            <h3>List Widget - {widget.title}</h3>
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
            <h4>Preview</h4>
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