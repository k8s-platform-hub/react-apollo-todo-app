var clusterName = window.location.href.split(".")[1];
if (process.env.REACT_APP_CLUSTER_NAME) {
  clusterName = process.env.REACT_APP_CLUSTER_NAME;
}

const GRAPHQL_URL = 'https://data.' + clusterName + '.hasura-app.io/v1alpha1/graphql';
const AUTH_URL = 'https://auth.' + clusterName + '.hasura-app.io/v1/user/info';

var userInfo = null;

function saveUserInfo(info) {
  userInfo = info;
}

function getUserInfo() {
  return userInfo;
}

function redirectToAuthUIKitIfNeeded() {
  if (process.env.REACT_APP_CLUSTER_NAME) {
    window.location = 'https://auth.' + clusterName + '.hasura-app.io/ui?redirect_url=' + window.location
  }
}

export {
  saveUserInfo, getUserInfo,
  redirectToAuthUIKitIfNeeded,
  GRAPHQL_URL,
  AUTH_URL
};
