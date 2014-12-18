#BIRT Aviatio
-------

##Overview
This HTML and JavaScript example illustrates how to integrate BIRT iHub into a responsive, mobile web application. Two BIRT APIs, the REST API, and the JavaScript API (JSAPI) retrieve data and visualizations from a demonstration BIRT iHub 3.1 server. The iHub server resources used by this example are included with the source code if you want to use your own BIRT iHub server.

This web application uses the Angular JavaScript frameworks to display HTML content in a single HTML file and build previous and next links to navigate data displayed in the web page. A demonstration of this application is available at the following URL: http://aviatioexample.actuate.com/.

![](/Screenshots/examples.png)

## Quick Start
1. Download the source code from this site.
2. Access the AviatioExample-aviatioMaster folder and files through your favorite web server such as NanoHTTPD or Apache. Web browser cross-origin security restrictions require a web server to load the files used by this web application.
3. Use a web browser to navigate to the AviatioExample-aviatioMaster folder.
5. Select a US Region from the list to view a list of state names.
6. Select a state name to view a detailed report about flight delays.

## Requirements
* HTML web server
* Web browser from a desktop or tablet-sized mobile device
* Internet access to reach the demo BIRT iHub 3.1 server and to load external JavaScript libraries

## REST API usage
The BIRT iHub server offers many RESTful URI endpoints to access stored resources on the server. This application uses JavaScript to make the following REST API requests:
* Authenticate the user to receive an authentication ID, used in other REST API requests
* Search for the file ID of a BIRT data object
* Download a list of user selectable values from the BIRT data object
* Execute a BIRT design to update data and create a BIRT document using the selected state as a parameter value 
* Search for the file ID of the BIRT document 
* Retrieve metadata about the BIRT document

The main.js library builds RESTful URI requests to access resources on the iHub server. The application sends the RESTful URI request to the iHub server using services.js. The metadata collected using the REST API includes the timestamp when the BIRT document was created. JavaScript uses this value to check if the data is older than the report_refresh_Time value, located in main.js. If the data is older the report is executed to refresh the data.

## JavaScript API usage
The BIRT iHub server supports embedding interactive visualizations in web pages using the Actuate JavaScript API (JSAPI).

JSAPI communicates with the iHub server using the authentication ID from the REST API login request. The application loads JSAPI using the jQuery method getScript, located in controller.js. The JSAPI then downloads and displays interactive BIRT content such as a full page report about the selected location. 

This application uses JSAPI to complete the following tasks:
* Create a BIRT viewer in a div element on the web page
* Load the report for the selected state into the BIRT viewer

## Documentation
[Building Web Applications Using BIRT APIs](http://developer.actuate.com/be/documentation/ihub31-dev/WebApp/index.html) 

[Learning about REST API](http://developer.actuate.com/resources/documentation/ihub31/rest-api/) 

[Learning about JSAPI Integration](http://developer.actuate.com/resources/documentation/ihubftype/integration/) 

[Forums for discussing BIRT technologies](http://developer.actuate.com/community/forum/) 

[Additional information about integrating BIRT technology into applications](http://developer.actuate.com/deployment-center/integrating-birt-into-applications/) 

## Credits
This example uses the following third party libraries:
* https://angularjs.org/
* http://fonts.googleapis.com
* http://jquery.com
