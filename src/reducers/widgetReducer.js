
const widgetReducer = (state = [], action) => {
    switch (action.type) {
    case 'ADD_WIDGET':
        return [...state,
            {
                id: state.widgets.length + 1,
                text: action.text
            }]
    default: return state
    }
}

export default widgetReducer