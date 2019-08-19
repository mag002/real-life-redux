/**
*
* UploadAvatar
*
*/

import React from 'react';
// import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import DropzoneWrapper from './styled/DropzoneWrapper';
import * as PropTypes from 'prop-types';
import defaultImage from 'images/icons/user.svg';
import { Spinner } from '@blueprintjs/core';
import Image from 'react-shimmer';

class UploadAvatar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.image,
    };

    this.onDrop = this.onDrop.bind(this);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.image) {
      this.setState({
        image: nextProps.image,
      });
    }
  }

  onDrop(acceptedFiles) {
    if (acceptedFiles.length > 0) {
      this.setState({
        image: { url: URL.createObjectURL(acceptedFiles[0]) },
      }, () => this.props.onDrop(acceptedFiles[0]));
    }
  }

  render() {
    const imageUrl = this.state.image ? this.state.image.url : defaultImage;
    return (
      <Dropzone
        onDrop={this.onDrop}
        multiple={false}
        accept="image/*"
      >
        {({ getRootProps, getInputProps }) => (
          <DropzoneWrapper size={this.props.size}>
            <div {...getRootProps()}>
              <div className={`preview ${this.state.image ? '' : 'default-avatar'}`}>
                <Image
                  src={imageUrl}
                  alt={'avatar'}
                  fallback={<Spinner />}
                />
              </div>

              <i className={`fa fa-camera ${this.state.image ? '' : 'd-none'}`} aria-hidden="true" />

              <input {...getInputProps()} />
              {this.state.image ? '' : <span>Upload Avatar</span>}
            </div>
          </DropzoneWrapper>
        )}
      </Dropzone>
    );
  }
}

UploadAvatar.propTypes = {
  onDrop: PropTypes.func.isRequired,
  image: PropTypes.shape({
    id: PropTypes.number,
    url: PropTypes.string,
  }),
  size: PropTypes.string,
};

export default UploadAvatar;
