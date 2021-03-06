'use strict';

//jshint expr: true

var chai 	= require('chai');
var sinon 	= require('sinon');
var ifNode2 = require("./interface/ifNode2");

var	expect  = chai.expect();
var node2 = new ifNode2( ); 

chai.should();

describe('driver test', function() {
	var schedule;
	var update_result;
	beforeEach(function() {
		schedule =	[ { available: 1437358484276,
					       did: '20',
					       location: '43.6664587,-79.37461960000002',
					       off: 1437364740000,
					       tids : [ "0,0,43.6664587,-79.37461960000002,1437363947841", "0,0,43.6664587,-79.37461960000002,1437363990886", "0,0,43.6664587,-79.37461960000002,1437364041253", "43.6664587,-79.37461960000002,43.6642804,-79.37261960000001,1437363947843", "43.6664587,-79.37461960000002,43.7022076,-79.44123739999998,1437364041253", "43.6664587,-79.37461960000002,43.5895049,-79.64793850000001,1437363990886" ],
					       updated: 0 },
					     { available: 1437358582729,
					       did: '24',
					       location: '43.6664587,-79.37461960000002',
					       off: 1437364740000,
					       tids : [ "0,0,43.6664587,-79.37461960000002,1437364095413", "43.6664587,-79.37461960000002,43.7117051,-79.2718888,1437364095413" ],
					       updated: 1 } ];
		update_result = {
			updateResult : function(ia_data) {
				node2.updateResult(ia_data)
			}
		} 
	});
	it('should get driver',function() {
		return node2.getTable('Driver').then(function(result) {
			console.log(result);
		})
			
	})
})