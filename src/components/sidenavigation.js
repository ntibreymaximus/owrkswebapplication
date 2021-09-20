import React from "react";
import { Link } from "react-router-dom";
import "../css/sidenavigation.css";
import { Nav, Container, Sidebar, Sidenav, Header, Content, Button } from "rsuite";
export default class SideNavigation extends React.Component {
	render() {
		return (
			<Container className='container'>
				<div className='navbar'>
					<Sidebar className='sidenavigation'>
						<Sidenav>
							<Sidenav.Header className='sidebarheader'>
								<h3 className='sidebarheaderh3'>Welcome to</h3>
								<h1 className='sidebarheaderh1'>OWRKS</h1>
							</Sidenav.Header>
							<Sidenav.Body className='sidenavigationbody'>
								<Nav>
									<Nav.Item className='navitem'>Dashboard</Nav.Item>
									<Nav.Item className='navitem'>Users</Nav.Item>
									<Nav.Item className='navitem'>Products</Nav.Item>
									<Nav.Item className='navitem'>Suppliers</Nav.Item>
									<Nav.Item className='navitem'>Transactions</Nav.Item>
									<Button className='logoutbutton'>Logout</Button>
								</Nav>
							</Sidenav.Body>
						</Sidenav>
					</Sidebar>
				</div>
				<div className='navcontent'>
					<Container>
						<Header>
							<h2>Page Title</h2>
						</Header>
						<Content>Content</Content>
					</Container>
				</div>
			</Container>
		);
	}
}
