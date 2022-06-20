import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Nav, Navbar } from 'rsuite';
interface Props {
  onLogout: () => void,
  isAdmin?: boolean
}
export default function AppNavbar(props: Props) {
  return (
    <Navbar>
      <Navbar.Brand  >
        Aplikacija za online ucenje
      </Navbar.Brand>
      <Nav>
        <Nav.Item>
          <NavLink to='/kursevi'>
            Kursevi
          </NavLink>
        </Nav.Item>
      </Nav>
      {
        props.isAdmin && (
          <>
            <Nav.Item>
              <NavLink to='/kvizovi'>
                Kvizovi
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to='/pitanja'>
                Pitanja
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to='/statistika'>
                Statistika
              </NavLink>
            </Nav.Item>
          </>
        )
      }
      <Nav pullRight>
        <Nav.Item>
          <Button appearance='primary' onClick={props.onLogout}>Logout</Button>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}
