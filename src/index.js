/* global document */

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import widgetReducer from './reducers/widgetReducer'

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'

import Whiteboard from './containers/Whiteboard'

const store = createStore(widgetReducer)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Whiteboard />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
