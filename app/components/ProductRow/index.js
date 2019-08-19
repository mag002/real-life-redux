import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import numeral from 'numeral';
import { eDateFormat } from 'enums/EDateFormat';
import { eDealStatus, eDealStatusColor } from 'enums/EDealStatus';
import { eTransactionStatusColor, eTransactionStatus, eTransactionStatusText } from 'enums/ETransactionStatus';
import { Link } from 'react-router-dom';
import StyledPanel from './styled/StyledPanel';
import StyledListView from './styled/StyledListView';
import StyledGridView from './styled/StyledGridView';
import FavoriteButton from 'containers/FavoriteButton';
import StyledLink from './styled/StyledLink';
import defaultAvatar from 'images/icons/ic-account-circle.svg';
import ButtonLinkWithIcon from '../ButtonLinkWithIcon';
import { getImageDeal, getImageDealFromArray } from 'utils/utilities';
import icoYear from 'images/icons/ic-date-range.svg';
import icoModel from 'images/icons/ic-stars-circle.svg';
import icoODO from 'images/icons/ic-settings-input-svideo.svg';
// import { capitalize, isEmpty } from 'lodash';
import capitalize from 'lodash/capitalize';
import isEmpty from 'lodash/isEmpty';
import LinesEllipsis from 'react-lines-ellipsis';
import Image from 'react-shimmer';
import { Spinner } from '@blueprintjs/core';
import { eUserType } from '../../enums/EUserType';

export default class ProductRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isClickedRemove: false,
    };
  }

  render() {
    let nextStatus;
    let deal = this.props.data;
    const { id: dealId, user } = deal;

    const dealImage = deal.image ? getImageDeal(deal.image, deal.image_source) : getImageDealFromArray(deal.images, 0);

    if ([eDealStatus.ACTIVE, eDealStatus.PAUSED].includes(deal.status)) {
      nextStatus = deal.status === eDealStatus.ACTIVE ? eDealStatus.PAUSED : eDealStatus.ACTIVE;
    }

    const link = this.props.link || `/${deal.brand && deal.brand.slug ? deal.brand.slug : 'slug'}/${deal.slug || deal.id}`;

    if (this.props.gridView) {
      return (
        <StyledPanel className={`${this.props.twoPerRow?'col-6':'col-12'} col-md-6 col-md-4 ${this.props.hasSidebar ? '' : 'col-lg-3'}`}>
          <StyledGridView className={'wrapper'}>
            <StyledLink to={link} />

            <div className="list-image mb-2">
              <Image
                src={dealImage}
                fallback={<Spinner />}
              />
            </div>

            <div className="list-amount">
              {numeral(deal.price || 0).format('0,0')} đ
            </div>

            <div className="list-group-item-heading mb-3">
              <LinesEllipsis
                text={deal.title}
                maxLine="2"
                ellipsis="..."
                trimRight
                basedOn="words"
              />
            </div>

            <div className={'inline'}>
              <div className="list-date">
                {moment(deal.last_push).format(eDateFormat.DATE_FORMAT)}
              </div>

              <div className={'favorite'}>
                <FavoriteButton
                  dealId={deal.id}
                  added={deal.is_favorite}
                  callbackSuccess={this.props.callbackHandleFavoriteSuccess}
                  total_favorite={deal.total_favorite || 0}
                />
              </div>
            </div>
          </StyledGridView>
        </StyledPanel>
      );
    }

    return (
      <StyledPanel className={`${this.props.twoPerRow?'col-6':'col-12'}  col-md-12 mb-4`}>
        <StyledListView className={'wrapper'}>
          <StyledLink to={link} />

          <div className="list-image">
            <Image
              src={dealImage}
              fallback={<Spinner />}
            />
          </div>

          <div className={'detail'}>
            <div className="inline mb-2">
              <div className="list-group-item-heading flex-grow-1">
                <LinesEllipsis
                  text={deal.title}
                  maxLine="1"
                  ellipsis="..."
                  trimRight
                  basedOn="words"
                />
              </div>

              {this.props.showFavoriteButton && <div className={'favorite'}>
                <FavoriteButton
                  dealId={deal.id}
                  added={deal.is_favorite}
                  callbackSuccess={() => {
                    this.setState({ isClickedRemove: false }, this.props.callbackHandleFavoriteSuccess);
                  }}
                  total_favorite={deal.total_favorite || 0}
                  isClicked={this.state.isClickedRemove}
                />
              </div>}
            </div>

            <div className={'inline mb-2'}>
              <div className={'props d-none d-md-flex'}>
                <ButtonLinkWithIcon
                  icon={icoYear}
                  width={14}
                  height={14}
                >{deal.established_year}</ButtonLinkWithIcon>

                <ButtonLinkWithIcon
                  icon={icoModel}
                  width={14}
                  height={14}
                >{!isEmpty(deal.model) ? deal.model.name : ''}</ButtonLinkWithIcon>

                <ButtonLinkWithIcon
                  icon={icoODO}
                  width={16}
                  height={16}
                >{deal.km_range} km</ButtonLinkWithIcon>
              </div>

              <div className="list-date">
                {moment(deal.last_push).format(eDateFormat.DATE_FORMAT)}
              </div>
            </div>

            <div className="inline mb-1">
              <div className="list-amount">
                {numeral(deal.price || 0).format('0,0')} đ
              </div>


              <div className={'list-author'}>
                {this.props.showBuyer && (
                  <ButtonLinkWithIcon
                    icon={defaultAvatar}
                    altIcon={'avatar'}
                    width={16}
                    height={16}
                    textLeft
                  >
                    {this.props.buyer ?
                      (this.props.buyer.type === eUserType.BUYER ?
                        this.props.buyer.name :
                        this.props.buyer.store_name) :
                      ''}
                  </ButtonLinkWithIcon>
                )}
                {this.props.showSeller && (
                  <ButtonLinkWithIcon
                    icon={defaultAvatar}
                    altIcon={'avatar'}
                    width={16}
                    height={16}
                    textLeft
                  >
                    {this.props.seller ?
                      (this.props.buyer.type === eUserType.DEALER ?
                        this.props.seller.store_name : this.props.seller.name) :
                      ''}
                  </ButtonLinkWithIcon>
                )}
                {(!this.props.showBuyer && !this.props.showSeller) && (
                  <ButtonLinkWithIcon
                    icon={defaultAvatar}
                    altIcon={'avatar'}
                    width={16}
                    height={16}
                    textLeft
                  >
                    {user ?
                      (user.type === eUserType.DEALER ? user.store_name : user.name) :
                      (deal.user_type === eUserType.DEALER ? deal.store_name : deal.user_name)}
                  </ButtonLinkWithIcon>
                )}
              </div>
            </div>

            {this.props.showStatus && <div className="list-status mb-1">
              <span style={{ color: `${eDealStatusColor[deal.status]}` }}>
                {deal.status === eDealStatus.COMPLETED ? 'SUCCESSFUL' : deal.status}
              </span>
            </div>}
            {this.props.showTransactionStatus && <div className="list-status mb-1">
              <span
                style={{ color: `${eTransactionStatusColor[this.props.transactionStatus]}` }}
              >{eTransactionStatusText[this.props.transactionStatus]}</span>
            </div>}

            <div className="list-description mt-4 d-none d-md-block">
              <LinesEllipsis
                text={deal.description}
                maxLine="4"
                ellipsis="..."
                trimRight
                basedOn="words"
              />
            </div>

            {this.props.showAction && <div className="list-action">
              <Link to={`/deal/update/${dealId}`}>
                <button>Edit</button>
              </Link>

              {(nextStatus) && (
                <button
                  onClick={() => {
                    this.props.handleChangeStatus(dealId, {
                      nextStatus,
                      brand_id: this.props.data.brand_id,
                      model_id: this.props.data.model_id,
                    });
                  }}
                >
                  {capitalize(nextStatus === eDealStatus.ACTIVE ? 'RESUME' : (nextStatus === eDealStatus.PAUSED ? 'Pause' : nextStatus))}
                </button>
              )}

              <button
                onClick={() => {
                  this.props.handleDelete(dealId);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>

            </div>}

            {this.props.showActionFavorite && <div className="list-action">
              <button onClick={() => this.setState({ isClickedRemove: true })}>
                Remove from favorite
              </button>
            </div>}

            {this.props.showActionSeller && <div className="list-action">
              <button
                onClick={() => this.props.handleUpdateTransactionStatus(this.props.transactionId, eTransactionStatus.SUCCESSFULLY)}
              >
                Accept
              </button>
              <button
                onClick={() => this.props.handleUpdateTransactionStatus(this.props.transactionId, eTransactionStatus.REJECT)}
              >
                Reject
              </button>
            </div>}

            {this.props.showActionBuyer && <div className="list-action">
              <button
                onClick={() => this.props.handleUpdateTransactionStatus(this.props.transactionId, eTransactionStatus.CANCEL)}
              >
                Cancel
              </button>

            </div>}

          </div>
        </StyledListView>
      </StyledPanel>
    );
  }
}


ProductRow.propTypes = {
  gridView: PropTypes.bool,
  data: PropTypes.object,
  hasSidebar: PropTypes.bool,
  showFavoriteButton: PropTypes.bool,
  showAction: PropTypes.bool,
  showActionFavorite: PropTypes.bool,
  showStatus: PropTypes.bool,
  handleDelete: PropTypes.func,
  handleChangeStatus: PropTypes.func,
  // handleRemoveFavorite: PropTypes.func,
  callbackHandleFavoriteSuccess: PropTypes.func,
  // Transaction
  transactionId: PropTypes.number,
  showActionSeller: PropTypes.bool,
  showActionBuyer: PropTypes.bool,
  showTransactionStatus: PropTypes.bool,
  seller: PropTypes.object,
  showSeller: PropTypes.bool,
  buyer: PropTypes.object,
  showBuyer: PropTypes.bool,
  transactionStatus: PropTypes.string,
  handleUpdateTransactionStatus: PropTypes.func,
  link: PropTypes.string,
  twoPerRow:PropTypes.bool,
};
