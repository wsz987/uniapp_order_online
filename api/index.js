const requireApi = require.context(
	//api 目录的相对路径
	'.',
	//是否查询子目录
	false,
	//查询文件的一个后缀
	/.js$/
)

let modules = {}
requireApi.keys().forEach((key, index) => {
	if (key === './index.js') return
	modules[key.replace(/(\.\/|\.js)/g, '')] = requireApi(key)['default']
})
export default modules

