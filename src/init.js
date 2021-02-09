import { setPid, setUid, getCurrentPid, getCurrentUid } from './constant/index';
import reqwest from 'reqwest';

const init = (obj) => {
  setPid(obj.pid);
  setUid(obj.uid);

  // 页面初始化后，记录用户的访问记录
  reqwest({
    url: "http://101.200.197.197:8765/emit/pv_uv_info",
    method: 'post',
    type: 'json',
    crossOrigin: true, /* 跨域请求 */
    withCredentials: false, /* 值为false，表示前端向服务端发请求时不带cookie */
    data: {
      pid: getCurrentPid(),
      uid: getCurrentUid(),
      view_time: new Date().getTime()
    }
  });
}

export default init;