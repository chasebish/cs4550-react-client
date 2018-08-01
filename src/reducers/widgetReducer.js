import WidgetService from '../services/WidgetService'

let initialState = {
    preview: true,
    widgets: []
}

const widgetService = WidgetService.instance

const widgetReducer = (state = initialState, action) => {

    switch (action.type) {
    case 'DELETE_WIDGET':
        return {
            ...state,
            widgets: state.widgets.filter(
                widget => widget.id !== action.widgetId
            ).map((widget, index) => {
                return {
                    ...widget,
                    widgetOrder: index + 1
                }
            })
        }
    case 'CREATE_WIDGET':
        return {
            ...state,
            widgets: [
                ...state.widgets,
                action.widget
            ]
        }
    case 'UPDATE_WIDGET':
        return {
            ...state,
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
            ...state,
            widgets: state.widgets.map((widget) => {
                let currentOrder = widget.widgetOrder
                if (currentOrder === action.widgetOrder) {
                    return {
                        ...widget,
                        widgetOrder: action.widgetOrder - 1
                    }
                } else if (currentOrder === action.widgetOrder - 1) {
                    return {
                        ...widget,
                        widgetOrder: action.widgetOrder
                    }
                } else {
                    return widget
                }
            })
        }
    case 'MOVE_DOWN':
        return {
            ...state,
            widgets: state.widgets.map((widget) => {
                let currentOrder = widget.widgetOrder
                if (currentOrder === action.widgetOrder) {
                    return {
                        ...widget,
                        widgetOrder: action.widgetOrder + 1
                    }
                } else if (currentOrder === action.widgetOrder + 1) {
                    return {
                        ...widget,
                        widgetOrder: action.widgetOrder
                    }
                } else {
                    return widget
                }
            })
        }
    case 'SAVE_WIDGETS':
        widgetService.saveAllWidgets(action.topicId, state.widgets)
        return state
    case 'GET_WIDGETS':
        return {
            ...state,
            widgets: action.widgets
        }
    case 'TOGGLE_PREVIEW':
        return {
            ...state,
            preview: !state.preview
        }
    default:
        return state
    }
}

export default widgetReducer