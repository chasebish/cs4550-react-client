
let initialState = {
    widgets: [
        { title: 'Paragraph 1', id: 1, type: 'PARAGRAPH' },
        { title: 'Link 1', id: 2, type: 'LINK' },
        { title: 'Image 1', id: 3, type: 'IMAGE', src: 'https://i.imgur.com/ThWoXl7.jpg' },
        { title: 'Heading 1', id: 4, type: 'HEADING' },
        { title: 'List 1', id: 5, type: 'LIST', ordered: false, listItems: '' }
    ]
}

const widgetReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'DELETE_WIDGET':
        return {
            widgets: state.widgets.filter(
                widget => widget.id !== action.widgetId
            )
        }
    case 'CREATE_WIDGET':
        return {
            widgets: [
                ...state.widgets,
                action.widget
            ]
        }
    case 'UPDATE_WIDGET':
        return {
            widgets: state.widgets.map(widget => {
                if (widget.id === action.widget.id) {
                    return action.widget
                } else {
                    return widget
                }
            })
        }
    case 'SAVE_WIDGETS':
        console.log('save wudgets')
        return state
    default:
        return state
    }
}

export default widgetReducer