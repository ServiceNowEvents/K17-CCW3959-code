/*
Copyright © 2016 ServiceNow, Inc.
 
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

/*
 * This is a re-usable module to do tasks related operations with ServiceNow instance. 
 */

module.exports = Task;

// ******************************************
// Lab 5 - Replace this function definition *
// ******************************************
function Task(snInstanceURL, accessToken, options) {
    this.snInstanceURL = snInstanceURL; 
    this.accessToken = accessToken; 
    this.options = options; 
}

// Returns the tasks assigned to user.
Task.prototype.getTasks = function (callBack) {
    var request = require('request');
    request.debug = this.options.verbose;
    request({
        baseUrl: this.snInstanceURL,
        method: 'GET',
        // This uri is a part of myTasks service.
        uri: '/api/x_snc_my_work/v1/tracker/task',
        json: true,
        // Set the cookie to authenticate the request.
      
        // ****************************************************
        // Lab 5 - Replace the three lines after this comment *
        // ****************************************************
        auth: { 
            bearer: this.accessToken 
        }

    }, function (err, response, body) {
        callBack(err, response, body);
    });
}

// Adds a comment to the task. 
Task.prototype.addComment = function (taskID, comment, callBack) {
    var request = require('request');
    request.debug = this.options.verbose;
    request({
        baseUrl: this.snInstanceURL,
        method: 'POST',
        uri: '/api/x_snc_my_work/v1/tracker/task/' + taskID + '/comment',
        json: true,
        body: {
            "comment": comment
        },
        headers: {
            'Cookie': this.snCoookie
        }
    }, function (err, response, body) {
        callBack(err, response, body);
    });
}

// Get comments from task. MyTask api does not have a method to get tasks. Here we use sys_journal api
// to get the comments from ServiceNow instance.
Task.prototype.getComments = function (taskID, callBack) {
    var request = require('request');
    request.debug = this.options.verbose;
    request({
        baseUrl: this.snInstanceURL,
        method: 'GET',
        // Use ServiceNow table API (http://wiki.servicenow.com/index.php?title=Table_API#gsc.tab=0) to get comments.
        // The ServiceNow table API users a parameter called sysparm_query to query back end data. We can use a
        // Similar approach to invoke any table API method.
        uri: 'api/now/v2/table/sys_journal_field?sysparm_query=element_id%3D' + taskID + '%5EORDERBYDESCsys_created_on',
        json: true,
        headers: {
            'Cookie': this.snCoookie
        }

    }, function (err, response, body) {
        callBack(err, response, body);
    });
}