# Climate Change Explorer

Graduate Project for Software Engineering, CS510
Central Connecticut State University
Version 1.0
Last updated: 12/6/2018

## Authors
* Ga Young Lee [Email](gayounglee@my.ccsu.edu)
* Benjamin Marshalkowski [Email](mailto:benjamin.marshalkowski@my.ccsu.edu)
* Daniel Rollins [Email](mailto:dan@sdcsol.com)

## What is it?
The Climate Change Explorer is a browser-based application 
that allows users to select a location via a Google Map interface 
and view historical temperature data going back as far as 1890, 
showing any trends in temperature and climate change.

Additional features including temperature scale options (F or C), 
and viewing all available weather stations.

## How to use it:

1. Install Node.js on your computer.
2. Download this repo.
3. Open the folder with the downloaded repo with a terminal and
    type the command "npm install".
4. In the index.html file (inside public/html/), you'll need to add your GoogleMaps API key (see file comments)
5. If you want to use the existing weather database credentials, you may need to have your IP whitelisted (see 'index.js' for more details)
6. After all the packages are done installing, enter the command
    "node index.js". You should then be informed that the app is running
    on port 3000
7. In an internet browser, go to http://localhost:3000/
8. Click on "Let's Get Started!", click on a location on the google map, select one of the
        weather stations that show up in the resulting dialog, and then click on "Proceed".
9. After a few seconds, a line graph showing temperature data for the location
    will appear.