// meh, just export the whole dang thing as an object...

export default {
  config: {
    src: {
      files: {
        backend: [
          'src/backend/**/*'
        ],
        frontend: [
          'src/frontend/**/*'
        ]
      },
      babel: [
        'src/backend/**/*.js',
        '!src/backend/**/{fixtures,templates}/**',
        '!src/backend/**/*.spec.js',
      ]
    },
    dist: "dist",
    clean: [
      'dist/',
      'dist/docs/',
      'dist/includes/',
      'dist/public_html/',
      'dist/scripts/',
      'dist/operations.php',
      'dist/coverage/',
      // Delete all files and folders that contain static data
      '!dist/config/**/*',
      '!dist/config.php',
      '!dist/pm2.json',
      '!dist/fms_files/',
      '!dist/fms_files/**/*'
    ],
    destDir: "dist",
    test: [
      'src/**/*.spec.js'
    ],
    sass: [
      'src/frontend/**/*.scss'
    ],
    watch: [
      'src/frontend/**/*.js',
      'src/frontend/**/*.scss',
      'src/frontend/**/*.html'
    ],
    inject: {
      cwd: 'dist/frontend',
      targetFiles: [
        './**/*.html',
      ]
    },
    vendorFiles: {
      common: [
        //'node_modules/path/path.js'
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/vis/dist/vis.min.css',
        'node_modules/vis/dist/vis-network.min.js',
        //'node_modules/bootstrap/dist/js/boostrap.min.js'
      ]
    },
    htmlSrc: [
      'src/frontend/**/*.html',
      'src/frontend/**/*.json',
      'src/frontend/**/*.jpg',
      '!src/frontend/**/*/.scss'
    ],
  }
};
