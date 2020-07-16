import React from 'react';

import PhotoFeed from 'components/PhotoFeed';

import StatsFilter from './components/StatsFilter';
import StatsGraph from './components/StatsGraph';

export default () => (
  <div>
    <StatsFilter />
    <StatsGraph />
    <PhotoFeed />
  </div>
);

