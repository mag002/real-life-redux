export const SET_USER_INFO = 'GLOBAL/SET_USER_INFO';
export function setUserInfo(data) {
  return {
    type: SET_USER_INFO,
    data,
  };
}
