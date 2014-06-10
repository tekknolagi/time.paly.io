var makeAPIRequest = function(action, params) {
    var response;

    $.ajax({
	async: false,
	data: params,
	url: '/api/' + action,
	type: 'GET',
	dataType: 'json'
    }).then(function(data) {
	response = data;
    });

    return response;
};
