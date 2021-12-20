#### 待解决/bug

- **小程序端 菜单页面商品列表不渲染**

- 菜单商品获取写入vuex  解决购物车数据需点击tabBar 菜单页面才能同步问题

  

#### 待立项	

- 主页
- 商品搜索
- 购物车可选择商品支付
- 商品详情页面
- 商品可选料 等参数/规格下单
- 微信登录功能 用户信息获取
- 我的页面
- 支付系统
- 店内座位扫码下单完善
- 自提排队系统
- 后台管理系统
- 后端接口配置 权限校验完善  `uni-config-center`
- 后台管理系统



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



#### 小程序 /deep/ 修改样式未生效问题

- [微信文档](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html)  `组件样式隔离`
- [uni-app文档](https://uniapp.dcloud.io/vue-api?id=%e5%85%b6%e4%bb%96%e9%85%8d%e7%bd%ae)

```js
options: { styleIsolation: 'shared' },
```

