/* global document */

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'

import WidgetReducer from './reducers/widgetReducer'

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'

import Whiteboard from './containers/Whiteboard'

const rootReducer = combineReducers({ WidgetReducer })
const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Whiteboard />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
