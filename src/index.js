/* global document */

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'

import Whiteboard from './containers/Whiteboard'

ReactDOM.render(
    <BrowserRouter>
        <Whiteboard />
    </BrowserRouter>,
    document.getElementById('root')
)
