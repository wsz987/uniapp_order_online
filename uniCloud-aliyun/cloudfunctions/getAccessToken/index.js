'use strict';
const openapi = require('mp-cloud-openapi')
const createConfig = require('uni-config-center')

const db = uniCloud.database()
const uniIDConfig = createConfig({
    pluginId: 'uni-id'
})
const {appid,appsecret} = uniIDConfig.config('mp-weixin.oauth.weixin')
const openapiWeixin = openapi.initWeixin({
	appId: appid,
	secret: appsecret
})


exports.main = async (event, context) => {
	const {
		accessToken,
		expiresIn
	} = await openapiWeixin.auth.getAccessToken()
	const res = await db.collection('config').get()
	let time = new Date().getTime()
	await db.collection('config').where({
		key: "accessToken"
	}).update({
		value:accessToken,
		time,
		date: getDate(time)
	})

	function getDate(data) {
		let date = new Date(data)
		let y = date.getFullYear()
		let m = date.getMonth() + 1
		m = m < 10 ? ('0' + m) : m
		let d = date.getDate()
		d = d < 10 ? ('0' + d) : d
		let currentdate = y + '-' + m + '-' + d;
		let hh = date.getHours()+8
		hh = hh < 10 ? ('0' + hh) : hh
		let mm = date.getMinutes()
		mm = mm < 10 ? ('0' + mm) : mm
		let ss = date.getSeconds()
		ss = ss < 10 ? ('0' + ss) : ss
		let time = hh + ':' + mm + ':' + ss;
		return currentdate + " " + time
	}


	// //返回数据给客户端
	return {
		code: 200,
		accessToken,
		expiresIn
	}
};
