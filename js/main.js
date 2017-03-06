/* Controllers */

var mainCtrl = angular.module('mainApp', []);

var restHost = "localhost";
 
var restPort = "\\:8000";
 
var visuals = "visuals";
 
var ihubHost = "localhost";
 
var ihubPort = ":8700";

var authTokenValue = "missing";

mainCtrl.constant('mainAppCtrl', {

    login: 'http://' + restHost + restPort + '/api/v2/login',

    folders: 'http://' + restHost + restPort + '/api/v2/folders',

    files: 'http://' + restHost + restPort + '/api/v2/files/:fileId',

    downloadReport: 'http://' + restHost + restPort + '/api/v2/' + 'files',

    reports: 'http://' + restHost + restPort + '/api/v2/' + visuals + '/:reportId/:outputFormat',

    reportData: 'http://' + restHost + restPort + '/api/v2/' + visuals + '/:reportId/data/:datasetname/?format=:format',

    reportBookmarks: 'http://' + restHost +restPort + '/api/v2/' + visuals + '/:reportId/bookmarks',

    reportMetadata: 'http://' + restHost + restPort + '/api/v2/files/:fileId/properties',

    reportBookmarksData: 'http://' + restHost + restPort + '/api/v2/' + visuals + '/:reportId/bookmarks/:bookmarkName',

    reportMetadataData: 'http://' + restHost + restPort + '/api/v2/dataobjects/:reportId/:datasetname',

    downloadFile: 'http://' + restHost + restPort + '/api/v2/files/:reportId/download',

    dataObject: 'http://' + restHost + restPort + '/api/v2/dataobjects/:dataObjectId',

    dataObjectElement: 'http://' + restHost + restPort + '/api/v2/dataobjects/:dataObjectId/:dataobjectElement',

    executeReport : 'http://' + restHost + restPort + '/api/v2/jobs/execute/', 

    jsapiUrl: 'http://' + ihubHost  + ihubPort +  '/iportal/jsapi',

    iportalUrl : 'http://' + ihubHost  + ihubPort +  '/iportal',

    report_refresh_Time : '15',

    idle_time : '20',

    username : "Administrator",

    password: ""   

});

document.addEventListener(
    'touchmove',
    function(e) {
        e.preventDefault();
    },
    false
);