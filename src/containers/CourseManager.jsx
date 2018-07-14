import React from 'react'

import CourseCard from '../components/CourseCard'
import CourseEditor from './CourseEditor'

export default class CourseManager extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <h1>Course Manager</h1>

                <CourseEditor />

                <div className="card-deck">
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                </div>
            </div>
        )
    }
}