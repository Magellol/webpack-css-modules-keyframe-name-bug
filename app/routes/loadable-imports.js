export const reactLoadableProps = {
    Users: {
        // TODO: ?
        // require.resolveWeak
        loader: import(/* webpackChunkName: "user-route" */ './Users')
    }
}