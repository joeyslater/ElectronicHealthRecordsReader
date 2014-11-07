# Medical Guru (Name Pending)

## How to build:
  1. First, make sure you have the following tools install on to your computer:
    1. Node - http://nodejs.org/
    2. Yeoman - http://yeoman.io/
    3. Bower - http://bower.io/
    4. Grunt - http://gruntjs.com/ 
  2. Make sure to pull the folders from the git repo. 
  3. In the `gui` folder, run via command line `npm install -g grunt-cli bower` to be able to use Grunt/Bower commands.  
  4. Then run `bower install` to make sure all the necessary third-party modules are properly installed.
  5. After running `grunt serve`, copy the files from within the `gui/target/` folder into the `web/static` folder.  Make sure to run the `WTMBackend` python application via Google App Engine Launcher. You will be able to set up the exact port to which the application will be hosted on.
    1. You must run the AngularJS application from within the same domain as the backend, else you will recieve a cross domain error when the front application attempts to make HTTP requests to the backend. 
  6. Go to the port specified, the app should be running successfully.  
