/* global document */

import React from 'react'
import ReactDOM from 'react-dom'

import '../node_modules/bootstrap/dist/css/bootstrap.css'

// import CourseManager from './containers/CourseManager'
import ModuleList from './containers/ModuleList'

ReactDOM.render(
    <ModuleList/>,
    document.getElementById('root')
)
