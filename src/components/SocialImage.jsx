import React from 'react';

export default function SocialImage({ data }) {
  return <img src={data.ogImage.url} alt={data.title} />;
}
