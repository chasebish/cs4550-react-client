import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Grid, PageHeader } from 'react-bootstrap'

import Home from './Home'
import ModuleEditor from './ModuleEditor'
import CourseEditor from './CourseEditor'
import CourseList from './CourseList'

import './containers.css'

export default class Whiteboard extends React.Component {

    render() {
        return (
            <Grid fluid={true}>
                <header className='whiteboard'>
                    <PageHeader>
                        Whiteboard
                    </PageHeader>
                </header>
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