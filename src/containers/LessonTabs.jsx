import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'

export default class LessonTabs extends React.Component {
    render() {
        return (
            <div>
                <h3>Lesson Tabs</h3>

                <ul className="nav nav-tabs">
                    <li className="nav-item"><a className="nav-link active"
                        href="#">Active Tab</a></li>
                    <li className="nav-item"><a className="nav-link"
                        href="#">Another Tab</a></li>
                </ul>
            </div>
        )
    }
}