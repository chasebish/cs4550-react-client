import React from 'react'

import CourseList from './CourseList'

export default class Whiteboard extends React.Component {

    render() {
        return (
            <div>
                <h1>Whiteboard</h1>
                <CourseList />
            </div>
        )
    }

}