// https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getPhoneNumber.html
// https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/phonenumber/phonenumber.getPhoneNumber.html
import request from "@/utils/request.js"
import store from '@/store'
export default function(event){
	// param: code event.detail.code 小程序需要认证
	console.log('decryptPhoneNumber',event)
	
	return
	// 旧版接口
	// const data = store.commit('user/getState',['sessionKey','encryptedData','iv'])
	// return request('getPhoneNumber',{
	// 	sessionKey,encryptedData,iv
	// })
}