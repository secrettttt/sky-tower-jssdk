# SkyTower相关工具库（sky-tower-jssdk）代码仓库
&#160; &#160; &#160; &#160;SkyTower监控平台的数据是由业务方前端上报的。上报时，SkyTower监控平台可以暴露接收事件上报的接口给业务方，由业务方往接口上报数据。但是一种更好的做法是，SkyTower维护一个jssdk工具库，业务方在前端工程里以npm方式引入，并在代码中使用该工具库暴露出的方法来上报数据，这些方法都在Emitter对象之下，所以我们有必要对Emitter的功能进行梳理：
- 提供用于发射用户行为信号的方法。当用户触发某个行为事件时，将上报相关参数：项目信息、用户信息、事件名称、时间、地理位置、机型、手机系统、页面版本号、网络类型、ip地址等参数。
- 提供用于发射计数信号的方法。当用户触发某个计数事件时，将上报相关参数：项目信息、用户信息、事件名称等参数。接口每接收到一个计数事件，就后自动计数+1，用于统计事件发生的次数。
- 提供用于发射请求参数、响应参数的信号的方法。将请求参数、响应参数和对应的用户信息上报，可以对某个用户的请求进行单点追查。

## 如何使用
### 以npm方式引入
```js
npm install skytower
```

### init方法
- 初始化SkyTower
- 参数：项目id、标识独立用户的uid
```js
import { init } from 'skytower';

// init方法一般在constructor或者componentDidMount里调用
init({
    pid: '987456',
    uid: this.state.user_id
});
```
### emitter对象
#### emitter.emitActionEvent
- 上报用户行为事件
```js
import { emitter } from 'skytower';

// 这些参数不是必传的
emitter.emitActionEvent({
    event: 'click_bottom_button',
    location: '北京市海淀区',
    device_brand: 'XIAO MI',
    app_version: '8.2.5',
    system_version: '9.2.0',
    client: 'Android',
    net_type: '4G',
    ip_address: '10.157.168.235',
    extra: {
        env: 'dev'
    }    
});
```

#### emitter.emitCountEvent
- 上报计数事件
```js
import { emitter } from 'skytower';

emitter.emitCountEvent('image_upload');
```

#### emitter.emitReqEvent
- 上报请求事件
```js
import { emitter } from 'skytower';

emitter.emitReqEvent({
    api: 'xxx/getUserInfo',
    query: 'user_id=987234&&user_name=secretttt&&user_type=vip'
});

emitter.emitReqEvent({
    api: 'xxx/updateUserInfo',
    request_body: '{"user_id": "987234", "user_name": "secretttt", "user_type": "vip"}'
});
```

#### emitter.emitRespEvent
```js
import { emitter } from 'skytower';

const getUserInfo = async () => {
   const { user_id } = this.state;
   const { status, data = {} } = await getUserInfo(user_id);
   
   if (status === 0) {
     // 请求成功上报
     emitter.emitReqEvent({
        api: 'xxx/updateUserInfo',
        resp: data，
        isSuccess
     });
   } else {
     // 请求失败上报
     emitter.emitReqEvent({
        api: 'xxx/updateUserInfo',
        resp: data，
        isError
     });
   } 
}

```
