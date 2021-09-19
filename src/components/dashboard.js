import React, { Component } from "react";
import SideNavigation from "./sidenavigation";
export default class Dashboard extends Component {
	render() {
		return (
			<div className='dashboard'>
				<SideNavigation />
			</div>
		);
	}
}
