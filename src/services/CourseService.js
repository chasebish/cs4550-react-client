/* global fetch */

let _singleton = Symbol()

const COURSE_API_URL = 'http://localhost:8080/api/course'
// const COURSE_API_URL = 'https://whiteboard-server-chasebish.herokuapp.com/api/course'
export default class CourseService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.')
    }
    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new CourseService(_singleton)
        return this[_singleton]
    }

    findAllCourses() {
        return fetch(COURSE_API_URL)
            .then(function(response){
                return response.json()
            })
    }

}