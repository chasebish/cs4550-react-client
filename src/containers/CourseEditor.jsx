import React from 'react'

import ModuleList from './ModuleList'
import LessonTabs from './LessonTabs'
import TopicPills from './TopicPills'

export default class CourseEditor extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-4">
                    <ModuleList />
                </div>
                <div className="col-4">
                    <LessonTabs />
                    <TopicPills />
                </div>
            </div>
        )
    }
}