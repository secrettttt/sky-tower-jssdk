import { setPid, setUid } from './constant/index';

const init = (obj) => {
  setPid(obj.pid);
  setUid(obj.uid);
}

export default init;