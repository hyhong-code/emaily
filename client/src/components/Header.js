import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions/index";
import { Link } from "react-router-dom";

class Header extends Component {
  renderContent() {
    const { auth, logoutUser } = this.props;
    return auth === null ? null : !auth ? (
      <li>
        <a href="/auth/google">Login With Google</a>
      </li>
    ) : (
      <li>
        <span
          style={{ marginRight: "1rem", cursor: "pointer" }}
          onClick={logoutUser}
        >
          Logout
        </span>
      </li>
    );
  }

  render() {
    const { auth } = this.props;
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={`${auth ? "/surveys" : "/"}`} className="left brand-logo">
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
