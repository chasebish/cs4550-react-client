import React from 'react'

import CourseCard from '../components/CourseCard'

export default class CourseManager extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <h1>Course Manager</h1>
                <div className="card-deck">
                    <CourseCard />
                    <CourseCard />
                </div>
            </div>
        )

    }
}