module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks 
	 
	grunt.initConfig({
		babel: {
			options: {
				sourceMap: true,
                plugins: ['transform-react-jsx', "transform-es2015-modules-commonjs"],
				presets: ['babel-preset-es2015']
			},
            jsx: {
                files: [{
                  expand: true,
                  cwd: 'view/assets/jsx',
                  src: ['*.jsx', '**/*.jsx'],
                  dest: 'view/assets/js',
                  ext: '.js'
                }]
            }
		},
        webpack: {
            main: {
            // webpack options
            entry: "./view/assets/js/chat-button.js",
            output: {
                path: "./view/assets/js/",
                filename: "bundled.js",
            },
            stats: {
                // Configure the console output
                colors: false,
                modules: true,
                reasons: true
            },
            failOnError: false,
            }
        },
		
		 watch: {
            scripts: {
                files: ['view/assets/js/*.js', 'view/assets/jsx/*.jsx'],
                tasks: ["babel", "webpack"]
            },
             css: {
                 files: ['view/assets/sass/*.scss'],
                 tasks: ["sass"]
             }
        },

        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    './view/assets/css/style.css': './view/assets/sass/style.scss'
                }
            }
        }
	});
	 
    grunt.loadNpmTasks('grunt-webpack');
    grunt.registerTask('default', ['sass']);
	grunt.registerTask('default', ['babel', 'webpack']);
};