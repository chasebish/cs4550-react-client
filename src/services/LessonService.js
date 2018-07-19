/* global fetch */

let _singleton = Symbol()

const COURSE_MODULE_LESSON_API_URL = 'https://whiteboard-server-chasebish.herokuapp.com/api/course/CID/module/MID/lesson'
const LESSON_API_URL = 'https://whiteboard-server-chasebish.herokuapp.com/api/lesson/LID'
// const COURSE_API_URL = 'https://whiteboard-server-chasebish.herokuapp.com/api/course/CID/module'

export default class ModuleService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!')
    }
    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ModuleService(_singleton)
        return this[_singleton]
    }

    createLesson(courseId, moduleId, lesson) {
        return fetch(COURSE_MODULE_LESSON_API_URL.replace('CID', courseId).replace('MID', moduleId), {
            body: JSON.stringify(lesson),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then((response) => response.json())
    }

    deleteLesson(lessonId) {
        return fetch(LESSON_API_URL.replace('LID', lessonId), {
            method: 'DELETE'
        })
    }

    findLessonById(lessonId) {
        return fetch(LESSON_API_URL.replace('LID', lessonId))
            .then(response => response.json())
    }

    findAllLessonsForModule(courseId, moduleId) {
        return fetch(COURSE_MODULE_LESSON_API_URL.replace('CID', courseId).replace('MID', moduleId)).then((response) => response.json())
    }
}