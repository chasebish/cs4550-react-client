import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'

import { Button, Col, Row } from 'react-bootstrap'

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
        this.setCourseId(newProps.courseId)
        this.setModuleId(newProps.moduleId)
        this.setLessonId(newProps.lessonId)
        this.findAllTopicsForLesson(this.props.courseId, this.props.moduleId, this.props.lessonId)
    }

    setCourseId = courseId => this.setState({ courseId })
    setModuleId = moduleId => this.setState({ moduleId })
    setLessonId = lessonId => this.setState({ lessonId })
    setTopics = topics => this.setState({ topics })

    createTopic = () => {
        const courseObj = {
            modified: new Date()
        }

        const topicObj = {
            title: 'TEST TOPIC'
        }

        this.topicService.createTopic(this.state.courseId, this.state.moduleId, this.state.lessonId, topicObj)
            .then(() => {
                this.setState({ newTopic: '' })
                this.courseService.updateCourse(this.state.courseId, courseObj)
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

    render() {
        const { classes } = this.props
        const { value } = this.state

        return (
            <div>
                <Row>
                    <Col lg={6}>
                        <div className="input-group">
                            <input id="ownerFld" placeholder="Jose Annunziato" value={this.state.newTopic} /*onChange={this.ownerChanged}*/ className="form-control" />
                            <span className='input-group-btn'>
                                <Button
                                    // disabled={this.state.newCourse.title === ''}
                                    onClick={this.createTopic}
                                    bsStyle='primary'>
                                    Add Topic
                                </Button>
                            </span>
                        </div>
                    </Col>
                </Row>
                <h5>Lessons</h5>
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
                    {/* {value === 0 && <TabContainer>Item One</TabContainer>}
                    {value === 1 && <TabContainer>Item Two</TabContainer>}
                    {value === 2 && <TabContainer>Item Three</TabContainer>}
                    {value === 3 && <TabContainer>Item Four</TabContainer>}
                    {value === 4 && <TabContainer>Item Five</TabContainer>}
                    {value === 5 && <TabContainer>Item Six</TabContainer>}
                    {value === 6 && <TabContainer>Item Seven</TabContainer>} */}
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