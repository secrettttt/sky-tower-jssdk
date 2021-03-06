# SkyTower相关工具库（sky-tower-jssdk）代码仓库


## 最新可用版本@2.0.0，安装方式：
```js
npm install skytower@2.0.0
```
@2.0.0 新功能：该版本skytower已支持可记录项目的pv、uv信息  
## 第一版@1.0.0（该版本不支持上报用户访问记录！！！），安装方式：
```js
npm install skytower@1.0.0
```
该版本为skytower可用的第一版本，使用该版本的项目不会上报pv、uv信息。若有pv、uv数据上报需求，请安装最新版本  
## 线上地址
&#160; &#160; &#160; &#160;sky-tower线上地址：https://www.npmjs.com/package/sky-tower

## 简介
&#160; &#160; &#160; &#160;sky-tower-jssdk是一个npm包，内部封装了网络库，用于上报打点数据。前端项目以npm包的方式接入sky-tower-jssdk，并在代码中加入打点，即可SkyTower监控平台上查看相关数据。  
&#160; &#160; &#160; &#160;SkyTower监控平台的数据是由业务方前端上报的。上报时，SkyTower监控平台本可以暴露接收事件上报的接口给业务方，由业务方往接口上报数据，但是这么做就过于灵活了。所以一种更好的做法是封装一个网路库给业务方使用，业务方打点数据的上报只需要调用这个网络库即可，所以SkyTower维护了这么一个jssdk工具库，业务方在前端工程里以npm方式引入，并在代码中使用该工具库暴露出的方法来上报数据，这些方法都在Emitter对象之下，Emitter的功能：
- 提供用于发射用户行为信号的方法。当用户触发某个行为事件时，将上报相关参数：项目信息、用户信息、事件名称、时间、地理位置、机型、手机系统、页面版本号、网络类型、ip地址等参数。
- 提供用于发射计数信号的方法。当用户触发某个计数事件时，将上报相关参数：项目信息、用户信息、事件名称等参数。接口每接收到一个计数事件，就后自动计数+1，用于统计事件发生的次数。
- 提供用于发射请求参数、响应参数的信号的方法。将请求参数、响应参数和对应的用户信息上报，可以对某个用户的请求进行单点追查。

## 本地开发调试发布上线流程
- 安装相关依赖
```
npm install
```
- clone下来的仓库依赖安装不成功？将package-lock.json删除再试试
- src下coding，更新feature，更新readme，本地调试，自测通过
- package.json下更新本次发布的版本号
```js
{
  "name": "sky-tower",
  "version": "0.0.6", // 本次发布的版本号为0.0.6
  ...
}
```
- 全局安装rollup
```js
npm install --global rollup
```
- 使用rollup打包
```js
rollup -c
```
- 发布上线
```js
npm publish --access=public
```

## 如何使用
### 以npm方式引入
```js
npm install skytower
```

### init方法 初始化SkyTower
| 字段名 | 类型 | 含义 | 枚举值/如何获取 |
| :-----| :---- | :---- | :---- |
| pid | string | 项目id/页面id | SkyTower监控平台上创建项目后得到的project_id |
| uid | string | 区分不同的用户，用户统计uv，追查问题 | 用户自定义 |
```js
import { init } from 'skytower';

// init方法一般在constructor或者componentDidMount里调用
init({
    pid: '987456',
    uid: this.state.user_id
});
```
### emitter对象
#### emitter.emitActionEvent 上报用户行为事件
| 字段名 | 类型 | 含义 | 枚举值/示例 |
| :-----| :---- | :---- | :---- |
| event | string | 事件名称 | 'click_bottom_button' |
| location | string | 地理位置 | '北京市海淀区' |
| device_brand | string | 机型 | 'XIAO MI' |
| app_version | string | 页面版本号 | '8.2.5' |
| system_version | string | 系统版本号 | '9.2.0' |
| client | string | 客户端类型 | 'Android' |
| net_type | string | 网络类型 | '4G' |
| ip_address | string | ip地址 | '10.157.168.235' |
| extra | object | 自定义参数 | {  env: 'dev' } |
| type | string | 事件类型（自动上报，不需要手动传） | 'action' |
| time | number | 时间id（自动上报，不需要手动传） | 1606497817532 |
| pid | string | 项目id（自动上报，不需要手动传） | '987456' |
| uid | string | 用户id（自动上报，不需要手动传） | '16678923465' |
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

#### emitter.emitCountEvent 上报计数事件
| 字段名 | 类型 | 含义 | 枚举值/示例 |
| :-----| :---- | :---- | :---- |
| event | string | 事件名称 | 'image_upload' |
| type | string | 事件类型（自动上报，不需要手动传） | 'count' |
| time | number | 项目id（自动上报，不需要手动传） | 1606497817532 |
| pid | string | 项目id（自动上报，不需要手动传） | '987456' |
| uid | string | 用户id（自动上报，不需要手动传） | '16678923465' |
```js
import { emitter } from 'skytower';

emitter.emitCountEvent('image_upload');
```

#### emitter.emitReqEvent 上报请求事件
| 字段名 | 类型 | 含义 | 枚举值/示例 |
| :-----| :---- | :---- | :---- |
| api | string | 接口地址 | 'xxx/getUserInfo' |
| query | string | get请求参数 | 'user_id=987234&&user_name=secretttt&&user_type=vip' |
| request_body | string | post请求参数 | '{"user_id": "987234", "user_name": "secretttt", "user_type": "vip"}' |
| type | string | 事件类型（自动上报，不需要手动传） | 'req' |
| time | number | 项目id（自动上报，不需要手动传） | 1606497817532 |
| pid | string | 项目id（自动上报，不需要手动传） | '987456' |
| uid | string | 用户id（自动上报，不需要手动传） | '16678923465' |
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

#### emitter.emitRespEvent 上报响应事件
| 字段名 | 类型 | 含义 | 枚举值/示例 |
| :-----| :---- | :---- | :---- |
| is_success | boolean | 成功 | false |
| is_error | boolean | 失败 | false |
| api | string | 接口地址 | 'xxx/getUserInfo' |
| resp | object | 返回参数 | '{ err_no: 0, err_msg: 'success'}' |
| type | string | 事件类型（自动上报，不需要手动传） | 'resp' |
| time | number | 项目id（自动上报，不需要手动传） | 1606497817532 |
| pid | string | 项目id（自动上报，不需要手动传） | '987456' |
| uid | string | 用户id（自动上报，不需要手动传） | '16678923465' |
```js
import { emitter } from 'skytower';

const getUserInfo = async () => {
   const { user_id } = this.state;
   const { status, data = {} } = await getUserInfo(user_id);
   
   if (status === 0) {
     // 请求成功上报
     emitter.emitRespEvent({
        api: 'xxx/updateUserInfo',
        resp: data，
        is_success
     });
   } else {
     // 请求失败上报
     emitter.emitRespEvent({
        api: 'xxx/updateUserInfo',
        resp: data，
        is_error
     });
   } 
}

```
