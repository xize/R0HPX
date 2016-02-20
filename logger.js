function log(a, b) {
	if(typeof b === 'undefined') {
		b = ''; //since overloading functions doesn't work, check on null and instance it with empty string to fix (undefined text)
	}
	return console.log("\033[32m[Info]:\033[37m "+a.toString().trim()+"\033[0m", b);
}

exports.log = log;
exports.log = log;