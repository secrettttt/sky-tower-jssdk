import reqwest from 'reqwest';
import { getCurrentPid, getCurrentUid } from '../constant/index';

const emitCountEvent = (event) => {
  reqwest({
    url: "http://localhost:8765/emit/count_event",
    method: 'post',
    type: 'json',
    crossOrigin: true, /* 跨域请求 */
    withCredentials: false, /* 值为false，表示前端向服务端发请求时不带cookie */
    data: {
      event,
      type: 'count',
      time: new Date().getTime(),
      pid: getCurrentPid(),
      uid: getCurrentUid()
    }
  });
}

export default emitCountEvent;