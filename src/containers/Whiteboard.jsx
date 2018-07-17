import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import CourseEditor from './CourseEditor'
import CourseList from './CourseList'

export default class Whiteboard extends React.Component {

    render() {
        return (
            <Router>
                <div className="container-fluid">
                    <h1>Whiteboard</h1>
                    <div /*className="row"*/>
                        <div /*className="col-8"*/>
                            <Route path="/course" component={CourseList}>
                            </Route>
                        </div>
                        <div /*className="col-4"*/>
                            <Route path="/course/:courseId/edit" component={CourseEditor}>
                            </Route>
                        </div>
                    </div>
                </div>
            </Router >
        )
    }

}