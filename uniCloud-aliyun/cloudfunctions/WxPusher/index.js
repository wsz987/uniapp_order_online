'use strict';
// https://wxpusher.zjiecode.com/docs/#/?id=http%e6%8e%a5%e5%8f%a3%e8%af%b4%e6%98%8e
const db = uniCloud.database()
const createConfig = require('uni-config-center')
const userUtilsConfig = createConfig({
    pluginId: 'wx-pusher'
})
exports.main = async (event, context) => {
	const {data:goods_types} = await db.collection('goods_types').get()
	const {info,data,position} = event
	console.log("event",event);
	const apiUrl = 'http://wxpusher.zjiecode.com/api/send/message'
	
	const form = goods_types.map(type=>{
		const result = data.filter(({goods_type_id})=>goods_type_id ==type.goods_type_id)
		type['count'] = result.length
		type['data'] = result
		return type
	})
	let tds = ''
	for (let item of form) {
		if(!item.count) continue
		let goods = '',count=''
		for (let good of item.data) {
			goods +=`<p>${good.goods_name}</p>`
			count +=`<p>${good.count}</p>`
		}
		tds +=`<tr>
		<td>${item.goods_type_name}</td>
		<td>${goods}</td>
		<td>${count}</td>
		</tr>`
	}
	
	const Template = `
	<body>
	<h4>联系手机号：${info.phone}</h4>
	<h4>餐桌号：${position}</h4>
	<h5>备注：${info.remarks}</h5>
	<table border="1">
	<tr><th>分类</th><th>名称</th><th>数量</th></tr>
	${tds}
	</table>
	</body>`
	const res = await uniCloud.httpclient.request(apiUrl, {
		method: 'POST',
		data: {
			"appToken": userUtilsConfig.config("appToken"),
			"content": Template,
			"summary": `新订单提醒\n时间：${info.date}`, //消息摘要，显示在微信聊天页面或者模版消息卡片上，限制长度100，可以不传，不传默认截取content前面的内容。
			"contentType": 2, //内容类型 1表示文字  2表示html(只发送body标签内部的数据即可，不包括body标签) 3表示markdown 
			"uids": [ //发送目标的UID，是一个数组。注意uids和topicIds可以同时填写，也可以只填写一个。
				...userUtilsConfig.config("uids")
			]
		},
		contentType: 'json',
		dataType: 'json'
	})
	return event
};
