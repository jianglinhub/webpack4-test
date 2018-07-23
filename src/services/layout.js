import http from 'utils/http';

const { post: ssoPost } = http.create('sso');
const { post: smsPost } = http.create('sms');
const { post } = http.create('zk');

export function login(param) {
  return ssoPost('/common/web/mobile/login-by-code.do', {
    ...param,
  });
}

export function getCode(param) {
  return smsPost('/verifycode/get.do', {
    ...param,
  });
}

export function getUserAuth(param) {
  return post('/web/user/get-user-menus', param);
}

