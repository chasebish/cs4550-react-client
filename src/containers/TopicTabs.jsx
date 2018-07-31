import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'

import { Button, Col, Row } from 'react-bootstrap'

import TopicContent from '../components/TopicContent'

import TopicService from '../services/TopicService'
import CourseService from '../services/CourseService'

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
})

class ScrollableTabsButtonAuto extends React.Component {

    constructor(props) {
        super(props)
        this.topicService = TopicService.instance
        this.courseService = CourseService.instance
    }

    state = {
        value: 0,
        courseId: '',
        moduleId: '',
        lessonId: '',
        topics: [],
        newTopicTitle: ''
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId)
        this.setModuleId(this.props.moduleId)
        this.setLessonId(this.props.lessonId)
    }

    componentWillReceiveProps(newProps) {
        if (newProps.courseId !== this.state.courseId && newProps.moduleId !== this.state.moduleId && newProps.lessonId !== this.state.lessonId) {
            this.findAllTopicsForLesson(newProps.courseId, newProps.moduleId, newProps.lessonId)
        }
        this.setCourseId(newProps.courseId)
        this.setModuleId(newProps.moduleId)
        this.setLessonId(newProps.lessonId)
    }

    setCourseId = courseId => this.setState({ courseId })
    setModuleId = moduleId => this.setState({ moduleId })
    setLessonId = lessonId => this.setState({ lessonId })
    setTopics = topics => this.setState({ topics })

    topicTitleChanged = (event) => {
        this.setState({ newTopicTitle: event.target.value })
    }

    createTopic = () => {
        const courseObj = {
            modified: new Date()
        }

        const topicObj = {
            title: this.state.newTopicTitle
        }

        this.topicService.createTopic(this.state.courseId, this.state.moduleId, this.state.lessonId, topicObj)
            .then(() => {
                this.setState({ newTopicTitle: '' })
                this.courseService.updateCourse(this.state.courseId, courseObj)
                this.findAllTopicsForLesson(this.state.courseId, this.state.moduleId, this.state.lessonId)
            })
    }

    findAllTopicsForLesson = (courseId, moduleId, lessonId) => {
        this.topicService.findAllTopicsForLesson(courseId, moduleId, lessonId)
            .then(topics => this.setTopics(topics))
    }


    handleChange = (event, value) => {
        this.setState({ value })
    }

    renderTopics() {

        if (this.state.topics.length === 0) {
            return
        }

        let topics = this.state.topics.map((topic) => {
            return (
                <Tab key={topic.id} label={topic.title} />
            )
        })
        return topics
    }

    renderTopicContent() {

        const { value } = this.state

        if (this.state.topics.length === 0) {
            return
        }

        let counter = -1

        let topicContent = this.state.topics.map((topic) => {
            counter++
            return (
                <div key={topic.id}>
                    {value === counter &&
                        <TopicContent
                            courseId={this.state.courseId}
                            moduleId={this.state.moduleId}
                            lessonId={this.state.lessonId}
                            topicId={topic.id.toString()}
                            topicTitle={topic.title}
                            findAllTopics={this.findAllTopicsForLesson}
                        />
                    }
                </div>
            )
        })
        return topicContent

    }

    render() {
        const { classes } = this.props
        const { value } = this.state

        return (
            <div>
                <Row>
                    <Col lg={6}>
                        <div className="input-group">
                            <input placeholder="New Topic" value={this.state.newTopicTitle} onChange={this.topicTitleChanged} className="form-control" />
                            <span className='input-group-btn'>
                                <Button
                                    disabled={this.state.newTopicTitle === ''}
                                    onClick={this.createTopic}
                                    bsStyle='primary'>
                                    Add Topic
                                </Button>
                            </span>
                        </div>
                    </Col>
                </Row>
                <h5>Topics</h5>
                <div className={classes.root}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            scrollable
                            scrollButtons="auto"
                        >
                            {this.renderTopics()}
                        </Tabs>
                    </AppBar>
                    {this.renderTopicContent()}
                </div>
            </div>
        )
    }
}

ScrollableTabsButtonAuto.propTypes = {
    classes: PropTypes.object.isRequired,
    courseId: PropTypes.string,
    moduleId: PropTypes.string,
    lessonId: PropTypes.string
}

export default withStyles(styles)(ScrollableTabsButtonAuto)