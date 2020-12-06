import reqwest from 'reqwest';
import { getCurrentPid, getCurrentUid } from '../constant/index';

const emitActionEvent = (obj) => {
  reqwest({
    url: "http://localhost:8765/emit/action_event",
    method: 'post',
    type: 'json',
    crossOrigin: true, /* 跨域请求 */
    withCredentials: false, /* 值为false，表示前端向服务端发请求时不带cookie */
    data: {
      type: 'action',
      time: new Date().getTime(),
      pid: getCurrentPid(),
      uid: getCurrentUid(),
      ...obj
    }
  });
}

export default emitActionEvent;