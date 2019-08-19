import React from 'react';
import saga from './saga';
import auth from 'utils/auth';
import Banner from './banner';
import { forwardTo } from '../../utils/history';
import reducer from './reducer';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getDeals } from './actions';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import TagPanel from 'components/TagPanel';
// import { Container, Row } from 'reactstrap';
import Row from 'reactstrap/es/Row';
import Container from 'reactstrap/es/Container';
import { Classes } from '@blueprintjs/core';
import SearchBar from 'containers/SearchBar';
import makeSelectHomePage from './selectors';
import ProductRow from 'components/ProductRow';
import LogoBanner from 'components/LogoBanner';
import injectReducer from 'utils/injectReducer';
import { bindActionCreators, compose } from 'redux';
import CommonButton from 'components/CommonButton';
import BtnGroup from 'components/BtnGroup'

const StyledHomepage = styled.div`
`;

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);
    this.state = {
      showButton: false,
      brandId: 1,
      deals: {
        docs: [],
        total: 0,
      },
      filterData: {},
    };
    this.handleBrandSelected = this.handleBrandSelected.bind(this);
    this.handleTagSelected = this.handleTagSelected.bind(this);
    this.handleGrid = this.handleGrid.bind(this);
    this.handleList = this.handleList.bind(this);
  }

  componentDidMount() {
    if (auth.getToken()) {
      this.setState({
        showButton: true,
      });
    }

    this.props.getDeals();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      deals: nextProps.deals,
    });
  }

  logout = (e) => {
    e.preventDefault();
    auth.clearAppStorage();
    this.setState({ showButton: false });
  };

  handleBrandSelected(id) {
    this.setState({
      filterData: {
        brand: id,
      },
    });
  }

  handleTagSelected(tag) {
    this.setState({
      filterData: {
        keywords: tag,
      },
    });
  }

  handleList = () => {
    this.setState({
      twoPerRow:false
    });
  };

  handleGrid = () => {
    this.setState({
      twoPerRow:true
    });
  };
  render() {
    const rows = this.state.deals.docs.map((deal) => (
      <ProductRow
        twoPerRow={this.state.twoPerRow}
        key={Math.random()}
        data={deal}
        listView={false}
        gridView
        callbackHandleFavoriteSuccess={this.props.getDeals}
      />
    ));

    return (
      <StyledHomepage>
        <Banner />
        <Container>
          <SearchBar
            overrideSearch={() => {
              forwardTo('/search');
            }}
            filterData={this.state.filterData}
          />

          <LogoBanner handleBrandSelected={this.handleBrandSelected} />
          
        <Row className={"d-md-flex d-md-none"} style={{alignItems:'center',justifyContent:'space-between',margin:'10px 0px'}}>
            <BtnGroup 
             handleList={this.handleList}
             handleGrid={this.handleGrid}
            />
            <Link to="/search">
              <CommonButton
                className={classNames('mobile')}
               
              >View all</CommonButton>
            </Link>
        </Row>
          <Row style={{ marginLeft: '-5px', marginRight: '-5px' }}>
            {rows}
          </Row>

          <div className={'text-center mt-5 mb-5'}>
            <Link to="/search">
              <CommonButton
                className={classNames(Classes.LARGE, 'pr-5', 'pl-5','d-none','d-md-inline')}
                style={{ color: 'black', fontWeight: 400 }}
              >View all</CommonButton>
            </Link>
          </div>
        </Container>
        <TagPanel
          handleTagSelected={this.handleTagSelected}
        />
      </StyledHomepage>
    );
  }
}

HomePage.propTypes = {
  getDeals: PropTypes.func.isRequired,
  deals: PropTypes.object,
};

const mapStateToProps = makeSelectHomePage();

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getDeals,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
