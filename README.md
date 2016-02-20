# R0HPX
A easy lightweight static webserver designed for static sinkhole backends

###what is R0HPX?
R0HPX is a small program I wrote to watch sinkholed connections interactively from people within the local network and to work as a static backend to show users a website why it was blocked.

###how does it work?
in order to let this program run you need to install NodeJS, after that when you started R0HPX by using ```node main.js```, you can choose between 3 modus:

- malware
- advertise
- redirections

once you have choosed one of the options, a web server will run on port 80 and 443 with a static website, this static website is actually the site people would see when the dns redirects to this server.

###what does it not?
R0HPX does not sinkhole from it self, that means it is required to build your own dns sinkhole where the zones redirect to the servers you wish to host with R0HPX.

###future plans?
- I'm planning to add support for ssl, currently the ssl server has no certificate so it will not work perfectly