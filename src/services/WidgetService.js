/* global fetch */

let _singleton = Symbol()

const COURSE_MODULE_LESSON_TOPIC_WIDGET_API_URL = 'https://whiteboard-server-chasebish.herokuapp.com/api/course/CID/module/MID/lesson/LID/topic/TID/widget'
const WIDGET_API_URL = 'https://whiteboard-server-chasebish.herokuapp.com/api/widget/WID'
const SAVE_ALL_WIDGETS_API_URL = 'https://whiteboard-server-chasebish.herokuapp.com/api/topic/TID/widget'

export default class WidgetService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!')
    }
    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new WidgetService(_singleton)
        return this[_singleton]
    }

    createWidget(courseId, moduleId, lessonId, topicId, widget) {
        return fetch(COURSE_MODULE_LESSON_TOPIC_WIDGET_API_URL
            .replace('CID', courseId)
            .replace('MID', moduleId)
            .replace('LID', lessonId)
            .replace('TID', topicId), {
            body: JSON.stringify(widget),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then((response) => response.json())
    }

    deleteWidget(widgetId) {
        return fetch(WIDGET_API_URL.replace('WID', widgetId), {
            method: 'DELETE'
        })
    }

    updateWidget(widgetId, widget) {
        return fetch(WIDGET_API_URL.replace('WID', widgetId), {
            method: 'PUT',
            body: JSON.stringify(widget),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
    }

    findWidgetById(widgetId) {
        return fetch(WIDGET_API_URL.replace('WID', widgetId))
            .then(response => response.json())
    }

    findAllWidgetsForTopic(courseId, moduleId, lessonId, topicId) {
        return fetch(COURSE_MODULE_LESSON_TOPIC_WIDGET_API_URL
            .replace('CID', courseId)
            .replace('MID', moduleId)
            .replace('LID', lessonId)
            .replace('TID', topicId)
        ).then((response) => response.json())
    }

    findAllWidgets() {
        return fetch('https://whiteboard-server-chasebish.herokuapp.com/api/widget/')
            .then(response => response.json())
    }

    saveAllWidgets(topicId, widgets) {
        return fetch(SAVE_ALL_WIDGETS_API_URL
            .replace('TID', topicId), {
            method: 'POST',
            body: JSON.stringify(widgets),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
    }

}