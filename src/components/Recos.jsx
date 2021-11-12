import React from 'react';

export default function Recos({data}) {
  return <img src={data.image.url} alt={data.title} />;
}
