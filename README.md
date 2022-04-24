### 预览

<img src="https://github.com/wsz987/uniapp_order_online/blob/main/static/preview/home.png?raw=true" alt="home.png" style="zoom:50%;" /><img src="https://github.com/wsz987/uniapp_order_online/blob/main/static/preview/menu.png?raw=true" alt="menu.png" style="zoom:50%;" /><img src="https://github.com/wsz987/uniapp_order_online/blob/main/static/preview/cart.png?raw=true" alt="cart.png" style="zoom:50%;" /><img src="https://github.com/wsz987/uniapp_order_online/blob/main/static/preview/order.png?raw=true" alt="order.png" style="zoom:50%;" /><img src="https://github.com/wsz987/uniapp_order_online/blob/main/static/preview/mine.png?raw=true" alt="mine.png" style="zoom:50%;" /><img src="https://github.com/wsz987/uniapp_order_online/blob/main/static/preview/login.png?raw=true" alt="login.png" style="zoom:50%;" />

#### 近期更新

- 添加了管理员角色，简单的权限系统及 token校验
- `菜单页面`集成了简单的商品管理功能
- `购物车页面`商品可左滑显示 `删除按钮`，用于移除同类商品
- `订单页面` 订单显示同类商品购买数量
- 基于 [Wxpusher](https://github.com/wxpusher/wxpusher-client) 的公众号消息推送功能，适用于个人开发者/用户的实时消息提醒功能
- 因个人需求，在原本订单提交的基础上加了预约时间的步骤，同时订单提交后有公众号消息提醒功能
- 修复一些已知bug



#### 待解决/bug

- 菜单商品获取写入vuex  解决购物车数据需点击tabBar 菜单页面才能同步问题

  

#### 待立项	

- [ ] 主页
- [ ] 商品搜索
- [ ] 购物车可选择商品支付
- [ ] 商品详情页面
- [ ] 商品可选料 等参数/规格下单
- [x] 微信登录功能 用户信息获取
- [ ] 我的页面
- [ ] 支付系统
- [ ] 店内座位扫码下单完善
- [ ] 自提排队系统
- [ ] 后台管理系统
- [ ] 后端接口配置 权限校验完善  `uni-config-center`
- [ ] 后台管理系统
- [ ] 订单详细页面



#### 配置服务器域名白名单

- [微信文档](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html)
- [unicloud文档](https://uniapp.dcloud.io/uniCloud/quickstart?id=useinmp) `阿里云空间 `

```
https://api.bspapp.com     // 函数域名
https://bsppub.oss-cn-shanghai.aliyuncs.com   // 云存储
```



#### 初始化项目

`uniCloud-aliyun/database/`  下 `db_init.json `  及  `*.schema.json`  上传初始化

```
npm i
```



#### config.js配置

- [uni-config-center](https://uniapp.dcloud.net.cn/uniCloud/uni-config-center.html)  管理
- [uni-id](https://uniapp.dcloud.net.cn/uniCloud/uni-id.html)  所需` appid`  及 `appsecret`等参数于 `cloudfunctions\common\uni-config-center\uni-id\config.js` 配置
- WxPusher 的 `appToken`  及 `uids` 配置，详见下方 ***其他云函数说明***




#### getAccessToken

- 存储在`config`数据表 

- 调用  `cloudfunctions\getAccessToken`  云函数进行更新，accessToken 2小时有效期，刷新后5分钟缓冲期后失效。

  可在 `云控制台/云函数/函数列表/getAccessToken` ， `操作/详情/定时器触发/编辑` 配置定时cron，如每一小时定时更新。

  ```
  [
    "cron:0 0 0/1 * * ?"
  ]
  ```



##### 其他云函数说明

- `WxPusher` 

​		文档： https://github.com/wxpusher/wxpusher-client  获取 `appToken`  及 `uids`



##### 管理员账户配置

云数据库 数据表`uni-id-users` 对目标用户添加  具体查看 [uni-id文档](https://uniapp.dcloud.io/uniCloud/uni-id.html)  [#角色](https://uniapp.dcloud.io/uniCloud/uni-id.html#%E8%A7%92%E8%89%B2)  [#权限](https://uniapp.dcloud.io/uniCloud/uni-id.html#%E6%9D%83%E9%99%90)  [#相关api](https://uniapp.dcloud.io/uniCloud/uni-id.html#rbac-api)

```
"role": ["ADMIN"]
```



#### 小程序 /deep/ 修改样式未生效问题

- [微信文档](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html)  `组件样式隔离`
- [uni-app文档](https://uniapp.dcloud.io/vue-api?id=%e5%85%b6%e4%bb%96%e9%85%8d%e7%bd%ae)

```js
options: { styleIsolation: 'shared' },
```


