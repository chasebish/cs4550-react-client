import WidgetService from '../services/WidgetService'

let initialState = {
    widgets: []
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
                    widgetOrder: index + 1
                }
            })
        }
    case 'CREATE_WIDGET':
        action.widget.widgetOrder = state.widgets[state.widgets.length - 1].widgetOrder + 1
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
            widgets: action.widgets
        }
    default:
        return state
    }
}

export default widgetReducer