angular.module('baymax.chart', [

])

.factory('ChartService', function() {

	var chartService = {};

	chartService.createLineChart = function(title, data, headerCol, rowCol) {
		var chartObject = {};
		chartObject.data = {
			"cols": [{
				id: "t",
				label: "Visit Date",
				type: "string"
			}, {
				id: "s",
				label: "value",
				type: "number"
			}],
			"rows": []
		};

		angular.forEach(data[rowCol].data, function(value, index) {
			chartObject.data.rows.push({
				c: [{
					v: data[headerCol].data[index]
				}, {
					v: data[rowCol].data[index][0]
				}]
			});
		});

		chartObject.type = 'LineChart';
		chartObject.options = {
			legend: {
				position: 'none'
			},
			width: 500,
			height: 240
		};
		return chartObject;
	};

	return chartService;

})

;
