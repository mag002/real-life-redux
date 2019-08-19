import React, { Fragment } from 'react';
import Dropzone from 'react-dropzone';
import icoCamera from 'images/icons/photo-camera.svg';
import icoLoading from 'images/icons/loading.gif';
import PropTypes from 'prop-types';
import { eUploadFileProcess } from '../../enums/EUploadFileProcess';
import { getImageDeal } from '../../utils/utilities';

const styled = require('styled-components').default;
import { imageCenterAlign } from 'styles/commonCss';
import Image from 'react-shimmer';
import { Spinner } from '@blueprintjs/core';

const getColor = (props) => {
  if (props.isDragReject) {
    return '#c66';
  }
  if (props.isDragActive) {
    return '#6c6';
  }
  return '#979797';
};

const Container = styled.div`
  width: 160px;
  height: 100px;
  border-width: 1px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: ${(props) => props.isDragReject || props.isDragActive ? 'solid' : 'solid'};
  background-color: ${(props) => props.isDragReject || props.isDragActive ? props.theme.grayColor : ''};
  outline: none;
  margin-right: 10px;
  margin-bottom: 10px;
  position: relative;
  
  .preview {
    width: 100%;
    height: 100%;
    ${imageCenterAlign}
  }
`;

const ImgPreview = styled.img`
  width: 100%;
  height: 100%;
`;

const ImgIcon = styled.img`
  width: 100%;
  height: 100%;
  padding: 15%;
`;

const ButtonRemove = styled.button`
  position: absolute;
  top: 5px;
  right: 15px;
  cursor: pointer;
  border: 1px solid #979797 !important;
  color: #979797;
  line-height: 1;
  background-color: white;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  z-index: 10;
  transition: 0.3s;
  
  i.fa {
    //font-weight: 400;
    font-size: 12px;
  }
  
  &:hover {
    border: 1px solid #b41a1a !important;
    color: #b41a1a;
  }
`;

class DropzoneWithPreview extends React.Component {
  constructor() {
    super();
    this.state = {
      files: [],
      image: {
        id: null,
        key: null,
        url: null,
        base_url: null,
      },
      processStatus: eUploadFileProcess.NEW,
    };
    this.onDrop = this.onDrop.bind(this);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    // if (this.props.image !== nextProps.image && nextProps.image) {
    //   this.setState({
    //     image: nextProps.image,
    //     processStatus: eUploadFileProcess.DONE,
    //   });
    // }

    if (nextProps.uploaded && nextProps.uploaded !== this.props.uploaded) {
      this.setState({
        processStatus: eUploadFileProcess.DONE,
      });
    }
  }

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach((file) => URL.revokeObjectURL(file.preview));
  }

  onDrop(files) {
    this.setState({
      // files: files.map((file) => Object.assign(file, {
      //   preview: URL.createObjectURL(file),
      // })),
      processStatus: eUploadFileProcess.PROCESSING,
    });

    this.props.handleUpload(this.props.image.key, files);
  }

  render() {
    const { files } = this.state;
    const { image } = this.props;

    const thumbs = files.map((file) => (
      <div className="preview" key={file.name}>
        <ImgPreview
          src={file.preview}
        />
      </div>
    ));

    let previewUrl;
    if (image.url) {
      previewUrl = getImageDeal(image.url, image.source);
    }

    console.log(this.state.processStatus);

    return (
      <section>
        <Dropzone
          accept="image/*"
          multiple
          onDrop={this.onDrop}
        >
          {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles }) => (
            <section style={{ position: 'relative' }}>
              {image.url && <ButtonRemove
                onClick={() => {
                  if (this.props.removeImage) {
                    this.props.removeImage(this.props.image);
                  }
                }}
              >
                <i className="fa fa-times" aria-hidden="true" />
              </ButtonRemove>}

              <Container
                isDragActive={isDragActive}
                isDragReject={isDragReject}
                {...getRootProps()}
              >

                <input {...getInputProps()} />

                {image.url ? (
                  <div className="preview">
                    <Image
                      src={previewUrl}
                      fallback={<Spinner />}
                    />
                  </div>
                ) : (
                  <React.Fragment>
                    {this.state.processStatus === eUploadFileProcess.PROCESSING ? (
                      <div className="preview">
                        <Spinner />
                      </div>
                    ) : (
                      <div className="preview">
                        <img src={icoCamera} alt={'add images'} />
                      </div>
                    )}
                  </React.Fragment>
                )}
              </Container>
            </section>
          )}
        </Dropzone>
      </section>
    );
  }
}

DropzoneWithPreview.propTypes = {
  handleUpload: PropTypes.func,
  image: PropTypes.shape({
    id: PropTypes.number,
    key: PropTypes.string,
    url: PropTypes.string,
    base_url: PropTypes.string,
    source: PropTypes.string,
  }),
  removeImage: PropTypes.func,
  uploaded: PropTypes.bool,
};

export default DropzoneWithPreview;
