import WidgetService from '../services/WidgetService'

let initialState = {
    widgets: [
        { name: 'Paragraph 1', id: 1, className: 'PARAGRAPH', editorOpen: true, widgetOrder: 1 },
        { name: 'Link 1', id: 2, className: 'LINK', editorOpen: true, widgetOrder: 2 },
        { name: 'Image 1', id: 3, className: 'IMAGE', src: 'https://i.imgur.com/ThWoXl7.jpg', editorOpen: true, widgetOrder: 3 },
        { name: 'Heading 1', id: 4, className: 'HEADING', editorOpen: true, widgetOrder: 4 },
        { name: 'List 1', id: 5, className: 'LIST', ordered: false, listItems: '', editorOpen: true, widgetOrder: 5 }
    ]
}

const widgetService = WidgetService.instance

const widgetReducer = (state = initialState, action) => {

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
        return {
            widgets: state.widgets.map((widget) => {
                let currentOrder = widget.order
                if (currentOrder === action.order) {
                    return {
                        ...widget,
                        order: action.order - 1
                    }
                } else if (currentOrder === action.order - 1) {
                    return {
                        ...widget,
                        order: action.order
                    }
                } else {
                    return widget
                }
            })
        }
    case 'MOVE_DOWN':
        return {
            widgets: state.widgets.map((widget) => {
                let currentOrder = widget.order
                if (currentOrder === action.order) {
                    return {
                        ...widget,
                        order: action.order + 1
                    }
                } else if (currentOrder === action.order + 1) {
                    return {
                        ...widget,
                        order: action.order
                    }
                } else {
                    return widget
                }
            })
        }
    case 'SAVE_WIDGETS':
        console.log('save wudgets')
        console.log(action.topicId)
        widgetService.saveAllWidgets(action.topicId, state.widgets)
        return state
    default:
        return state
    }
}

export default widgetReducer