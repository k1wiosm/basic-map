function queryOverpass (opt, callback) {
	if (!opt) { opt = {}; };
	if (!opt.timeout) { opt.timeout = 25; };
	var query = 
		'[out:json]' +
		(opt.date ? '[date:"'+opt.date+'"]' : '') +
		'[timeout:'+opt.timeout+'];'+
		opt.query;
	console.log('QUERYING: '+query);
	$.ajax({
		url: 'https://overpass-api.de/api/interpreter?data='+query,
		success:
		function (response) {
			if(response.remark!=undefined) { throw new Error("Timeout"); };
			callback(response);
		},
		timeout: opt.timeout*1000,
		error:
		function (jqXHR, status, errorThrown) {
			if (status=='timeout') { throw new Error("Timeout"); }
			else if (status=='abort') { throw new Error("Abort"); }
			else { throw new Error("Unknown"); };
		},
	});
}