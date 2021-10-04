import React, { Component } from "react";
import { Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/dashboard.css";
import "../css/sidenavigation.css";
import SideNavigation from "./sidenavigation";
export default class Dashboard extends Component {
  render() {
    return (
      <Container className="container">
        <Col md={3}>
          <SideNavigation />
        </Col>
        <Col>
          <div className="navcontent"></div>
        </Col>
      </Container>
    );
  }
}
