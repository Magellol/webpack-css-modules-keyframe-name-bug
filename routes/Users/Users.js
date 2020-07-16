import styles from './Users.css';

export default () => {
    console.log(styles);
    
    import(/* webpackChunkName: "user-stats-sub-route" */ './components/UserStatsSubRoute')
}