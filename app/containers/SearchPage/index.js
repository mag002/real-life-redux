import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import PropTypes from 'prop-types';
// import { Col, Container, Row } from 'reactstrap';
import Col from 'reactstrap/es/Col';
import Container from 'reactstrap/es/Container';
import Row from 'reactstrap/es/Row';
import ProductRow from 'components/ProductRow';
import BtnGroup from 'components/BtnGroup';
import Sidebar from './Sidebar';
import SearchBar from 'containers/SearchBar';
import reducer from './reducer';
import { onChange } from './actions';
import saga from './saga';
import makeSelectHomePage from './selectors';
import { StyledSearchPage } from './styled/StyledSearchPage';
import Breadcrumbs from 'components/Breadcrumbs';
import Pagination from 'components/Pagination';
import { configuration } from '../../constants';
import NoDataFound from 'components/NoDataFound';
import queryString from 'query-string';
// import { isEmpty, isEqual } from 'lodash';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import { DAEMON } from 'utils/constants';

export class SearchPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      collapseAdvancedSearch:false,
      listView: true,
      gridView: false,
      isSearching: false,
      locationSearch: null,
      deals: {
        docs: [],
        total: 0,
      },
      dataPagination: {
        minPrice: null,
        maxPrice: null,
        model: 0,
        brand: 0,
        type: null,
        province: null,
        minKmRange: null,
        maxKmRange: null,
        minEstablishedYear: null,
        maxEstablishedYear: null,
        page: 1,
        paginate: configuration.paginate, // Grid-view with 3 column
        userType: null,
      },
      modalVisibility: false,
      brands: [],
      keyForReload: null,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleGetBrands = this.handleGetBrands.bind(this);
    this.handleShowAdvancedSearch=this.handleShowAdvancedSearch.bind(this);
  }

  // componentDidMount() {
  // let parsed = queryString.parse(this.props.location.search);
  // this.handleFilterChange(parsed);
  // }
  //
  // componentWillReceiveProps(nextProps) {
  // if (!isEqual(this.props.location.search, this.state.locationSearch)) {
  //   this.setState({
  //     locationSearch: this.props.location.search,
  //   }, () => {
  //     let parsed = queryString.parse(this.props.location.search);
  //     parsed.province = null;
  //     parsed.minPrice = null;
  //     parsed.maxPrice = null;
  //     parsed.model = 0;
  //     parsed.brand = 0;
  //     parsed.type = null;
  //     parsed.province = null;
  //     parsed.minKmRange = null;
  //     parsed.maxKmRange = null;
  //     parsed.minEstablishedYear = null;
  //     parsed.maxEstablishedYear = null;
  //     parsed.page = 1;
  //     this.handleFilterChange(parsed);
  //   });
  // }
  // }

  handleList = () => {
    this.setState({
      listView: true,
      gridView: false,
    });
  }

  handleGrid = () => {
    this.setState({
      listView: false,
      gridView: true,
    });
  }

  handleSearch = (deals, isSearching = false, keyword) => {
    if (isSearching) {
      this.setState({ isSearching });
    } else {
      if (!isEmpty(deals)) {
        this.setState({
          isSearching: false,
          keyword,
        });
      }
      if (!isEqual(deals, this.state.deals)) {
        this.setState({
          deals,
          isSearching: false,
          keyword,
        });
      }
    }
  }

  handlePageChange(pageNumber) {
    this.setState({
      dataPagination: {
        ...this.state.dataPagination,
        page: pageNumber,
      },
    }, () => {
      window.scrollTo(0, 0);
    });
  }

  handleGetBrands(brands) {
    this.setState({ brands });
  }

  handleShowAdvancedSearch() {
    this.setState({ collapseAdvancedSearch:!this.state.collapseAdvancedSearch });
  }

  handleFilterChange(params) {
    let self = this;

    setTimeout(() => {
      let dataFilter = {
        ...self.state.dataPagination,
      };

      Object.keys(params).map((key) => {
        dataFilter[key] = params[key];
        return key;
      });

      self.setState({
        dataPagination: dataFilter,
        // isSearching: true,
      });
    }, 50);
  }

  render() {
    let rows = (<NoDataFound />);
    let { deals } = this.state;

    if (this.state.isSearching) {
      rows = (<NoDataFound text={'Waiting...'} />);
    } else if (deals.total && this.state.deals.total > 0) {
      rows = deals.docs.map((deal) => (<ProductRow
        key={deal.id}
        data={deal}
        listView={this.state.listView}
        gridView={this.state.gridView}
        hasSidebar
        showFavoriteButton
        callbackHandleFavoriteSuccess={() => {
          this.setState({
            keyForReload: `s-${Math.random()}`,
          });
        }}
      />));
    }
    

    const keywordBreadcrumb = this.state.keyword ? ` for "${this.state.keyword}"` : '';
    const start = ((this.state.dataPagination.page - 1) * this.state.dataPagination.paginate) + 1;
    const end = (start + this.state.deals.docs.length) - 1;
    const breadcrumbItems = [
      { path: '/', name: 'Home' },
      { name: `${start} - ${end} of ${this.state.deals.total} results${keywordBreadcrumb}` },
    ];

    return (
      <StyledSearchPage>
        <Container>
          <SearchBar
            isSearchOnLoadPage
            handleSearch={this.handleSearch}
            filterData={this.state.dataPagination}
            handleGetBrands={this.handleGetBrands}
            keyForReload={this.state.keyForReload}
            location={this.props.location}
          />
          <div className="d-flex justify-content-between">
            <Breadcrumbs items={breadcrumbItems} />
            <BtnGroup
              className={'searchPageBtnGroup'}
              handleList={this.handleList}
              handleGrid={this.handleGrid}
            />
          </div>
          <Row>
            <Col lg={3} >
              <h4 className={'title mb-4'} onClick={this.handleShowAdvancedSearch}><strong>Refine Search</strong><i  className={`fas fa-plus d-lg-none d-inline-flex ${this.state.collapseAdvancedSearch?'active':''}`}></i></h4>
              
              <Sidebar className={`${this.state.collapseAdvancedSearch?'active':''}`}
                onChange={this.handleFilterChange}
                brands={this.state.brands}
                filterData={this.state.dataPagination}
                location={this.props.location}
              />
            </Col>

            <Col lg={9} className="main-container">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className={'title'}><strong>Recent Search</strong></h4>

                <span className={'total-result'}>{deals.total} Results</span>
              </div>

              <Row style={{ marginLeft: '-5px', marginRight: '-5px' }}>
                {rows}
              </Row>

              <Pagination
                activePage={this.state.dataPagination.page}
                totalItemsCount={this.state.deals.total}
                onChange={this.handlePageChange}
                className={'mt-4 mb-4'}
              />
            </Col>
          </Row>
        </Container>
      </StyledSearchPage>
    );
  }
}

SearchPage.propTypes = {
  onChange: PropTypes.func,
};

const mapStateToProps = makeSelectHomePage();

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      // onSearchDeals,
      onChange,
    },
    dispatch
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'searchPage', reducer });
const withSaga = injectSaga({ key: 'searchPage', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(SearchPage);
