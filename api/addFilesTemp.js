import request from "@/utils/request.js"
export default async function({url}){
	return request('addFilesTemp',{url})
}