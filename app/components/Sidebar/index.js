import React, { Component } from 'react';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import auth from 'utils/auth';
import NavigationItem from './navigationItem';
import PropTypes from 'prop-types';
import isNull from 'lodash/isNull';
import isObject from 'lodash/isObject';
import noAvatar from 'images/no-avatar.png';
import { eUserType } from 'enums/EUserType';
import UploadAvatar from 'components/UploadAvatar';
import history from '../../utils/history';
import icoLogout from 'images/icons/mbri-logout.svg';
import { StyledComponent } from './styled/StyledComponent';


export default class Sidebar extends Component {
  constructor(props, context) {
    super();
    this.state = {
      avatar: noAvatar,
      userType: eUserType.BUYER,
      userName: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!isNull(nextProps.userInfo) && isObject(nextProps.userInfo)) {
      this.setState({
        avatar: nextProps.userInfo.avatar,
        userType: nextProps.userInfo.type,
        userName: nextProps.userInfo.type === eUserType.BUYER ? nextProps.userInfo.name : nextProps.userInfo.store_name,
      });
    }
  }

  render() {
    return (
      <StyledComponent>
        <div className="logo">
          <UploadAvatar
            onDrop={(data) => {
              console.log('Avatar onDrop', data);
              this.props.onUploadAvatar(data);
            }}
            size={'100px'}
            image={this.state.avatar ? { id: 1, url: this.state.avatar } : null}
          />

          <div className="user-name">
            <span>{this.state.userName}</span>
          </div>
          <div className="role">
            <span>{this.state.userType}</span>
          </div>
        </div>

        <div className="sidebar-wrapper d-none d-md-block" ref="sidebarWrapper">
          <ul className="nav d-flex flex-column justify-content-between">
            {
              this.props.routes.map((prop, key) => (
                <NavigationItem
                  path={prop.path}
                  icon={prop.icon}
                  name={prop.name}
                  key={key}
                  location={this.props.location}
                  roles={prop.roles}
                />
              ))
            }

            <li>
              <button
                className={'btn-logout nav-link'}
                onClick={() => {
                  auth.clearToken();
                  auth.clearUserInfo();
                  if (history.location.pathname.includes('user')) {
                    history.replace('/');
                  }
                }}
              ><img src={icoLogout} alt={'logout'} /> Logout</button>
            </li>
          </ul>
        </div>
      </StyledComponent>
    );
  }
}

Sidebar.propTypes = {
  routes: PropTypes.array.isRequired,
  onUploadAvatar: PropTypes.func,
};
