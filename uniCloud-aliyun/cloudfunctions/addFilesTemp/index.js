'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const Temp = await db.collection('filesTemp').add({
		url:event.url,
		status:false
	})
	
	return 	{
		code:200,
		data:Temp
	}
};
