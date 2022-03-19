'use strict';

// 旧版api 新的详细看文档
// https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getPhoneNumber.html
// https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/phonenumber/phonenumber.getPhoneNumber.html
const db = uniCloud.database()
const WXBizDataCrypt = require('./WXBizDataCrypt')
const createConfig = require('uni-config-center')
const uniIDConfig = createConfig({
    pluginId: 'uni-id'
})
const {appid} = uniIDConfig.config('mp-weixin.oauth.weixin')

exports.main = async (event, context) => {
	const ACCESS_TOKEN = (await db.collection('config').where({
		key: 'accessToken'
	}).get()).data[0].value
	const apiUrl = `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${ACCESS_TOKEN}`
	const res = await uniCloud.httpclient.request(apiUrl, {
	    method: 'POST',
	    data: {
	      code: event.code
	    },
	    contentType: 'json', // 指定以application/json发送data内的数据
	    dataType: 'json' // 指定返回值为json格式，自动进行parse
	  })
	console.log('getuserphonenumber',res)
	
	return {
		code:200
	}
	// 以下旧api
	const {sessionKey,encryptedData,iv} =event
	const pc = new WXBizDataCrypt(appid, sessionKey)
	const data = pc.decryptData(encryptedData , iv)
	
	return {
		code:200,
		data:data.phoneNumber,
		msg:'破译成功'
	}
};

