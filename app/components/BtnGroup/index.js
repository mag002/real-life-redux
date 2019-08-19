import React from 'react';
import PropTypes from 'prop-types';
import StyledButtonGroup from './styled/StyledButtonGroup';

class BtnGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listViewActive: true,
      gridViewActive: false,
    };

    this.handleList = this.handleList.bind(this);
    this.handleGrid = this.handleGrid.bind(this);
  }

  handleList() {
    this.setState({
      listViewActive: true,
      gridViewActive: false,
    }, () => this.props.handleList());
  }

  handleGrid() {
    this.setState({
      listViewActive: false,
      gridViewActive: true,
    }, () => this.props.handleGrid());
  }

  render() {
    return (<StyledButtonGroup className={this.props.className}>
      <a
        onClick={this.handleList}
        id="list"
        role={'button'}
        tabIndex={0}
        className={this.state.listViewActive ? 'active' : ''}
      >
        <i className="fa fa-list-ul" /> <span className={'d-none d-md-inline'}>List view</span></a>
      <a
        onClick={this.handleGrid}
        id="grid"
        role={'button'}
        tabIndex={0}
        className={this.state.gridViewActive ? 'active' : ''}
      >
        <i className="fa fa-th" /> <span className={'d-none d-md-inline'}>Grid view</span></a>
    </StyledButtonGroup>);
  }
}

BtnGroup.propTypes = {
  handleList: PropTypes.func,
  handleGrid: PropTypes.func,
  className: PropTypes.string
};

export default BtnGroup;
