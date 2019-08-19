/**
 *
 * CommonInput
 *
 */

// import { isEmpty } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import * as PropTypes from 'prop-types';
import * as inputTypes from './constants';
import StyledSwitch from './styled/StyledSwitch';
import StyledSelect from './styled/StyledSelect';
import { Radio, Classes } from '@blueprintjs/core';
import StyledTextArea from './styled/StyledTextArea';
import StyledCheckBox from './styled/StyledCheckBox';
import StyledFormGroup from './styled/StyledFormGroup';
import StyledInputGroup from './styled/StyledInputGroup';
import StyledRadioGroup from './styled/StyledRadioGroup';
import PlacesFieldCustom from 'components/PlacesAutocomplete';
import StyledTextareaGroup from './styled/StyledTextareaGroup';
import StyledSwitchFormGroup from './styled/StyledSwitchFormGroup';
import StyledSelectGroup from './styled/StyledSelectGroup';
import StyledPhoneGroup from './styled/StyledPhoneGroup';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import SmartInput from 'react-phone-number-input/smart-input';
import { TransactionType } from '../../containers/TransactionPage/FilterBar';

class CommonInput extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      hasInitialValue: false,
      showPassword: false,
      isChanged: false,
      isValidPhone: undefined,
    };
    this.handleChangeSwitch = this.handleChangeSwitch.bind(this);
    this.initControl = this.initControl.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.handleChangeInputPhone = this.handleChangeInputPhone.bind(this);
    this.initControl = this.initControl.bind(this);
  }

  componentDidMount() {
    this.initControl();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.isChanged && nextProps.value) {
      this.setState({
        isChanged: true,
      });
    }

    if (nextProps.value) {
      this.onFocus();
    }
  }

  onFocus = () => {
    this.setState({
      isChanged: true,
    });
  };

  onBlur = () => {
    if (this.props.value !== 0 && !this.props.value) {
      this.setState({
        isChanged: false,
      });
    }
  };

  handleChangeCheckbox() {
    const target = {
      type: inputTypes.CHECKBOX,
      value: !this.props.value,
      name: this.props.name,
    };

    this.props.onChange({ target });
  }

  handleChangeSwitch() {
    const target = {
      type: inputTypes.SWITCH,
      value: !this.props.value,
      name: this.props.name,
    };

    this.props.onChange({ target });
  }

  handleChangeInputPhone(evt) {
    const target = {
      type: inputTypes.PHONE_INPUT,
      value: evt || '',
      name: this.props.name,
    };
    this.props.onChange({ target });
  }

  initControl() {
    if (this.props.value && !isEmpty(this.props.value)) {
      this.setState({ hasInitialValue: true });
    }

    if (!isEmpty(this.props.errors)) {
      this.setState({ errors: this.props.errors });
    }
  }

  renderInputCheckbox() {
    return (
      <StyledCheckBox
        checked={this.props.value}
        label={this.props.label}
        onChange={this.handleChangeCheckbox}
        id={this.props.name}
      />
    );
  }

  renderInputSwitch() {
    return (
      <StyledSwitchFormGroup
        label={this.props.label}
      >
        {this.props.text1}
        <StyledSwitch
          label={this.props.text2}
          checked={this.props.value}
          onChange={this.handleChangeSwitch}
        />
      </StyledSwitchFormGroup>
    );
  }

  renderInputRadio() {
    return (
      <StyledRadioGroup
        inline={this.props.inline}
        label={this.props.label}
        name={this.props.name}
        selectedValue={this.props.value}
        onChange={this.props.onChange}
      >
        {this.props.radios.map((radio) => (
          <Radio label={radio.label} value={radio.value} />
        ))}
      </StyledRadioGroup>
    );
  }

  renderInputPlaceAutocomplete() {
    return (
      <StyledFormGroup
        helperText={this.renderErrors()}
        label={this.props.label}
        labelFor={this.props.name}
        isChanged={this.state.isChanged}
        disabled={this.props.disabled}
        readOnly={this.props.readOnly}
        hasError={this.props.submitted && this.props.errors}
      >
        <PlacesFieldCustom
          value={this.props.value}
          onSelect={this.props.onSelect}
          onChange={this.props.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          placeholder={this.props.placeholder}
          name={this.props.name}
        />
      </StyledFormGroup>
    );
  }

  renderInputSelect() {
    return (
      <StyledSelectGroup
        helperText={this.renderErrors()}
        label={this.props.label}
        labelFor={this.props.name}
        isChanged={this.state.isChanged}
        disabled={this.props.disabled}
        readOnly={this.props.readOnly}
        hasError={this.props.submitted && this.props.errors}
      >
        <StyledSelect
          name={this.props.name}
          id={this.props.name}
          scrollMenuIntoView
          clearable={this.props.clearable}
          isSearchable={this.props.isSearchable}
          value={this.props.value}
          options={this.props.options}
          onChange={this.props.onChange}
          placeholder={''}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          menuContainerStyle={{ zIndex: 999 }}
        />
      </StyledSelectGroup>
    );
  }

  renderInputTextArea() {
    return (
      <StyledTextareaGroup
        helperText={this.renderErrors()}
        label={this.props.label}
        labelFor={this.props.name}
        isChanged={this.state.isChanged}
        disabled={this.props.disabled}
        readOnly={this.props.readOnly}
        hasError={this.props.submitted && this.props.errors}
      >
        <StyledTextArea
          readOnly={this.props.readOnly}
          name={this.props.name}
          id={this.props.name}
          onChange={this.props.onChange || (() => true)}
          value={this.props.value}
          disabled={this.props.disabled}
          autoFocus={this.props.autoFocus}
          tabIndex={this.props.tabIndex}
          autoComplete={this.props.autoComplete}
          type={'textarea'}
          className={Classes.FILL}
          rows={this.props.rows}
        />
      </StyledTextareaGroup>
    );
  }

  renderInputphone() {
    return (
      <StyledPhoneGroup
        helperText={this.renderErrors()}
        label={this.props.label}
        labelFor={this.props.name}
        isChanged={this.state.isChanged}
        disabled={this.props.disabled}
        readOnly={this.props.readOnly}
        hasError={this.props.submitted && this.props.errors}
      >
        <PhoneInput
          name={this.props.name}
          id={this.props.name}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onChange={(env) => this.handleChangeInputPhone(env)}
          value={this.props.value}
          type={this.props.type}
          disabled={this.props.disabled}
          autoFocus={this.props.autoFocus}
          tabIndex={this.props.tabIndex}
          autoComplete={this.props.autoComplete}
          label={this.props.label}
          inputComponent={mdartInput}
          country={this.props.country}
        />
      </StyledPhoneGroup>
    );
  }

  renderErrors() { // eslint-disable-line consistent-return
    if (this.props.submitted && !this.props.disabled) {
      return (
        <div
          className={'form-control-feedback invalid-feedback'}
          style={{ display: 'block' }}
        >{this.props.errors}</div>
      );
    }
  }

  render() {
    const inputValue = this.props.value || '';

    switch (this.props.type) {
      case inputTypes.CHECKBOX:
        return this.renderInputCheckbox();
      case inputTypes.SWITCH:
        return this.renderInputSwitch();
      case inputTypes.RADIO:
        return this.renderInputRadio();
      case inputTypes.SELECT:
        return this.renderInputSelect();
      case inputTypes.PLACE_AUTOCOMPLETE:
        return this.renderInputPlaceAutocomplete();
      case inputTypes.TEXTAREA:
        return this.renderInputTextArea();
      case inputTypes.PHONE_INPUT:
        return this.renderInputphone();
      default:
    }

    return (
      <StyledFormGroup
        helperText={this.renderErrors()}
        label={this.props.label}
        labelFor={this.props.name}
        isChanged={this.state.isChanged}
        disabled={this.props.disabled}
        readOnly={this.props.readOnly}
        hasError={this.props.submitted && this.props.errors}
      >
        <StyledInputGroup
          readOnly={this.props.readOnly}
          name={this.props.name}
          id={this.props.name}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onChange={this.props.onChange || (() => true)}
          value={inputValue}
          type={this.props.type}
          disabled={this.props.disabled}
          autoFocus={this.props.autoFocus}
          tabIndex={this.props.tabIndex}
          autoComplete={this.props.autoComplete}
        />
      </StyledFormGroup>
    );
  }
}

CommonInput.propTypes = {
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  errors: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  tabIndex: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
    PropTypes.object,
  ]),
  text1: PropTypes.string,
  text2: PropTypes.string,
  submitted: PropTypes.bool,
  autoComplete: PropTypes.string,
  radios: PropTypes.array,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,

  // only used for type radio
  inline: PropTypes.bool,

  // only used for type select
  options: PropTypes.array,
  clearable: PropTypes.bool,
  isSearchable: PropTypes.bool,

  // only used for type place autocomplete
  onSelect: PropTypes.func,

  // only used for type textarea
  rows: PropTypes.number,
  country: PropTypes.string,
};
CommonInput.defaultProps = {
  autoComplete: 'off',
  country: 'VN',
};

export default CommonInput;
