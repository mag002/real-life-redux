import React from 'react';
import reducer from './reducer';
import { onSubmit, getBrands, getDeal, onUploadImage } from './actions';
import saga from './saga';
import makeSelectDealForm from './selectors';
import PropTypes from 'prop-types';
// import { Container, Row, Col } from 'reactstrap';
import Col from 'reactstrap/es/Col';
import Row from 'reactstrap/es/Row';
import Container from 'reactstrap/es/Container';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { DEAL_FORM, ERROR_MESSAGES, GET_DEAL_SUCCESSFULLY } from './constants';
import { StyledDealForm } from './styled/StyledDealForm';
import { Classes, Intent } from '@blueprintjs/core/lib/esm/index';
// import { isArray, isEmpty, get, isEqual } from 'lodash';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import isNull from 'lodash/isNull';
import remove from 'lodash/remove';
import get from 'lodash/get';
import classNames from 'classnames';
import { FormValidation } from 'calidation';
import CommonButton from 'components/CommonButton';
import CommonInput from 'components/CommonInput';
import * as inputTypes from 'components/CommonInput/constants';
import CustomLink from 'components/CommonLink';
import { isMinLength, isNumber, isRequired } from 'utils/formValidation';
import { CommonToaster } from 'components/CommonToaster';
import DropzoneWithPreview from './UploadImage';
import history, { forwardTo } from 'utils/history';
import { generateUniqueId } from 'utils/utilities';
import { configuration } from '../../constants';
import AuthUtils from 'utils/auth';
import env from 'env';

export class DealForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dealId: props.match.params.id ? props.match.params.id : null,
      deal: {
        images: [{
          id: 0,
          key: generateUniqueId(),
        }],
      },
      errorMessage: null,
      brands: [],
      models: [],
      types: [],
      selectedBrand: null,
      selectedModel: null,
      selectedType: null,
      titleText: 'Create',
      numUploadImage: 1,
      imageUploadingActiveKey: null,
      formConfig: {
        title: {
          ...isRequired(),
          ...isMinLength(5),
        },
        price: {
          ...isRequired(),
          ...isNumber(),
        },
        established_year: {
          ...isRequired(),
          ...isNumber(),
        },
        km_range: {
          ...isRequired(),
          ...isNumber(),
        },
        description: {
          ...isRequired(),
        },
        brand_id: {
          ...isRequired(),
        },
        model_id: {
          ...isRequired(),
        },
        type: {
          ...isRequired(),
        },
      },
      uploaded: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChangeBrand = this.handleChangeBrand.bind(this);
    this.handleChangeModel = this.handleChangeModel.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.updateFormValidation = this.updateFormValidation.bind(this);
    this.handleGetDealData = this.handleGetDealData.bind(this);
    this.handleLoadImage = this.handleLoadImage.bind(this);
    this.handleRemoveImage = this.handleRemoveImage.bind(this);
  }

  componentDidMount() {
    if (isNull(AuthUtils.getToken()) && isNull(AuthUtils.getUserInfo())) {
      history.push('/auth/login');
    }
    this.props.getBrands();
    this.initData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorCode && !isEqual(nextProps.errorCode, this.props.errorCode)) {
      CommonToaster.show({
        message: ERROR_MESSAGES[nextProps.errorCode],
        intent: Intent.DANGER,
      });

      this.setState({
        uploaded: true,
      });
    }

    if (!isEmpty(nextProps.brands) && !isEqual(nextProps.brands, this.state.brands || [])) {
      this.setState({
        brands: nextProps.brands,
      }, () => {
        if (this.state.dealId) {
          this.props.getDeal(this.state.dealId);
        }
      });
    }

    if (!isEqual(nextProps.deal, this.props.deal)) {
      this.handleGetDealData(nextProps.deal);
    }

    if (!isEqual(nextProps.actionType, this.props.actionType)) {
      if (nextProps.actionType === GET_DEAL_SUCCESSFULLY) {
        this.handleGetDealData(nextProps.deal);
      } else {
        CommonToaster.show({
          message: this.state.titleText === 'Create' ? 'Your ad is successfully added' : `${this.state.titleText} deal successfully`,
          intent: Intent.SUCCESS,
        });

        // Redirect to manage
        setTimeout(() => {
          forwardTo('/user/my-ads');
        }, 500);
      }
    }

    if (!isEqual(nextProps.urls, this.props.urls)) {
      this.handleLoadImage(nextProps.urls);
    }
  }

  onChange(evt) {
    this.setState({
      deal: {
        ...this.state.deal,
        [evt.target.name]: evt.target.value,
      },
      errorMessage: null,
    });
  }

  onSubmit() {
    this.props.onSubmit(this.state.deal);
  }

  initData() {
    this.setState({
      types: [
        { label: 'Manual', value: configuration.motoTypes[0] },
        { label: 'Semi Auto', value: configuration.motoTypes[1] },
        { label: 'Automatic', value: configuration.motoTypes[2] },
      ],
    });

    if (this.state.dealId) {
      this.setState({
        deal: {
          ...this.state.deal,
          id: this.state.dealId,
        },
        titleText: 'Update',
      });
    }
  }

  formContext = null;

  updateFormValidation(data) {
    if (this.formContext) {
      this.formContext.setField(data);
    }
  }

  handleChangeBrand(brand) {
    this.updateFormValidation({
      brand_id: brand.value,
    });

    const { deal } = this.state;
    deal.brand_id = brand.value;
    this.setState({
      models: brand.brand.models,
      deal,
      selectedBrand: brand,
      selectedModel: null,
    });
  }

  handleChangeModel(model) {
    this.updateFormValidation({
      model_id: model.value,
    });

    const { deal } = this.state;
    deal.model_id = model.value;
    this.setState({
      deal,
      selectedModel: model,
    });
  }

  handleChangeType(type) {
    this.updateFormValidation({
      type: type.value,
    });

    const { deal } = this.state;
    deal.type = type.value;
    this.setState({
      deal,
      selectedType: this.state.types.find((el) => el.value === type),
    });
  }

  handleGetDealData(dealData) {
    const selectedBrand = this.state.brands.find((el) => el.id === dealData.brand_id);
    const selectedModel = selectedBrand ? selectedBrand.models.find((el) => el.id === dealData.model_id) : null;

    this.updateFormValidation(dealData);

    if (isEmpty(dealData.images)) {
      dealData.images = [];
    }

    dealData.images.map((img) => {
      if (!img.key) {
        img.key = generateUniqueId();
      }
      return img;
    });

    // Add one more new
    this.handleAddImageUploadingOneMore(dealData.images);

    this.setState({
      deal: dealData,
      selectedBrand: {
        label: selectedBrand ? selectedBrand.name : null,
        value: selectedBrand ? selectedBrand.id : null,
      },
      selectedModel: {
        label: selectedModel ? selectedModel.name : null,
        value: selectedModel ? selectedModel.id : null,
      },
      selectedType: this.state.types.find((el) => el.value === dealData.type),
    });
  }

  handleUploadImage(key, files) {
    this.setState({
      imageUploadingActiveKey: key,
      uploaded: false,
    }, () => {
      const { deal } = this.state;
      const total = (deal.images.length - 1) + files.length;

      let images = files;
      if (total > 10) {
        images = files.slice(0, 11 - deal.images.length);
      }

      this.props.onUploadImage(images);
    });
  }

  handleLoadImage(urls) {
    const { deal } = this.state;

    urls.map((url, index) => {
      // Remove domain
      let newUrl = new URL(url);
      let shortUrl = newUrl.pathname.replace(`/${env.BUCKET}/`, '');

      if (index === 0) {
        // Assign url for first upload component
        const imgUploading = deal.images.find((el) => el.key === this.state.imageUploadingActiveKey);
        if (imgUploading) {
          imgUploading.base_url = shortUrl;
          imgUploading.url = shortUrl;
          imgUploading.source = configuration.sourceAWS;
        }
      } else {          // Other component upload
        deal.images.push({
          id: 0,
          key: generateUniqueId(),
          url: shortUrl,
          base_url: shortUrl,
          source: configuration.sourceAWS,
        });
      }
    });
    console.log('handleLoadImage', deal.images);
    // Add one more new
    this.handleAddImageUploadingOneMore(deal.images);

    console.log('handleLoadImage after', deal.images);

    this.setState({
      deal,
      numUploadImage: this.state.numUploadImage + 1,
      uploaded: true,
    });
  }

  handleAddImageUploadingOneMore(images) {
    const freeImage = images.find((el) => isEmpty(el.url));
    if (!freeImage && images.length < configuration.maxUploadImage) {
      images.push({
        id: 0,
        key: generateUniqueId(),
      });
    }
    return images;
  }

  renderErrors() {
    if (!isEmpty(this.props.errorMessages)) {
      if (isArray(this.props.errorMessages)) {
        return (this.props.errorMessages.map((error) =>
          (<p className={'text-danger'}>
            <i className={'fa fa-times mr-2'} />
            {error}
          </p>)));
      }

      return (
        <p className={'text-danger'}>
          <i className={'fa fa-times mr-2'} />
          {this.props.errorMessages}
        </p>
      );
    }
    return '';
  }

  handleRemoveImage(image) {
    let { deal } = this.state;

    remove(deal.images, (item) => item.key === image.key);

    this.handleAddImageUploadingOneMore(deal.images);

    this.setState({ deal });
  }

  render() {
    const uploadImages = [];

    this.state.deal.images.forEach((image) => {
      uploadImages.push(<DropzoneWithPreview
        key={image.key}
        image={image}
        handleUpload={this.handleUploadImage}
        removeImage={this.handleRemoveImage}
        uploaded={this.state.uploaded}
      />);
    });

    return (
      <StyledDealForm>
        <Container>
          <Row className={'justify-content-center'}>
            <Col md={12}>
              <Row className={'justify-content-center'}>
                <h4 className={'center-text'} style={{ textTransform: 'uppercase' }}>{`${this.state.titleText} Ad`}</h4>
              </Row>
              <Row>
                <Col>
                  <FormValidation
                    onSubmit={({ isValid }) => {
                      if (isValid) {
                        this.onSubmit();
                      }
                    }}
                    config={this.state.formConfig}
                  >
                    {(ctx) => {
                      this.formContext = ctx;
                      const { fields, errors, submitted } = ctx;

                      return (
                        <div>
                          <CommonInput
                            autoFocus
                            label={'Enter the title'}
                            name={'title'}
                            onChange={this.onChange}
                            type={inputTypes.TEXT}
                            value={fields.title}
                            errors={errors.title}
                            submitted={submitted}
                          />

                          <Row>
                            <Col md={6}>
                              <CommonInput
                                label={'Price'}
                                name={'price'}
                                onChange={this.onChange}
                                type={inputTypes.TEXT}
                                value={get(this.state.deal, 'price')}
                                errors={errors.price}
                                submitted={submitted}
                              />
                            </Col>
                            <Col md={6}>
                              <CommonInput
                                name="brand_id"
                                label="Brand"
                                value={this.state.selectedBrand}
                                options={this.state.brands.map((item) => ({
                                  label: item.name,
                                  value: item.id,
                                  brand: item,
                                }))}
                                onChange={(item) => {
                                  this.handleChangeBrand(item);
                                }}
                                type={inputTypes.SELECT}
                                errors={errors.brand_id}
                                submitted={submitted}
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col md={6}>
                              <CommonInput
                                label={'Color'}
                                name={'color'}
                                onChange={this.onChange}
                                type={inputTypes.TEXT}
                                value={get(this.state.deal, 'color')}
                                errors={errors.color}
                                submitted={submitted}
                              />
                            </Col>
                            <Col md={6}>
                              <CommonInput
                                name="model_id"
                                label="Model"
                                value={this.state.selectedModel}
                                options={this.state.models.map((item) => ({
                                  label: item.name,
                                  value: item.id,
                                }))}
                                onChange={(item) => this.handleChangeModel(item)}
                                type={inputTypes.SELECT}
                                errors={errors.model_id}
                                submitted={submitted}
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col md={6}>
                              <CommonInput
                                label={'Year From'}
                                name={'established_year'}
                                onChange={this.onChange}
                                type={inputTypes.TEXT}
                                value={get(this.state.deal, 'established_year')}
                                errors={errors.established_year}
                                submitted={submitted}
                              />
                            </Col>
                            <Col md={6}>
                              <CommonInput
                                label={'ODO (KMs)'}
                                name={'km_range'}
                                onChange={this.onChange}
                                type={inputTypes.TEXT}
                                value={get(this.state.deal, 'km_range')}
                                errors={errors.km_range}
                                submitted={submitted}
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col md={6}>
                              <CommonInput
                                name="type"
                                label="Type"
                                value={this.state.selectedType}
                                options={this.state.types}
                                onChange={(item) => this.handleChangeType(item)}
                                type={inputTypes.SELECT}
                                errors={errors.type}
                                submitted={submitted}
                              />
                            </Col>
                          </Row>

                          <div className={'upload-image'}>
                            <div className={'title'}>Image</div>
                            <div className={'sub-title'}>Maximum 10 images</div>

                            <div className="d-flex flex-row flex-wrap">
                              {uploadImages}
                            </div>
                          </div>

                          <CommonInput
                            label="Enter the description"
                            name="description"
                            value={get(this.state.deal, 'description')}
                            onChange={this.onChange}
                            type={inputTypes.TEXTAREA}
                            rows={10}
                            errors={errors.description}
                            submitted={submitted}
                          />

                          <div className={'mt-5 ps-btn-group'}>

                            <CustomLink to="/user/my-ads" className={'text-center'}>
                              <CommonButton
                                className={classNames(Classes.LARGE,'cancel')}
                              >Cancel</CommonButton>
                            </CustomLink>

                            <CommonButton
                              className={classNames(Classes.INTENT_PRIMARY, Classes.LARGE, 'ml-3','update')}
                              type="submit"
                            >{`${this.state.titleText} Ad`}</CommonButton>
                          </div>

                        </div>
                      );
                    }}
                  </FormValidation>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </StyledDealForm>
    );
  }
}

DealForm.propTypes = {
  onSubmit: PropTypes.func,
  brands: PropTypes.array,
  getDeal: PropTypes.func,
  onUploadImage: PropTypes.func,
};

const mapStateToProps = makeSelectDealForm();

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      onSubmit,
      getBrands,
      getDeal,
      onUploadImage,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: DEAL_FORM, reducer });
const withSaga = injectSaga({ key: DEAL_FORM, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DealForm);
