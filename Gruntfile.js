module.exports = function(grunt) {

  

  grunt.initConfig({
    aws: grunt.file.readJSON('aws-keys.json'),
    s3: {
      options: {
        key: '<%= aws.AWSAccessKeyId %>',
        secret: '<%= aws.AWSSecretKey %>',
        bucket: '<%= aws.bucket %>',
        access: 'public-read',
        headers: {
          // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
          "Cache-Control": "max-age=630720000, public",
          "Expires": new Date(Date.now() + 63072000000).toUTCString()
        }
      },
      dev: {
        // These options override the defaults
        options: {
          encodePaths: false,
          maxOperations: 20
        },
        // Files to be uploaded.
        upload: [
          {
            // Wildcards are valid *for uploads only* until I figure out a good implementation
            // for downloads.
            src: 'dist/*',

            // But if you use wildcards, make sure your destination is a directory.
            dest: ''
          },
          {
            // Wildcards are valid *for uploads only* until I figure out a good implementation
            // for downloads.
            src: 'dist/assets/*',

            // But if you use wildcards, make sure your destination is a directory.
            dest: 'assets/'
          }
        ],

      }

    }
  });

  grunt.loadNpmTasks('grunt-s3');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};