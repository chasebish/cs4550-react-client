import React from 'react'

import ModuleListItem from '../components/ModuleListItem'
export default class ModuleList extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        newModule: {
            title: ''
        },
        modules: [
            { title: 'Module 1 - jQuery', id: 123 },
            { title: 'Module 2 - React', id: 234 },
            { title: 'Module 3 - Redux', id: 345 },
            { title: 'Module 4 - Angular', id: 456 },
            { title: 'Module 5 - Node.js', id: 567 },
            { title: 'Module 6 - MongoDB', id: 678 }
        ]
    }

    titleChanged = (event) => {
        this.setState({
            newModule: {
                title: event.target.value
            }
        })
    }

    createModule = () => {
        console.log(this.state.newModule.title)
    }


    renderModuleList() {
        let modules = this.state.modules
            .map(function (module) {
                return <ModuleListItem title={module.title} key={module.id} />
            })
        return modules
    }

    render() {
        return (
            <div>
                <h3>Module List</h3>
                <input className="form-control" placeholder="Module Name" onChange={this.titleChanged} />
                <button className="btn btn-primary btn-block" onClick={this.createModule}>
                    <i className="fa fa-plus"></i>
                </button>
                <ul className="list-group">
                    {this.renderModuleList()}
                </ul>
            </div >
        )
    }

}