var commandexec = process.openStdin();
var logger = require("./logger");

var http = require('http');
var https = require('https');

var fs = require('fs');

var option = '';
var server = null;
var sslserver = null;

var malware = require('./sockets/malware').handle;
var advertise = require('./sockets/advertise').handle;
var redman = require('./sockets/redirection');
var redirection = require('./sockets/redirection').handle;

function isSSL() {
	if(fs.existsSync('cert/server.key') && fs.existsSync('cert/server.crt') && fs.existsSync('cert/server.csr')) {
		return true;
	}
	return false;
}

function reset() {
	if(server !== null) {
		logger.log("disabling previous " + option + " socket!");
		server.close();
		sslserver.close();
		server = null;
		sslserver = null;
		logger.log("socket has been successfully closed!");
	}
}

function setServer(a, o) {
	option = o;
	server = http.createServer(a);
	server.listen(80, function() {
		logger.log("setting static place holder for "+o+", started webserver at port %s!", 80);
	});
	if(isSSL()) {
		var keys = {
			key : fs.readFileSync('cert/server.key'),
			cert : fs.readFileSync('cert/server.crt')
		};
		sslserver = https.createServer(keys, a);
		sslserver.listen(443, function() {
			logger.log("setting static place holder for "+o+", started webserver at port %s!", 443);
		});	
	} else {
		logger.log("cannot start ssl webserver, in order to let the server work please follow the following instructions:");
		logger.log("**NOTE**");
		logger.log("all files belong into the /cert/ folder!");
		logger.log("(1 create private RSA key: openssl genrsa -des3 -out server.key 2048");
		logger.log("(2 remove password phrase from key because webservers are ment to be public: openssl rsa -in server.key -out server.key");
		logger.log("(3 create self signing certificate: openssl req -new -key server.key -out server.csr");
		logger.log("(4 sign the certificate: openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt");
	}
}

commandexec.addListener("data", function(d) {
	var args = d.toString().trim().toLowerCase().split(" ");
	if(args.length === 1) {
		if(args[0].toLowerCase() === 'mode') {
			logger.log("this command is not valid did you mean?:");
			logger.log("syntax: mode malware, syntax: mode advertise, syntax: redirector");
		} else if(args[0].toLowerCase() === 'reload') {
			if(option === 'redirection') {
				logger.log("reloading the server!");
				redman.fetchRedirectionList();
				logger.log("reload done!");
			} else {
				logger.log("reload only works when the server is set on redirection mode!");
			}
		} else if(args[0].toLowerCase() === 'stop') {
			logger.log("stopping server!");
			process.exit();
		} else if(args[0].toLowerCase() === 'help') {
			logger.log("--[ help ]--");
			logger.log("current modus: " + (option === '' ? "no active mode set" : option));
			logger.log("help - shows help");
			logger.log("mode <argument> - sets the server type, currently you can choose between malware, advertise and redirector");
			logger.log("reload - reloads the server, currently only works when redirector mode is enabled");
			logger.log("stop - stops the server");
		} else {
			logger.log("invalid command!: "+args.toString().replace(",", " "));
		}
	} else if(args.length === 2) {
		if(args[0].toLowerCase() === 'mode') {
			if(args[1].toLowerCase() === 'malware') {
				if(server !== null) {
					reset();
				}
				setServer(malware, "malware");
			} else if(args[1].toLowerCase() === 'advertise') {
				if(server !== null) {
					reset();
				}
				setServer(advertise, "advertise");
			} else if(args[1].toLowerCase() === 'redirector') {
				if(server !== null) {
					reset();
				}
				redman.fetchRedirectionList();
				setServer(redirection, "redirection");
			} else {
				logger.log("invalid mode!: "+args.toString().replace(",", " "));
			}
		} else {
			logger.log("invalid command!: "+args.toString().replace(",", " "));
		}
	} else {
		logger.log("command length is to long!: "+args.toString().replace(",", " "));
	}
});

logger.log("R0HPX version %s", "2.1");
logger.log("please choose what mode the program has to run under:");
logger.log("- mode malware");
logger.log("- mode advertise");
logger.log("- mode redirector");