module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	
	grunt.initConfig({
		jshint: {
			files: [
			  'GruntFile.js',
			  'src/me.xize.r0hpx/main.js'
			],
			options: {
			  ignores:[]
			}
		}
	});
	
	grunt.registerTask('default', ['jshint']);
	
};