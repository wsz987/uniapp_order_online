### 预览

<img src="https://github.com/wsz987/uniapp_order_online/blob/main/static/preview/home.png?raw=true" alt="home.png" style="zoom:50%;" /><img src="https://github.com/wsz987/uniapp_order_online/blob/main/static/preview/menu.png?raw=true" alt="menu.png" style="zoom:50%;" /><img src="https://github.com/wsz987/uniapp_order_online/blob/main/static/preview/cart.png?raw=true" alt="cart.png" style="zoom:50%;" /><img src="https://github.com/wsz987/uniapp_order_online/blob/main/static/preview/order.png?raw=true" alt="order.png" style="zoom:50%;" /><img src="https://github.com/wsz987/uniapp_order_online/blob/main/static/preview/mine.png?raw=true" alt="mine.png" style="zoom:50%;" /><img src="https://github.com/wsz987/uniapp_order_online/blob/main/static/preview/login.png?raw=true" alt="login.png" style="zoom:50%;" />

#### 待解决/bug

- **小程序端 菜单页面商品列表 玄学 不渲染**    solt问题 疑似uni问题

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
npm install uview-ui 
or
npm i
```



#### config.js配置

- [uni-config-center](https://uniapp.dcloud.net.cn/uniCloud/uni-config-center.html)  管理
- [uni-id](https://uniapp.dcloud.net.cn/uniCloud/uni-id.html)  所需` appid`  及 `appsecret`等参数于 `cloudfunctions\common\uni-config-center\uni-id\config.js` 配置


#### getAccessToken

- 存储在`config`数据表 

- 调用  `cloudfunctions\getAccessToken`  云函数进行更新，accessToken 2小时有效期，刷新后5分钟缓冲期后失效。

  可在 `云控制台/云函数/函数列表/getAccessToken` ， `操作/详情/定时器触发/编辑` 配置定时cron，如每一小时定时更新。

  ```
  [
    "cron:0 0 0/1 * * ?"
  ]
  ```



#### 小程序 /deep/ 修改样式未生效问题

- [微信文档](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html)  `组件样式隔离`
- [uni-app文档](https://uniapp.dcloud.io/vue-api?id=%e5%85%b6%e4%bb%96%e9%85%8d%e7%bd%ae)

```js
options: { styleIsolation: 'shared' },
```



# uni-simple-router

- [插件市场](https://ext.dcloud.net.cn/plugin?id=578)
- [官方文档](https://hhyang.cn/v2/start/quickstart.html)

