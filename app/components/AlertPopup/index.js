import * as React from 'react';
import { Alert, Button, Intent } from '@blueprintjs/core';
import { StyledAlertPopup } from './styled/styled';
import PropTypes from 'prop-types';

export default class AlertPopup extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isOpen: false,
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      isOpen: nextProps.isOpen,
    });
  }

  handleMoveConfirm = () => {
    this.setState({ isOpen: false });

    if (this.props.handleConfirm) {
      this.props.handleConfirm();
    }
  };
  handleMoveCancel = () => {
    this.setState({ isOpen: false });
    if (this.props.handleCancel) {
      this.props.handleCancel();
    }
  };

  render() {
    const { isOpen } = this.state;

    return (
      <StyledAlertPopup>
        <Alert
          className={'alert-popup'}
          cancelButtonText="No"
          confirmButtonText="Yes"
          isOpen={isOpen}
          onCancel={this.handleMoveCancel}
          onConfirm={this.handleMoveConfirm}
          canEscapeKeyCancel
          canOutsideClickCancel
          intent={Intent.PRIMARY}
        >
          <div className={'alert-body'}>
            <div
              className={'justify-content-center alert-title position-relative'}
            >
              {this.props.title || 'Warning'}
              <i className="fas fa-times" onClick={this.handleMoveCancel} />
            </div>
            <div className={'alert-content'}>{this.props.content}</div>
          </div>
        </Alert>
      </StyledAlertPopup>
    );
  }
}

AlertPopup.propTypes = {
  title: PropTypes.string,
  content: PropTypes.any,
  handleConfirm: PropTypes.func,
  handleCancel: PropTypes.func,
  isOpen: PropTypes.bool,
};

AlertPopup.defaultProps = {
  isOpen: false,
};
