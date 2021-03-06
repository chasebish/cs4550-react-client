import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Grid } from 'react-bootstrap'

import ChaseNavbar from '../components/ChaseNavbar'
import Home from './Home'
import ModuleEditor from './ModuleEditor'
import CourseEditor from './CourseEditor'
import CourseList from './CourseList'

import './containers.css'

export default class Whiteboard extends React.Component {

    render() {
        return (
            <Grid fluid={true}>
                <ChaseNavbar />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/course' component={CourseList} />
                    <Route path="/course/:courseId/" component={CourseEditor} />
                    <Route path="/course/:courseId/module/:moduleId" component={ModuleEditor} />
                </Switch>
            </Grid>
        )
    }

}