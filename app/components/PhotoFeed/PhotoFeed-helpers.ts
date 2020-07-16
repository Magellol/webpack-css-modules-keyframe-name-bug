import React from 'react';

import * as O from 'shared/facades/option';

type PhotoFeedIdContextValue = O.Option<string>;
export const photoFeedIdContext = React.createContext<PhotoFeedIdContextValue>(O.none);
