export const reactLoadableProps = {
    Users: {
      loader: () => import(/* webpackChunkName: "user-route" */ './Users'),
      chunkName: 'user-route',
      resolve: () => require.resolveWeak('./Users'),
    },
  };
  