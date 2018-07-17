import React from 'react'

export default class CourseEditor extends React.Component {

    constructor(props) {
        super(props)
        this.selectCourse
    }

    state = {
        courseId: ''
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId)
    }

    componentWillReceiveProps(newProps) {
        this.selectCourse(newProps.match.params.courseId)
    }


    selectCourse = (courseId) => {
        this.setState({ courseId: courseId })
    }

    // render() {
    //     return (
    //         <div className="row">
    //             <div className="col-4">
    //                 <ModuleList />
    //             </div>
    //             <div className="col-4">
    //                 <LessonTabs />
    //                 <TopicPills />
    //             </div>
    //         </div>
    //     )
    // }

    render() {
        return (
            <h3>Course {this.state.courseId} REEE</h3>
        )
    }

}