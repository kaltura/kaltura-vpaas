# Kaltura Usage Dashboard (VPaas) 


learn more [here](https://vpaas.kaltura.com/)

## Getting Started

To run vpaas project on your machine, first make sure you setup your machine correctly.

> Before continuing make sure you have [node.js](https://nodejs.org/en/) installed on your machine.

Install grunt-cli globally (note the -g flag)

```bash
$ npm install -g grunt-cli 
```

In the repository folder install node modules
```
$ npm install 
```

You also required to have [Ruby](https://www.ruby-lang.org/en/downloads/) and [Sass](http://sass-lang.com/install) installed. If you're on OS X or Linux you probably already have Ruby installed; test with the following command in your terminal. 

```
$ ruby -v
```
 
When you've confirmed you have Ruby installed, continue installing the Sass engine.

 ``` 
 $ gem install sass
 ```


**You are ready!** to open the application in the browser continue reading section '[usage section](##usage)'.

## Usage
This project is using grunt to run develop & packaging tasks.
 
 > Make sure you [setup your machine](##getting-started) before continuing.

To start working on the project, use the 'serve' grunt task as followed:

```
$ npm start
```

This command will browserify your project and open a browser with your site. Whenever you change an html of javascript file the site will be loaded automatically.

If you get any errors during the process just follow the [FAQ](##faq) section.

### Run the application as standalone

You will need to provide a valid KS. you can provide it by passing a query string named 'ks' with a valid value. Note that we use in this application the # notion in the url so you will need to add the query string **before this notation**, for example:

```
http://localhost:9003/index.html?ks=the_ks_value
```


### Packaging the application for deployment
When you are ready to deploy your application run one of the following.

To build the project and create a zip file run the following command.

```
$ npm run build
```
You will then have:

- folder **'dist'** will include the deployed application
- folder **'.tmp'** will include a zip file ready for deployment

If you want to test your packaged application in a browser first run the following command:

```
$ grunt serve:prod
```

## FAQ

**Why am I getting jshint errors when running grunt tasks?**

Every grant task runs checks against the javascript files to make sure there aren't any syntax issues. 
There is no way to bypass them, you should fix them in order to continue. 
That being said, you can use the _--force_ flag to temoprary force the process to continue but I strongly advice you not doing so because it might affect other failures.



# License and Copyright Information
All code in this project is released under the [AGPLv3 license](http://www.gnu.org/licenses/agpl-3.0.html) unless a different license for a particular library is specified in the applicable library path.   

Copyright © Kaltura Inc. All rights reserved.   
Authors and contributors: See [GitHub contributors list](https://github.com/kaltura/kanalony-front-end/graphs/contributors).  

### Open Source Libraries
Review the [list of Open Source 3rd party libraries](open-source-libraries.md) used in this project.
