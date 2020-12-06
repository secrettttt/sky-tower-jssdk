let pid = '';
let uid = '';

const getCurrentPid = () => {
  return pid;
}

const getCurrentUid = () => {
  return uid;
}

const setPid = (p) => {
  pid = p;
}

const setUid = (u) => {
  uid = u;
}


export {
  getCurrentPid,
  getCurrentUid,
  setPid,
  setUid,
};