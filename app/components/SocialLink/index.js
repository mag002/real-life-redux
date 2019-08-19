/**
*
* SocialLink
*
*/

import React from 'react';
import Button from 'components/CustomButton';
// import { capitalize } from 'lodash';
import capitalize from 'lodash/capitalize';
import PropTypes from 'prop-types';

import './styles.scss';

function SocialLink({ provider }) {
  return (
    <a href={`http://localhost:1337/connect/${provider}`} className="link">
      <Button type="button" social={provider} style={{ width: '100%' }}>
        <i className={`fa fa-${provider}`} />
        {capitalize(provider)}
      </Button>
    </a>
  );
}

SocialLink.propTypes = {
  provider: PropTypes.string.isRequired,
};

export default SocialLink;
