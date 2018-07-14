import React from 'react'

import ModuleListItem from '../components/ModuleListItem'
export default class ModuleList
    extends React.Component {
    render() {
        return (
            <div>
                <h3>Module List</h3>
                <ul className="list-group">
                    <ModuleListItem title="Module 1"/>
                    <ModuleListItem title="Module 2"/>
                    <ModuleListItem title="Module 3"/>
                    <ModuleListItem title="Module 4"/>
                </ul>
            </div>
        )
    }
}
