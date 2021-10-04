import React, { Component } from "react";
import { Container } from "react-bootstrap";
import "../css/dashboard.css";
import "../css/sidenavigation.css";
import SideNavigation from "./sidenavigation";
export default class Dashboard extends Component {
  render() {
    return (
      <Container className="container">
        <SideNavigation />
        <div className="navcontent"></div>
      </Container>
    );
  }
}
