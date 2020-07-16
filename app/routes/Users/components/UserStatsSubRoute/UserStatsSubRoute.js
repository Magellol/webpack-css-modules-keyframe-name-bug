import React from 'react';

import PhotoFeed from 'components/PhotoFeed';

import StatsFilter from './components/StatsFilter';
import StatsGraph from './components/StatsGraph';

const UserStatsSubRoute = () => (
  <div>
    <StatsFilter />
    <StatsGraph />
    <PhotoFeed />
  </div>
);
