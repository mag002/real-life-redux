import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
// import { isEqual, isEmpty } from 'lodash';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
// import { Container, Row, Col } from 'reactstrap';
import Col from 'reactstrap/es/Col';
import Row from 'reactstrap/es/Row';
import Container from 'reactstrap/es/Container';
import { loadDealDetail, getSimilarPost, onCreateTransaction } from './actions';
import { makeSelectDealDetailPage } from './selectors';
import DetailWrapper from './styled/DetailWrapper';
import ImageGalleryWrapper from './styled/ImageGalleryWrapper';
import SimilarPost from './styled/SimilarPost';
import CommonButton from 'components/CommonButton';
import classNames from 'classnames';
import { Classes, Intent } from '@blueprintjs/core';
import ImageGallery from 'react-image-gallery';
import env from 'env';
import numeral from 'numeral';
import FavoriteButton from '../FavoriteButton';
import icoUser from 'images/icons/ic-account-circle.svg';
import icoPhone from 'images/icons/ic-settings-phone.svg';
import moment from 'moment';
import { CommonToaster } from 'components/CommonToaster';
// import icoEmail from 'images/icons/email.svg';
import ButtonLinkWithIcon from 'components/ButtonLinkWithIcon';
import TablePropsDeal from 'components/TablePropsDeal';
import ProductRow from 'components/ProductRow';
import { DEAL_DETAIL_PAGE, ERROR_MESSAGES } from './constants';
import { configuration } from '../../constants';
import { forwardTo } from '../../utils/history';
import StyledError from './styled/StyledError';
import icoNotFound from 'images/icons/file.svg';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import AlertPopup from 'components/AlertPopup';
import BuyConfirmWrapper from './styled/BuyConfirmWrapper';
import auth from 'utils/auth';
import LinesEllipsis from 'react-lines-ellipsis';
import ButtonLink from '../../components/ButtonLink';
import SearchBar from 'containers/SearchBar';
import StyledRow from './styled/StyledRow';
import { eUserType } from '../../enums/EUserType';

export class DealDetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dealId: props.match.params.id,
      dealSlug: props.match.params.slug,
      filterData: {
        page: 1,
        paginate: 8,
        brand: 0,
        model: 0,
        currentDealId: 0,
      },
      showPhone: false,
      isBuyConfirm: false,
      userId: null,
      showMoreDescription: false,
      showButtonMore: false,
      isFullscreen: false,
      deal: {},
    };

    this.handleBuyConfirm = this.handleBuyConfirm.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleGetDetail = this.handleGetDetail.bind(this);
    this.handleReflow = this.handleReflow.bind(this);
    this.handleBuyConfirm = this.handleBuyConfirm.bind(this);
  }

  componentDidMount() {
    this.handleGetDetail();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorCode && !isEqual(nextProps.errorCode, this.props.errorCode)) {
      CommonToaster.show({
        message: ERROR_MESSAGES[nextProps.errorCode],
        intent: Intent.DANGER,
      });
    }

    if (nextProps.deal && !isEqual(nextProps.deal, this.props.deal)) {
      let { filterData } = this.state;
      filterData.brand = nextProps.deal.brand_id || 0;
      filterData.model = nextProps.deal.model_id || 0;
      filterData.currentDealId = nextProps.deal.id || 0;

      this.setState({
        dealId: nextProps.deal.id,
        deal: nextProps.deal,
      });

      this.props.getSimilarPost(filterData);
    }

    if (nextProps.transaction && !isEqual(nextProps.transaction, this.props.transaction)) {
      CommonToaster.show({
        message: 'Your order is submitted, please wait for the seller\'s confirmation.',
        intent: Intent.SUCCESS,
      });
      this.handleGetDetail();
    }

    // Reload when change deal id
    if (nextProps.match.params.slug !== this.state.dealSlug) {
      this.setState({
        dealId: nextProps.match.params.id,
        dealSlug: nextProps.match.params.slug,
      }, () => {
        this.handleGetDetail();
      });
    }
  }
  componentWillUnmount() {
    this.setState({
      deal: {},
    });
  }

  handleBuyConfirm() {
    this.setState({
      isBuyConfirm: true,
    });
  }
  handleClickImg() {
    this.setState({
      isFullscreen: true,
    });
    this.imageGallery.fullScreen();
  }
  handleCloseFullscreen() {
    this.setState({
      isFullscreen: false,
    });
    this.imageGallery.exitFullScreen();
  }
  handleGetDetail() {
    const userInfo = auth.getUserInfo();
    this.props.loadDealDetail(this.state.dealSlug, userInfo ? userInfo.id : null);
  }

  handleBuy() {
    this.setState({
      isBuyConfirm: false,
    }, () => {
      this.props.onCreateTransaction(this.state.dealId);
    });
  }
  handleCancel() {
    this.setState({
      isBuyConfirm: false,
    });
  }

  handleReflow(rleState) {
    const { clamped } = rleState;

    if (clamped && !this.state.showButtonMore) {
      this.setState({ showButtonMore: true });
    }

    if (!clamped && this.state.showButtonMore) {
      this.setState({ showButtonMore: false });
    }
  }

  render() {
    let { similarPosts } = this.props;
    let { deal } = this.state;
    deal = deal || {};

    let images = [];


    if (deal) {
      if (deal.images) {
        images = deal.images.map((item) => ({
          original: item.source === configuration.sourceAWS ? `${env.IMAGE_AWS_URL}/${env.BUCKET}/${item.url}` : `${env.API_OKXE}/${item.url}`,
          thumbnail: item.source === configuration.sourceAWS ? `${env.IMAGE_AWS_URL}/${env.BUCKET}/${item.url}` : `${env.API_OKXE}/${item.url}`,
        }));
      }
    }

    let rows = (<h4>No data found!</h4>);
    if (similarPosts && this.props.similarPosts.total > 0) {
      rows = similarPosts.docs.map((item) => (<ProductRow
        twoPerRow
        key={item.id}
        data={item}
        listView={false}
        gridView
        hasSidebar={false}
        callbackHandleFavoriteSuccess={() => {
          this.props.getSimilarPost(this.state.filterData);
        }}
      />));
    }

    let userName = deal.user ? (deal.user.type === eUserType.DEALER ? deal.user.store_name : deal.user.name) : '';

    return (
      <Container>
        <SearchBar
          overrideSearch={() => {
            forwardTo('/search');
          }}
          filterData={this.state.filterData}
        />
        <Breadcrumbs
          items={[
            { path: '/', name: 'Home' },
            { name: deal.title },
          ]}
        />

        {!isEmpty(deal) ? <StyledRow>
          <Col
            md={6}
            md={12}
          >
            <ImageGalleryWrapper>
              <i
                className={`fas fa-times ${this.state.isFullscreen ? 'd-block' : 'd-none'}`}
                onClick={() => this.handleCloseFullscreen()}
              />
              <ImageGallery
                items={images}
                showFullscreenButton={false}
                showPlayButton={false}
                lazyLoad
                  // autoPlay
                onClick={() => console.log(this.handleClickImg())}
                ref={(ref) => {
                  this.imageGallery = ref;
                }}
                useBrowserFullscreen={false}
              />
            </ImageGalleryWrapper>
          </Col>

          <Col
            md={6}
            md={12}
          >
            <div
              style={{ minHeight: 634 }}
              className="d-flex flex-column"
            >
              <DetailWrapper className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start">
                  <div className={'title'}>
                    <span>{deal.title}</span>
                  </div>

                  <FavoriteButton
                    dealId={deal.id}
                    total_favorite={deal.total_favorite || 0}
                    added={!isEmpty(deal.favorite_deals)}
                    callbackSuccess={this.handleGetDetail}
                  />
                </div>

                <div className={'price'}>
                  <span>{numeral(deal.price || 0).format('0,0')} đ</span>
                </div>

                <div className="date mb-2">
                  {moment(deal.created_at).format('DD MMM YYYY')}
                </div>

                <div className="author mb-4">
                  <ButtonLinkWithIcon
                    icon={icoUser}
                    width={16}
                    height={16}
                  >
                    {userName}
                  </ButtonLinkWithIcon>
                </div>
                {(!auth.getToken() || auth.getUserInfo().id !== deal.user.id) && <Row className={'d-flex d-md-none'} style={{ marginBottom: '15px' }}>
                  <Col style={{ paddingRight: '5px', flexGrow: '1.3' }}>
                    <CommonButton
                      className={classNames(Classes.FILL, Classes.LARGE)}
                      onClick={() => {
                        if (this.state.showPhone) {
                          window.location.href = `tel:${deal.user ? deal.user.phone : ''}`;
                        } else {
                          this.setState({ showPhone: true });
                        }
                      }}
                    >
                      <img
                        src={icoPhone}
                        width={18}
                        height={18}
                        alt={'message'}
                        className={`mr-3 ${!this.state.showPhone?'':'d-none'}`}
                        style={{ paddingBottom: '2px', filter: 'invert(70%)' }}
                      />
                      {!this.state.showPhone ? 'Phone' : deal.user ? deal.user.phone : ''}
                    </CommonButton>
                  </Col>
                  <Col style={{ paddingLeft: '5px', flexGrow: '1' }}>
                    <CommonButton
                      className={classNames(Classes.FILL, Classes.INTENT_PRIMARY, Classes.LARGE)}
                      onClick={isEmpty(deal.transactions) ? this.handleBuyConfirm : null}
                    >
                      {isEmpty(deal.transactions) ? 'Buy now' : 'Waiting'}
                    </CommonButton>
                  </Col>
                </Row>}

                <div className={'description mb-2'}>
                  {this.state.showMoreDescription ?
                    <span>{deal.description}</span> :
                    <LinesEllipsis
                      text={deal.description}
                      maxLine="6"
                      ellipsis={<ButtonLink
                        className={'btn-more'}
                        onClick={() => this.setState({
                          showMoreDescription: !this.state.showMoreDescription,
                        })}
                      ><span className={'dot-ellipsis'}>...</span>More</ButtonLink>}
                      trimRight
                      basedOn="words"
                      ref={(ref) => { this.description = ref; }}
                      onReflow={this.handleReflow}
                    />}
                </div>

                {/* {this.state.showButtonMore &&  */}

                <TablePropsDeal
                  deal={deal}
                  className={'mt-auto'}
                />
              </DetailWrapper>

              {(!auth.getToken() || auth.getUserInfo().id !== deal.user.id) && <Row className={'d-none d-md-flex'} style={{ marginTop: '15px' }}>
                <Col md={7} style={{ paddingRight: '0px' }}>
                  <CommonButton
                    className={classNames(Classes.FILL, Classes.LARGE)}
                    onClick={() => {
                      if (this.state.showPhone) {
                        window.location.href = `tel:${deal.user ? deal.user.phone : ''}`;
                      } else {
                        this.setState({ showPhone: true });
                      }
                    }}
                  >
                    <img
                      src={icoPhone}
                      width={18}
                      height={18}
                      alt={'message'}
                      className={`mr-3 `}
                      style={{ paddingBottom: '2px', filter: 'invert(70%)' }}
                      
                    />
                    {!this.state.showPhone ? 'Contact now' : deal.user ? deal.user.phone : ''}
                  </CommonButton>
                </Col>
                <Col md={5}>
                  <CommonButton
                    className={classNames(Classes.FILL, Classes.INTENT_PRIMARY, Classes.LARGE)}
                    onClick={isEmpty(deal.transactions) ? this.handleBuyConfirm : null}
                  >
                    {isEmpty(deal.transactions) ? 'Buy now' : 'Waiting'}
                  </CommonButton>
                </Col>
                </Row>}
            </div>
          </Col>
        </StyledRow> :
        <StyledError>
          <img src={icoNotFound} alt={'deal not found'} />

          <div className={'message-not-found'}>This post has been taken down or removed, please go back or find
              another one
            </div>

          <div className={'back-to-home'}>
            <CommonButton
              className={classNames(Classes.LARGE)}
              onClick={() => {
                forwardTo('/');
              }}
            >Return to homepage</CommonButton>
          </div>
        </StyledError>
        }

        <SimilarPost>
          <div className={'title'}>
            <span>Similar Posts</span>
          </div>

          <Row className={'mt-2'} style={{ marginRight: '-5px', marginLeft: '-5px' }}>
            {rows}
          </Row>

          <div className={'text-center mt-5 mb-5'}>
            <Link to="/search">
              <CommonButton
                className={classNames(Classes.LARGE, 'pr-5', 'pl-5', 'd-none', 'd-md-inline')}
                style={{ color: 'black', fontWeight: 400 }}
              >View all</CommonButton>
            </Link>
          </div>
        </SimilarPost>

        <AlertPopup
          title={'Confirm'}
          content={(
            <BuyConfirmWrapper>
              <Row>
                <Col>
                  <p
                    className={'title'}
                  >{`You are going to buy "${deal.title}" from ${userName} by `}<span className="price">${numeral(deal.price || 0).format('0,0')}</span>.</p>
                </Col>
              </Row>
              <Row style={{ textAlign: 'left' }}>
                <Col>
                  <span>Specifications</span>
                  <TablePropsDeal deal={deal} />
                </Col>
              </Row>
            </BuyConfirmWrapper>
          )}
          isOpen={this.state.isBuyConfirm}
          handleConfirm={this.handleBuy}
          handleCancel={this.handleCancel}
        />

      </Container>
    );
  }
}

DealDetailPage.propTypes = {
  errorCode: PropTypes.string,
  loadDealDetail: PropTypes.func.isRequired,
  similarPosts: PropTypes.object,
  getSimilarPost: PropTypes.func,
  onCreateTransaction: PropTypes.func,
  transaction: PropTypes.object,
  deal: PropTypes.object,
};

DealDetailPage.defaultProps = {
  similarPosts: {},
  deal: {},
};

const mapStateToProps = makeSelectDealDetailPage();

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadDealDetail,
      getSimilarPost,
      onCreateTransaction,
    },
    dispatch
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: DEAL_DETAIL_PAGE, reducer });
const withSaga = injectSaga({ key: DEAL_DETAIL_PAGE, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(DealDetailPage);
