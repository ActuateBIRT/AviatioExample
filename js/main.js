/* Controllers */

var mainCtrl = angular.module('mainApp', []);

var restHost = "aviatioexample.actuate.com";
 
var restPort = "\\:5000";
 
var visuals = "visuals";
 
var ihubHost = "aviatioexample.actuate.com";
 
var ihubPort = ":8700";

mainCtrl.constant('mainAppCtrl', {

    login: 'http://' + restHost + restPort + '/ihub/v1/login',

    folders: 'http://' + restHost + restPort + '/ihub/v1/folders',

    files: 'http://' + restHost + restPort + '/ihub/v1/files/:fileId',

    downloadReport: 'http://' + restHost + restPort + '/ihub/v1/' + 'files',

    reports: 'http://' + restHost + restPort + '/ihub/v1/' + visuals + '/:reportsId/:outputFormat',

    reportData: 'http://' + restHost + restPort + '/ihub/v1/' + visuals + '/:reportsId/data/:datasetname/?format=:format',

    reportBookmarks: 'http://' + restHost +restPort + '/ihub/v1/' + visuals + '/:reportsId/bookmarks',

    reportMetadata: 'http://' + restHost + restPort + '/ihub/v1/' + visuals + '/:reportsId/datasets',

    reportBookmarksData: 'http://' + restHost + restPort + '/ihub/v1/' + visuals + '/:reportsId/bookmarks/:bookmarkName',

    reportMetadataData: 'http://' + restHost + restPort + '/ihub/v1/' + visuals + '/:reportsId/datasets/:datasetname',

    downloadFile: 'http://' + restHost + restPort + '/ihub/v1/' + visuals + '/:reportsId/download',

    dataObject: 'http://' + restHost + restPort + '/ihub/v1/dataobject/:dataObjectId',

    dataObjectElement: 'http://' + restHost + restPort + '/ihub/v1/dataobject/:dataObjectId/:dataobjectElement',

    executeReport : 'http://' + restHost + restPort + '/ihub/v1/' + visuals + '/:reportsId/execute', 

    jsapiUrl: 'http://' + ihubHost  + ihubPort +  '/iportal/jsapi',

    iportalUrl : 'http://' + ihubHost  + ihubPort +  '/iportal',

    report_refresh_Time : '15',

    idle_time : '20',

    username : "flightdemo",

    password: "Demo1234"   

});

document.addEventListener(
    'touchmove',
    function(e) {
        e.preventDefault();
    },
    false
);