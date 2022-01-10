import React from 'react';
import PropTypes from 'prop-types';

const SocialImage = ({ data }) => (
  <img src={data.ogImage.url} alt={data.title} />
);

SocialImage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SocialImage;
