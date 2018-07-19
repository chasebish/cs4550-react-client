import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid } from 'react-bootstrap'

import './containers.css'

export default class Home extends React.Component {

    render() {
        return (
            <Grid>
                <div className='text-center'>
                    <Button
                        href='https://whiteboard-server-chasebish.herokuapp.com/index.html'
                        className='homeButton'
                        bsStyle='info'
                        bsSize='large'>
                        User
                    </Button>
                    <Link to='/course'>
                        <Button
                            className='homeButton'
                            bsStyle='info'
                            bsSize='large'>
                            Courses
                        </Button>
                    </Link>
                </div>

            </Grid>
        )
    }

}