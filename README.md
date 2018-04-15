## Problem Statement

Create a node server which responds to one and only one route : GET /I/want/title
This route expects a list of websites addresses in query string format e.g.

/I/want/title/?address=google.com
etc.

The number of addresses can be more than one.

The route will make request to each of the address passed to it. It will parse out the <title></title> tags, render them in html and send back the html in response. e.g. the response to above #3 example would be:

<html>
<head></head>
<body>

    <h1> Following are the titles of given websites: </h1>

    <ul>
       <li> google.com - "Google" </li>
       <li> www.dawn.com/events/ - "Events - DAWN.COM" </li>
    </ul>
</body>
</html>
For all other routes, the server should return HTTP code 404 .


## Install
To install the dependencies:

    npm install

For error related to express (Cannot find module 'express'):

    npm install express


## Start Server
To start the server:

    npm start

## Example
Run following example commands for each of the questions:<br>

    http://localhost:8081/task-1/I/want/title/?address=www.google.com.pk
    http://localhost:808/task-1/I/want/title/?address=www.dawn.com/events




