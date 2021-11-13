import React from 'react';

export default function Recos({data}) {
  return <img src={data.ogImage.url} alt={data.title} />;
}
