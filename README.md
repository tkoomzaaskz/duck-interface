The Wealthy Laughing Duck Project
---------------------------------

This repository is a [duck component](https://github.com/wealthy-laughing-duck).
Visit [Wealthy Laughing Duck Project](http://wealthy-laughing-duck.github.io/) for more information.

Modern Web Application
======================

This duck component is a client-side (browser) application, written mainly
in JavaScript (additionally, using lots of modern tools, such as Backbone).
It consumes a RESTful API to fetch duck data and allows end-user to access
them easily.

Installation
============

All dependencies can be installed using [bower](http://bower.io) by running
the following:

    $ bower install

and that's it.

Data Sources
============

The interface consumes:
 * [Django API](https://github.com/wealthy-laughing-duck/duck-api-rip)
 * Fake Server, based on [sinon.js](https://github.com/cjohansen/Sinon.JS), to make development independent on external APIs
 * [static JSON files](public/data)

This can be configured by changing the URL of the API (the data source).

ToDos
=====

The interface still has major tasks to be done, check [todos list](TODO.md).
