# Kaltura Client Analytics 2.0 (aka kAnalony project) 
This project is the new client analytics project of Kaltura. 

With kAnalony project, Kaltura real time analytics for live and on-demand video, you'll get historical or near real-time, raw or summarized data Kaltura partners need to truly understand how, when, and where their content is seen and shared by viewers. What keeps viewers watching? When do they lose interest? What do they share? Actionable Analytics ends the guesswork. 

With the clear numbers in hand, Kaltura’s partner can build a content and monetization strategy that really works.

> To make it work with real data, you will need to setup the [server analytics project](https://github.com/kaltura/kanalony).  

## Getting Started

To run kAnalony project on your machine,first make sure you setup your machine correctly.

> Before continuing make sure you have [node.js](https://nodejs.org/en/) installed on your machine.

Install both bower and grunt-cli globally (note the -g flag)

```bash
$ npm install -g bower grunt-cli 
```

In the repository folder install node modules
```
$ npm install 
```

Make sure bower libraries are installed
```
$ bower install
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
$ grunt serve
```

This command will browserify your project and open a browser with your site. Whenever you change an html of javascript file the site will be loaded automatically.

If you get any errors during the process just follow the [FAQ](##faq) section.

## Technical information
kAnalony application is based on many third party libraries. You can review the full list in the wiki (TBD). 

## FAQ

**Why am I getting jshint errors when running grunt tasks?**

Every grant task runs checks against the javascript files to make sure there aren't any syntax issues. 
There is no way to bypass them, you should fix them in order to continue. 
That being said, you can use the _--force_ flag to temoprary force the process to continue but I strongly advice you not doing so because it might affect other failures.


## License and Copyright Information
   
TBD
