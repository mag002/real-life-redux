import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { NavLink } from 'react-router-dom';

class NavigationItemComponent extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    mini: PropTypes.string,
    icon: PropTypes.string,
    ext_id: PropTypes.string,
    ext_value: PropTypes.string,
    location: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    const initState = { visible: true };
    // if (isLoggedIn()) {
    //   const userRoles = getRolesFromToken();
    //   if (userRoles && this.props.roles) {
    //     const roleIndex = this.props.roles.findIndex((x) => userRoles.findIndex((r) => r.toLowerCase() === x.toLowerCase()) >= 0);
    //     initState.visible = roleIndex >= 0;
    //   }
    // }

    this.state = initState;
  }

  activeRoute(routeName) {
    return this.props.location.pathname === routeName ? 'active' : '';
  }

  render() {
    if (!this.state.visible) {
      return null;
    }

    //   // Root navigation
    // if (this.props.icon) {
    //   return (
    //     <li className={this.activeRoute(this.props.path)}>
    //       <NavLink to={this.props.path} className="nav-link" activeClassName="active" onClick={this.props.showModalConfirm}>
    //         <i className={this.props.icon} />
    //         <p>{this.props.name}</p>
    //       </NavLink>
    //     </li>
    //   );
    // }

      // Sub navigation
    return (
      <li className={this.activeRoute(this.props.path)} id={this.props.mini}>
        <NavLink to={this.props.path} className="nav-link" activeClassName="active" onClick={this.props.showModalConfirm}>
          {/* <span className="sidebar-mini">{this.props.mini}</span>*/}
          <img src={this.props.icon} alt={this.props.name} className={'icon'} />

          <span className="sidebar-normal">{this.props.name}
            { this.props.ext_id && (<span id={this.props.ext_id}> {this.props.ext_value} </span>)}
          </span>
        </NavLink>
      </li>
    );
  }
}

export default NavigationItemComponent;
