
let initialState = {
    widgets: [
        { title: 'Paragraph 1', id: 1, type: 'PARAGRAPH', order: 1 }
        // { title: 'Link 1', id: 2, type: 'LINK', order: 2 },
        // { title: 'Image 1', id: 3, type: 'IMAGE', src: 'https://i.imgur.com/ThWoXl7.jpg', order: 3 },
        // { title: 'Heading 1', id: 4, type: 'HEADING', order: 4 },
        // { title: 'List 1', id: 5, type: 'LIST', ordered: false, listItems: '', order: 5 }
    ]
}

const widgetReducer = (state = initialState, action) => {
    console.log(state)
    switch (action.type) {
    case 'DELETE_WIDGET':
        return {
            widgets: state.widgets.filter(
                widget => widget.id !== action.widgetId
            ).map((widget, index) => {
                return {
                    ...widget,
                    order: index + 1
                }
            })
        }
    case 'CREATE_WIDGET':
        action.widget.order = state.widgets[state.widgets.length - 1].order + 1
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
    case 'MOVE_UP':
        console.log(action.widgetId, 'move_up')
        return state
    case 'MOVE_DOWN':
        console.log(action.widgetId, 'move_down')
        return state
    case 'SAVE_WIDGETS':
        console.log('save wudgets')
        return state
    default:
        return state
    }
}

export default widgetReducer