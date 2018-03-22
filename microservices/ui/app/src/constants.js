const USER_INFO_KEY = 'UserInfoKey';

var clusterName = window.location.href.split(".")[1];
if (process.env.REACT_APP_CLUSTER_NAME) {
  clusterName = process.env.REACT_APP_CLUSTER_NAME;
}

const GRAPHQL_URL = 'https://data.' + clusterName + '.hasura-app.io/v1alpha1/graphql';
const AUTH_URL = 'https://auth.' + clusterName + '.hasura-app.io/v1/user/info';

export {
  USER_INFO_KEY,
  GRAPHQL_URL,
  AUTH_URL
};
