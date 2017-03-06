#Aviatio
-------

##Overview
This HTML and JavaScript example illustrates how to integrate analytics from OpenText Information Hub (iHub) 16 into a responsive, mobile web application. Two iHub APIs, the REST API, and the JavaScript API (JSAPI) retrieve data and visualizations from an iHub server. The iHub server resources used by this example are included with the source code if you want to use your own server.

This web application uses the Angular JavaScript frameworks to display HTML content in a single HTML file and build previous and next links to navigate data displayed in the web page. 

![](/Screenshots/examples.png)

## Quick Start
1. Download the source code from this site.
2. Download and install an iHub 16 server if you do not already have one.
3. In your iHub 16 file system, copy the source code files to the following locations:
 * flight delay.DATA to the folder /Resources/Data Objects/
 * Flight Performance.rptdesign to the folder /Home/Flight Delay App/
4. In the main.js file, change the following values to match your iHub 16 installation:
 * In var restHost = "localhost" replace localhost with the name of your server.
 * In var ihubHost = "localhost" replace localhost with the name of your server.
 * In username : "Administrator", replace Administrator with your user iHub 16 account name.
 * In password: ""  replace add your account password, if you have one, between the quotation marks.
5. Access the AviatioExample-aviatioMaster folder and files through your favorite web server. Web browser cross-origin security restrictions require a web server to load the files used by this web application.
6. Use a web browser to navigate to the AviatioExample-aviatioMaster folder.
7. Select a US Region from the list to view a list of state names.
8. Select a state name to view a detailed report about flight delays.

## Requirements
* HTML web server
* Web browser from a desktop or tablet-sized mobile device
* Network access to reach your iHub 16 server 
* Internet access to load 3rd party JavaScript libraries

## REST API usage
The iHub server offers many RESTful URI endpoints to access stored resources on the server. This application uses JavaScript to make the following REST API requests:
* Authenticate the user to receive an authentication ID, used in other REST API requests
* Search for the file ID of a data object
* Download a list of user selectable values from the data object
* Execute an analytic design to update data and create a report document using the selected state as a parameter value 
* Search for the file ID of the report document 
* Retrieve metadata about the report document

The main.js library builds RESTful URI requests to access resources on the iHub server. The application sends the RESTful URI request to the iHub server using services.js. The metadata collected using the REST API includes the timestamp when the report document was created. JavaScript uses this value to check if the data is older than the report_refresh_Time value, located in main.js. If the data is older the report is executed to refresh the data.

## JavaScript API usage
The iHub server supports embedding interactive visualizations in web pages using the JavaScript API (JSAPI).

JSAPI communicates with the iHub server using the authentication ID from the REST API login request. The application loads JSAPI using the jQuery method getScript, located in controller.js. The JSAPI then downloads and displays interactive analytic content such as a full page report about the selected location. 

This application uses JSAPI to complete the following tasks:
* Create an interactive viewer in a div element on the web page
* Load the report for the selected state into the interactive viewer

## Documentation
[Reporting and Information Hub APIs Programmer Guide](https://knowledge.opentext.com/knowledge/cs.dll/62044948/Reporting_and_OpenText_Information_Hub_APIs_Programmer_Guide.pdf?func=doc.Fetch&nodeid=62044948&vernum=2) 

[Forums for discussing OpenText Analytic technologies](http://developer.actuate.com/community/forum/) 

[Additional information about iHub products](http://www.opentext.com/what-we-do/create-a-better-way-to-work/opentext-analytics-suite-16) 

## Credits
This example uses the following third party libraries:
* https://angularjs.org/
* http://fonts.googleapis.com
* http://jquery.com