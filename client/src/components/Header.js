import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions/index";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
  renderContent() {
    const { auth, logoutUser } = this.props;
    return auth === null ? null : !auth ? (
      <li>
        <a href="/auth/google">Login With Google</a>
      </li>
    ) : (
      [
        <li key="1">
          <Payments />
        </li>,
        <li key="2" style={{ margin: "0 10px" }}>
          Credits: {auth.credits}
        </li>,
        <li key="3">
          <a onClick={logoutUser}>Logout</a>
        </li>,
      ]
    );
  }

  render() {
    const { auth } = this.props;
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={`${auth ? "/surveys" : "/"}`}
            className="left brand-logo"
            style={{ display: "block", marginLeft: "1rem" }}
          >
            Emaily
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { logoutUser })(Header);
