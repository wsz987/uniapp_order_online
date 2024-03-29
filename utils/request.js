import handleCode from "@/utils/handleCode"
import { isLogin,responseCode } from '@/utils/validate'
export default function(url,data={}) {
	// isLogin()
	return new Promise((reslove,reject) => {
		uniCloud.callFunction({
		    name: url,
		    data,
		    success:({result:response}) =>{
				const {code,data,msg} = response
				// console.log('API:<',url,'> code:',code,' msg:',msg,'data:',data)
				console.group(`response api [ ${url}] `)
				console.log('>>> code:', code)
				console.log('>>> msg:', msg)
				console.log('>>> data:', data)
				console.groupEnd()
				code !== 200 && uni.showToast({
					title: msg ? msg : 'api fail',
					icon:'none',
					duration: 2000
				}) && responseCode(data?.code)
				// isLogin(data.code)
				//&& reject('api fail')
				code == 200 && msg && uni.showToast({
					title: msg,
					duration: 1500
				})
				reslove(data)
			},
		    fail:err =>{
				reject('http:',err)
			},
		    complete(){
				uni.hideLoading()
			}
		});
	})
}