Pd to image as a service
==========================

This web service renders Pd patches to SVG images, using [pd-fileutils](https://github.com/sebpiq/pd-fileutils).

For any patch hosted online, you can generate an image accessible at a fixed url, and post that url on any forum, website, ...

Simply use `https://enzienaudio.com/a/dave?fetch=<patchUrl>` replace `<patchUrl>` with the url of the patch you want to generate an image from.

For example, here is a Pd patch hosted on a github repository https://raw.githubusercontent.com/mhroth/ZenGarden/master/test/MessageInteger.pd , the SVG rendered from that patch can be found there  https://enzienaudio.com/a/dave?fetch=https://raw.githubusercontent.com/mhroth/ZenGarden/master/test/MessageInteger.pd .


Deploying your own instance
=============================

API
-----

There is only one url `/render?fetch=<patchUrl>` . Calling it will fetch the pd file at `patchUrl`, and render a SVG image of that patch.


Deploying
----------

To run the server, you need `node.js` and `npm`.

First clone the repository, then from the root of the folder, run `npm install` to install dependencies. To start the server, run `node backend/main.js`. Configuration, such as port on which the server is listening is available at `backend/config.js`.

To daemonize, you can use for example [node-forever](https://github.com/foreverjs/forever). Here is a sample command for this `forever start -a -l /path/to/log/file.log backend/main.js`.
