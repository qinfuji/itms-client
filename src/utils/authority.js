// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  let authorties = localStorage.getItem('itms-authority');
  return authorties ? authorties.split(',') : [];
}

export function setAuthority(authority) {
  console.log('--->setAuthority', authority);
  return localStorage.setItem('itms-authority', authority);
}
