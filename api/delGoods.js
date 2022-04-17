import request from "@/utils/request.js"
export default function(_id){
	return request('delGoods',({_id}))
}