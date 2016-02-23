function log(a, b) {
	if(typeof b === 'undefined') {
		b = ''; //since overloading functions doesn't work, check on null and instance it with empty string to fix (undefined text)
	}
	var time = formatDate("%D-%M-%Y %h:%m:%s", new Date());
	return console.log(time + " \033[32m[Info]:\033[37m "+a.toString().trim()+"\033[0m", b);
}

function formatDate(format, date) {
	var time = date.toString().split(" ");
	return format.replace(/%[DMYhms]/g, function(d) {
		switch(d) {
		case '%D': d = time[2]; break;
		case '%M': d = convertMonth(time[1]); break;
		case '%Y': d = time[3]; break;
		case '%h': d = time[4].split(":")[0]; break;
		case '%m': d = time[4].split(":")[1]; break;
		case '%s': d = time[4].split(":")[2]; break;
		}
		return d;
	});
}

function convertMonth(m) {
	switch(m) {
	case 'Jan': return '01';
	case 'Feb': return '02';
	case 'Mar': return '03';
	case 'Apr': return '04';
	case 'May': return '05';
	case 'Jun': return '06';
	case 'Jul': return '07';
	case 'Aug': return '08';
	case 'Sep': return '09';
	case 'Okt': return '10';
	case 'Nov': return '11';
	case 'Dec': return '12';
	default: return '?'
	}
}

exports.log = log;