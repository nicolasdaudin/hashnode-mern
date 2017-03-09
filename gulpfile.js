/*
var fs = require("fs");
var browserify = require("browserify");
browserify("./script.js")
  .transform("babelify", {presets: ["es2015", "react"]})
  .bundle()
  .pipe(fs.createWriteStream("bundle.js"));

  var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
 
gulp.task('browserify', function() {
    return browserify('./src/javascript/app.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./build/'));
});
*/

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

gulp.task('bundle', function() {
    return browserify('./src/App.js')
    	// browserify évite d'inclure dans index.html les scripts react... et les inclut dans un seul fichier
    	// il regarder tous les require de 'App.js', récusrivement, et construit ainsi son API javascript
    	.transform("babelify", {presets:["es2015","react"]})
    	// babelify permet de gñerer le JSX (React) et de transformer ES2015 en Javascript 'normal'. 
        .bundle()
        .on('error', function (err) { console.error(err.message + ' caused by ' + err.stack); })
         // Nico: mandatory part: this jus converts the bundle into the type of stream gulp is expecting
        .pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./static/'));
      console.log('Successfully bundled');
});

gulp.task('watch', function(){

	var b = browserify({
	  entries: ['./src/App.js'],
	  cache: {},
	  packageCache: {},
	  plugin: ["watchify"]
	});

	b.on('update', bundle);

	function bundle() {
	  b.transform("babelify", {presets:["es2015","react"]})
	  	.bundle()
	  	.on('error', function (err) { console.error(err.message + ' caused by ' + err.stack); })
	  	.pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./static/'));
      console.log('Successfully bundled')
	}

	bundle();


	return b;
});

gulp.task('default',['watch']);