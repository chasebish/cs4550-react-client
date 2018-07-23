/* global fetch */

let _singleton = Symbol()

const COURSE_MODULE_LESSON_TOPIC_API_URL = 'https://whiteboard-server-chasebish.herokuapp.com/api/course/CID/module/MID/lesson/LID/topic'
const TOPIC_API_URL = 'https://whiteboard-server-chasebish.herokuapp.com/api/topic/TID'

export default class TopicService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!')
    }
    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new TopicService(_singleton)
        return this[_singleton]
    }

    createTopic(courseId, moduleId, lessonId, topic) {
        return fetch(COURSE_MODULE_LESSON_TOPIC_API_URL.replace('CID', courseId).replace('MID', moduleId).replace('LID', lessonId), {
            body: JSON.stringify(topic),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then((response) => response.json())
    }

    deleteTopic(topicId) {
        return fetch(TOPIC_API_URL.replace('TID', topicId), {
            method: 'DELETE'
        })
    }

    updateTopic(topicId, topic) {
        return fetch(TOPIC_API_URL.replace('TID', topicId), {
            method: 'PUT',
            body: JSON.stringify(topic),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
    }

    findTopicById(topicId) {
        return fetch(TOPIC_API_URL.replace('TID', topicId))
            .then(response => response.json())
    }

    findAllTopicsForLesson(courseId, moduleId, lessonId) {
        return fetch(COURSE_MODULE_LESSON_TOPIC_API_URL
            .replace('CID', courseId)
            .replace('MID', moduleId)
            .replace('LID', lessonId)
        ).then((response) => response.json())
    }

    findAllTopics() {
        return fetch('https://whiteboard-server-chasebish.herokuapp.com/api/topic/')
            .then(response => response.json())
    }

}