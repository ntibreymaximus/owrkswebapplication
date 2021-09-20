import React, { Component } from "react";
import SideNavigation from "./sidenavigation";
import "../css/dashboard.css";
export default class Dashboard extends Component {
	render() {
		return (
			<div className='dashboard'>
				<SideNavigation />
			</div>
		);
	}
}
