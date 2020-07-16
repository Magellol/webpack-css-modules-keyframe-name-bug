import React from 'react';

import PhotoFeed from './components/PhotoFeed/PhotoFeed';
import StatsFilter from './components/StatsFilter/StatsFilter';
import StatsGraph from './components/StatsGraph/StatsGraph';

export default () => (
  <div>
    <StatsFilter />
    <StatsGraph />
    <PhotoFeed />
  </div>
);

