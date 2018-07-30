
let initialState = {
    widgets: [
        {title: 'Widget 1', id: 1, type: 'WT1'},
        {title: 'Widget 2', id: 2, type: 'WT2'},
        {title: 'Widget 3', id: 3, type: 'WT3'}]
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
    default:
        return state
    }
}

export default widgetReducer