/**
 *
 * AuthPage
 *
 */
// import { isNull, isEmpty } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import React from 'react';
import saga from './saga';
import reducer from './reducer';
import { compose } from 'redux';
import AuthUtils from 'utils/auth';
import FormLogin from './FormLogin';
import history from 'utils/history';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import FormRegister from './FormRegister';
import { eUserType } from 'enums/EUserType';
import StyledLogo from './styled/StyledLogo';
import logo from '../../images/logoheader.png';
import injectReducer from 'utils/injectReducer';
import Container from 'reactstrap/es/Container';
import FormForgotPassword from './FormForgotPassword';
import FormCompleteProfile from './FormCompleteProfile';
import { submit, submitOTP, submitForgotPasswordOTP, fetchLocaltionOnCompleteProfile, uploadAvatar } from './actions';
import { KEY_APP, FORM_TYPE_LOGIN, FORM_TYPE_REGISTER, FORM_TYPE_COMPLETE_PROFILE, FORM_TYPE_FORGOT_PASSWORD } from 'containers/AuthPage/constants';
import { createStructuredSelector } from 'reselect/es';
import makeSelectAuthPage from './selectors';
import { convertListObjectToLookup } from '../../utils/commonHelper';
import { formatPhoneNumber } from 'react-phone-number-input';

export class AuthPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      createLoginObj: {
        phone: '',
        password: '',
        rememberMe: false,
      },
      createRegisterObj: {
        phone: '',
        password: '',
        confirm_password: '',
        code: '',
        type: eUserType.BUYER,
      },
      createForgotPasswordObj: {
        phone: '',
        password: '',
        confirm_password: '',
        code: '',
      },
      createCompleteProfileObj: {
        phone: '',
        name: '',
        email: '',
        address: '',
        province_id: '',
        county_id: '',
        latitude: '',
        longitude: '',
        avatar: '',
      },
      errorMessage: null,
      sentCode: false,
      phoneNumber: '',
      locations: [],
      provincesOptions: [],
      countyOptions: [],
    };
    this.handleChangeLoginFrm = this.handleChangeLoginFrm.bind(this);
    this.handleSubmitSendOTP = this.handleSubmitSendOTP.bind(this);
    this.handleChangeRegisterFrm = this.handleChangeRegisterFrm.bind(this);
    this.handleChangeCompleteProfileFrm = this.handleChangeCompleteProfileFrm.bind(this);
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    this.handleSubmitRegister = this.handleSubmitRegister.bind(this);
    this.callbackError = this.callbackError.bind(this);
    this.handleResetFields = this.handleResetFields.bind(this);
    this.handleSubmitForgotPassword = this.handleSubmitForgotPassword.bind(this);
    this.handleSubmitSendOTPForgotPassword = this.handleSubmitSendOTPForgotPassword.bind(this);
    this.handleChangeForgotPasswordFrm = this.handleChangeForgotPasswordFrm.bind(this);
    this.handleSubmitCompleteProfile = this.handleSubmitCompleteProfile.bind(this);
  }

  componentDidMount() {
    if (this.props.location.pathname.includes(FORM_TYPE_COMPLETE_PROFILE)) {
      this.props.onFetchLocaltionOnCompleteProfile(this.callbackError);
    } else if (!isNull(AuthUtils.getToken()) && !isNull(AuthUtils.getUserInfo())) {
      history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    const self = this;
    if (nextProps.authPage && this.props.authPage !== nextProps.authPage) {
      const newState = {
        locations: nextProps.authPage.locations,
        phoneNumber: nextProps.authPage.user.phone,
        userType: nextProps.authPage.user.type,
      };
      this.setState(newState, () => {
        const provincesOptions = !isEmpty(this.props.authPage.locations) ? convertListObjectToLookup(this.props.authPage.locations, 'name', 'id') : [];
        self.setState({
          provincesOptions,
        });
      });
      if (this.formContext) {
        this.formContext.setField(newState);
      }
      if (nextProps.authPage.avatar) {
        let createCompleteProfileObj = this.state.createCompleteProfileObj;
        createCompleteProfileObj.avatar = nextProps.authPage.avatar;
        this.setState({
          createCompleteProfileObj,
        });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.handleResetFields();
      if (this.props.location.pathname.includes(FORM_TYPE_COMPLETE_PROFILE)) {
        this.props.onFetchLocaltionOnCompleteProfile(this.callbackError);
      }
    }
  }

  handleChangeLoginFrm(evt) {
    this.setState({
      createLoginObj: {
        ...this.state.createLoginObj,
        [evt.target.name]: evt.target.value,
      },
      errorMessage: null,
    });
  }

  handleChangeForgotPasswordFrm(evt) {
    this.setState({
      createForgotPasswordObj: {
        ...this.state.createForgotPasswordObj,
        [evt.target.name]: evt.target.value,
      },
      errorMessage: null,
    });
  }

  handleChangeCompleteProfileFrm(evt) {
    let createCompleteProfileObj = this.state.createCompleteProfileObj;
    createCompleteProfileObj[evt.target.name] = evt.target.value;
    this.setState({
      createCompleteProfileObj,
      errorMessage: null,
    });
  }

  handleResetFields(cbData) {
    this.setState({
      createLoginObj: {
        phone: '',
        password: '',
        rememberMe: false,
      },
      createRegisterObj: {
        phone: '',
        password: '',
        confirm_password: '',
        code: '',
        type: eUserType.BUYER,
      },
      createForgotPasswordObj: {
        phone: '',
        password: '',
        confirm_password: '',
        code: '',
      },
      createCompleteProfileObj: {
        phone: '',
        name: '',
        email: '',
        address: '',
        province_id: '',
        county_id: '',
        latitude: '',
        longitude: '',
        avatar: '',
      },
      errorMessage: '',
      sentCode: false,
      phoneNumber: cbData ? cbData.phone : '',
      userType: cbData ? cbData.type : '',
    });
  }

  handleChangeRegisterFrm(evt) {
    this.setState({
      createRegisterObj: {
        ...this.state.createRegisterObj,
        [evt.target.name]: evt.target.value,
      },
      errorMessage: null,
    });
  }

  handleSubmitLogin() {
    const dtoObj = {
      phone: this.state.createLoginObj.phone,
      password: this.state.createLoginObj.password,
      rememberMe: this.state.createLoginObj.rememberMe,
    };
    this.props.onSubmit(dtoObj, FORM_TYPE_LOGIN, this.callbackError, this.handleResetFields);
  }

  handleSubmitSendOTP() {
    const phone = this.state.createRegisterObj.phone;
    this.setState({
      sentCode: true,
    });
    this.props.onSubmitSendOTP(phone, this.callbackError);
  }

  handleSubmitRegister() {
    const dtoObj = {
      phone: this.state.createRegisterObj.phone && formatPhoneNumber(this.state.createRegisterObj.phone, 'National'),
      phoneInternational: this.state.createRegisterObj.phone && formatPhoneNumber(this.state.createRegisterObj.phone, 'International'),
      password: this.state.createRegisterObj.password,
      confirm_password: this.state.createRegisterObj.confirm_password,
      code: this.state.createRegisterObj.code,
      type: this.state.createRegisterObj.type,
    };
    this.props.onSubmit(dtoObj, FORM_TYPE_REGISTER, this.callbackError, this.handleResetFields);
  }

  handleSubmitSendOTPForgotPassword() {
    const phone = this.state.createForgotPasswordObj.phone;
    this.setState({
      sentCode: true,
    });
    this.props.onSubmitSendOTPForgotPassword(phone, this.callbackError);
  }

  handleSubmitForgotPassword() {
    const dtoObj = {
      phone: this.state.createForgotPasswordObj.phone,
      password: this.state.createForgotPasswordObj.password,
      confirm_password: this.state.createForgotPasswordObj.confirm_password,
      code: this.state.createForgotPasswordObj.code,
    };
    this.props.onSubmit(dtoObj, FORM_TYPE_FORGOT_PASSWORD, this.callbackError, this.handleResetFields);
  }

  handleSubmitCompleteProfile() {
    const dtoObj = {
      name: this.state.createCompleteProfileObj.name,
      email: this.state.createCompleteProfileObj.email,
      address: this.state.createCompleteProfileObj.address,
      province_id: this.state.createCompleteProfileObj.province_id,
      county_id: this.state.createCompleteProfileObj.county_id,
      latitude: this.state.createCompleteProfileObj.latitude,
      longitude: this.state.createCompleteProfileObj.longitude,
      avatar: this.state.createCompleteProfileObj.avatar,
    };
    this.props.onSubmit(dtoObj, FORM_TYPE_COMPLETE_PROFILE, this.callbackError, this.handleResetFields);
  }

  callbackError(errorObj) {
    this.setState({ errorMessage: errorObj.payload.error });
  }

  renderForm() {
    const { authType } = this.props.match.params;

    switch (authType) {
      case FORM_TYPE_LOGIN:
        return (
          <FormLogin
            onChange={this.handleChangeLoginFrm}
            onSubmit={this.handleSubmitLogin}
            modifiedData={this.state.createLoginObj}
            errorMessages={this.state.errorMessage}
          />
        );
      case FORM_TYPE_REGISTER:
        return (
          <FormRegister
            onChange={this.handleChangeRegisterFrm}
            onSubmit={this.handleSubmitRegister}
            onSendOTP={this.handleSubmitSendOTP}
            modifiedData={this.state.createRegisterObj}
            errorMessages={this.state.errorMessage}
            sentOTP={this.state.sentCode}
          />
        );
      case FORM_TYPE_COMPLETE_PROFILE:
        return (
          <FormCompleteProfile
            onChange={this.handleChangeCompleteProfileFrm}
            onSubmit={this.handleSubmitCompleteProfile}
            modifiedData={this.state.createCompleteProfileObj}
            errorMessages={this.state.errorMessage}
            cityOptions={this.state.provincesOptions}
            districtOptions={this.state.countyOptions}
            phoneNumber={this.state.phoneNumber}
            userType={this.state.userType}
            locations={this.state.locations}
            uploadAvatar={this.props.onUploadAvatar}
          />
        );
      case FORM_TYPE_FORGOT_PASSWORD:
        return (
          <FormForgotPassword
            onChange={this.handleChangeForgotPasswordFrm}
            onSubmit={this.handleSubmitForgotPassword}
            onSendOTP={this.handleSubmitSendOTPForgotPassword}
            modifiedData={this.state.createForgotPasswordObj}
            errorMessages={this.state.errorMessage}
            sentOTP={this.state.sentCode}
          />);
      default:
        return (<div />);
    }
  }

  render() {
    return (
      <Container style={{ paddingTop: 80, paddingBottom: 160 }}>
        <div className={'text-center'} style={{ marginBottom: '100px' }}>
          <Link to={'/'}>
            <StyledLogo src={logo} alt={'okxe.vn'} />
          </Link>
        </div>

        {this.renderForm()}
      </Container>
    );
  }
}

AuthPage.propTypes = {
  match: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSubmitSendOTP: PropTypes.func,
  onSubmitSendOTPForgotPassword: PropTypes.func,
  onFetchLocaltionOnCompleteProfile: PropTypes.func,
  onUploadAvatar: PropTypes.func,
};


export function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (data, formType, cbError, cbSucceed) => dispatch(submit(data, formType, cbError, cbSucceed)),
    onSubmitSendOTP: (data, cbError) => dispatch(submitOTP(data, cbError)),
    onSubmitSendOTPForgotPassword: (data, cbError) => dispatch(submitForgotPasswordOTP(data, cbError)),
    onFetchLocaltionOnCompleteProfile: (cbError) => dispatch(fetchLocaltionOnCompleteProfile(cbError)),
    onUploadAvatar: (data) => dispatch(uploadAvatar(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  authPage: makeSelectAuthPage(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: KEY_APP, reducer });

const withSaga = injectSaga({ key: KEY_APP, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AuthPage);
