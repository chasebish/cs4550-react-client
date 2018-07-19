import React from 'react'
import { Nav, Navbar, NavDropdown, NavItem, MenuItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

const ChaseNavbar = () => {

    const userLink = 'https://whiteboard-server-chasebish.herokuapp.com/'

    return (

        <Navbar inverse collapseOnSelect fluid={true} className='chaseNavbar'>
            <Navbar.Header>
                <Link to='/'>
                    <Navbar.Brand>
                        Whiteboard
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <LinkContainer to='/course'>
                        <NavItem>
                            Courses
                        </NavItem>
                    </LinkContainer>
                    <NavDropdown title="User Portal" id="basic-nav-dropdown">
                        <MenuItem href={`${userLink}/jquery/components/register/register.template.client.html`}>Register</MenuItem>
                        <MenuItem href={`${userLink}/jquery/components/login/login.template.client.html`}>Login</MenuItem>
                        <MenuItem href={`${userLink}/jquery/components/profile/profile.template.client.html`}>Profile</MenuItem>
                        <MenuItem href={`${userLink}/jquery/components/admin/user-admin.template.client.html`}>User Admin</MenuItem>
                    </NavDropdown>
                </Nav>
                <Nav pullRight>
                    <NavItem href={userLink}>
                        Assignment 1
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    )
}

export default ChaseNavbar