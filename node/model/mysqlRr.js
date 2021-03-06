var moment = require('moment');
var Promise = require('bluebird');
var modelAddress = require("./../model/mysqlAddress");

function Rr(ir_pool) { 
    var rr = this;
    
	this.create = function(iv_uid, iv_aid, iv_area, iv_created) { 
        return new Promise(function (resolve, reject) {
            var lv_uid = iv_uid;
            var lv_aid = iv_aid;
            var lv_area = iv_area;
            var lv_status = 0;
            var lv_created = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

            var sql_insert_rr = "INSERT INTO rr SET ?"; 
            var parameter_insert_rr = {};
            parameter_insert_rr.uid = lv_uid;
            parameter_insert_rr.aid = lv_aid;
            parameter_insert_rr.area = lv_area;
            parameter_insert_rr.status = lv_status;
            parameter_insert_rr.created = lv_created;      

            ir_pool.queryAsync(sql_insert_rr, parameter_insert_rr).spread( function (result) {
               resolve(0);
            }).catch(function(e) {
                reject(e);
            });
        });
    }; 
    
    
    this.findOne = function( iv_uid ) {
        return new Promise(function (resolve, reject) {
            var sql_select_rr = "SELECT * FROM ?? WHERE ?? = ? LIMIT 1";
            var parameter_select_rr = ['rr', 'uid', iv_uid];
            
            ir_pool.queryAsync(sql_select_rr, parameter_select_rr).then( function (rows, columns, fields) {
                        
                if (rows[0] != null) {
                    resolve( rows[0][0] );
                } else {
                    reject('No result');
                }
            }).catch(function(e) {
                reject(e);
            }); 
        });
    };
    
    this.getLatLng = function( iv_uid ) {
        return new Promise(function (resolve, reject) {
            
            rr.findOne( iv_uid ).then( function(lo_rr) {
                    console.log(lo_rr.aid);
                    var lm_address = new modelAddress(ir_pool);
                    lm_address.findOne( lo_rr.aid ).then( function(rr_address_result) {
                        resolve({ lat:rr_address_result.lat , lng: rr_address_result.lng});

                    }).catch( function(e) {
                        reject(e);
                    });
                    
            }).catch(function(e) {
                reject(e);
            }); 
        });
    }; 
    
    this.findStartEnd = function( iv_uid ) {
        return new Promise(function (resolve, reject) {
            
            this.findOne( iv_uid ).then( function(lo_rr) {
                    var lm_address = new modelAddress(ir_pool);
                    lm_address.findOne( lo_rr.aid ).then( function(rr_address_result) {

                        resolve({ start_lat:rr_address_result.lat , end_lat: rr_address_result.lng, 
                                        start_lat: rr_address_result.lat, end_lng: rr_address_result.lng});

                    }).catch( function(e) {
                        reject(e);
                    });
                    
            }).catch(function(e) {
                reject(e);
            }); 
        });
    };       
    
	this.change = function(iv_uid, iv_aid, iv_area) { 
		var lv_uid = iv_uid;
        var lv_aid = iv_aid;
        var lv_area = iv_area;
        
        var sql_select_rr = "SELECT * FROM ?? WHERE ?? = ? LIMIT 1";
        var parameter_select_rr = ['driver', 'driver', lv_driver];
 
        ir_pool.queryAsync(sql_select_rr, parameter_select_rr).spread( function (rows, columns) {
            if (rows[0] != null) {
                var sql_update_rr = "UPDATE user SET ? WHERE ?? = ? ";
                var value_update_rr = { };     
                if (lv_ffurl != null) value_update_rr.ffurl = lv_ffurl;
                var parameter_update_rr  = [value_update_rr, 'type', iv_type, 'value', iv_value];
               
                ir_pool.queryAsync(sql_update_rr, parameter_update_rr).spread( function (result) {
                    console.log('changed ' + result.changedRows + ' rows');   
                }).catch(function(e) {
                    console.log("Exception " + e);
                }); 
            }
        }).catch(function(e) {
            console.log("Exception " + e);
        });
    }; 	  	
}; 

module.exports = Rr;
