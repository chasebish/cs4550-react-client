import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import CourseEditor from './CourseEditor'
import CourseList from './CourseList'

export default class Whiteboard extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <h1>Whiteboard</h1>
                    <Route path="/course/:courseId/edit" component={CourseEditor}>
                    </Route>
                    <Route path="/course" component={CourseList}>
                    </Route>
                </div>
            </Router >
        )
    }

}