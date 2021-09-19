import React from "react";
import { Link } from "react-router-dom";
import "../css/sidenavigation.css";
import { Nav, NavToggle, Icon, Container, Sidebar, Sidenav, Header, Content } from "rsuite";

export default class SideNavigation extends React.Component {
	render() {
		return (
			<div>
				<Container className>
					<Sidebar className='sidenavigation'>
						<Sidenav>
							<Sidenav.Header>
								<div>
									<h1>OWRKS</h1>
								</div>
							</Sidenav.Header>
							<Sidenav.Body className='sidenavigation'>
								<Nav>
									<Nav.Item eventKey='1' active icon={<Icon icon='dashboard' />}>
										Dashboard
									</Nav.Item>
									<Nav.Item eventKey='2' icon={<Icon icon='group' />}>
										User Group
									</Nav.Item>
								</Nav>
							</Sidenav.Body>
						</Sidenav>
					</Sidebar>
					<Container>
						<Header>
							<h2>Page Title</h2>
						</Header>
						<Content>Content</Content>
					</Container>
				</Container>
			</div>
		);
	}
}
