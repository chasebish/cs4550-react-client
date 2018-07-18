import React from 'react'
import { Route, Switch } from 'react-router-dom'

import CourseEditor from './CourseEditor'
import CourseList from './CourseList'

export default class Whiteboard extends React.Component {

    render() {
        return (
            <div className="container-fluid">
                <h1>Whiteboard</h1>
                <Switch>
                    {/* <Route exact path='/' component={Home} /> */}
                    <Route exact path='/course' component={CourseList} />
                    <Route path="/course/:courseId/edit" component={CourseEditor} />
                    <Route path="/course/:courseId/module/:moduleId" component={CourseEditor} />
                </Switch>
            </div>
        )
    }

}