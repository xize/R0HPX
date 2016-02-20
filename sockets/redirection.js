var fs = require('fs');
var logger = require('../logger');
var list = [];

function handle(request, response) {
	switch(request.url) {
		case '/style.css':
			response.writeHead(200, {'Content-Type': 'text/css'});
			var css = fs.readFileSync('./sockets/static/style.css');
			response.write(css);
			response.end();
			break;
		case '/jquery-1.11.3.min.js':
			response.writeHead(200, {'Content-Type': 'text/javascript'});
			var js = fs.readFileSync('./sockets/static/jquery-1.11.3.min.js');
			response.write(js);
			response.end();
			break;
		case '/menuJS.js':
			response.writeHead(200, {'Content-Type': 'text/javascript'});
			var js2 = fs.readFileSync('./sockets/static/menuJS.js');
			response.write(js2);
			response.end();
			break;
		default:
			var found = false;
			for(var i = 0; i < list.length; i++) {
				var data = list[i].toLowerCase().split(";");
				var redirectdata = data[0].split("->");
				var time = data[1];
				var site = redirectdata[0];
				var redirect = redirectdata[1];
				if(site === request.headers.host.toLowerCase()) {
					found = true;
					logger.log(".::[system runs on redirection mode]::.");
					logger.log("client "+request.connection.remoteAddress+" visited "+request.headers.host+request.url+" and has been redirected to " + redirect);
					response.writeHead(200, {'Content-Type': 'text/html'});
					response.write(
							"<meta charset=\"UTF-8\">\n\r" +
							"<meta http-equiv=\"refresh\" content=\""+time+"; url=http://"+redirect+"\"/\">" +
							"<html>\n\r" +
							"	<head>\n\r" +
							"		<title>"+ request.headers.host +" | R0HPX.sinkhole</title>\n\r" +
							"		<link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\"/>\n\r" +
							"		<script type=\"text/javascript\" src=\"jquery-1.11.3.min.js\"></script>\n\r" +
							"		<script type=\"text/javascript\" src=\"menuJS.js\"/></script>\n\r" +
							"	</head>\n\r" +
							"	<body>\n\r" +
							"	<div id=\"container\"/>\n\r" +
							"		<div id=\"bar\"/></div>\n\r" +
							"		<div id=\"logo\"/>\n\r" +
							"			<div id=\"ltext\"/>R0HPX</div>\n\r" +
							"			<div id=\"lslogan\"/>sinkhole services</div>\n\r" +
							"		</div>\n\r" +
							"		<ul>\n\r" +
							"			<li><a href=\"http://R0HPX.sinkhole\"/>home</a></li>\n\r" +
							"			<li><a href=\"http://R0HPX.sinkhole/about\"/>about</a></li>\n\r" +
							"			<li><a href=\"http://R0HPX.sinkhole/contact\"/>contact</a></li>\n\r" +
							"		</ul>\n\r" +
							"		<!-- clear componment alignment between navigation and content, right conflicts with left. -->\n\r" +
							"		<div style=\"clear:both\"/></div>\n\r" +
							"		<div id=\"content\"/>\n\r" +
							"			<h1>Redirection: possible typo, wrong website!</h1>\n\r" +
							"			<p>you see this page because your computer likely tried to access a website which has a likely name!</p>\n\r" +
							"			<p>however most malicious websites target people on typos, this typo was detected by our system and now redirects you to the correct website!</p>\n\r" +
							"			<p>site retrieved: <b>" + request.headers.host+request.url + "</b> redirects now to: <b>" + redirect + "</b> in "+time+" seconds...</p>\n\r" +
							"		</div>\n\r" +
							"		<div id=\"copyright\"/>&copy; <b>R0HPX.sinkhole</b> 2015-2020 all rights reserved</div>\n\r" +
							"		<div id=\"bar\"/></div>\n\r" +
							"	</div>\n\r" +
							"</body>\n\r" +
							"</html>\n\r"
					);
					response.end();
					break;
				}
			}
		if(!found) {
			logger.log(".::[system runs on redirection mode]::.");
			logger.log("client "+request.connection.remoteAddress+" visited "+request.headers.host+request.url+" and site is not redirected!");
			response.end();
		}
	}
}

function fetchRedirectionList() {
	logger.log("fetching redirection list...");
	fs.readFile("redirections.zone", 'utf8', function(err, data) {
		if (err) {console.log(err);}
		list = data.split("\n");
		logger.log("done fetching redirection list!");
	});
}

exports.handle = handle;
exports.fetchRedirectionList = fetchRedirectionList;