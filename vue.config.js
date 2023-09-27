module.exports = {
  chainWebpack: (config) => {
    config.optimization.delete('splitChunks');
  },
  css: {
  	extract: {
  		filename: 'style.css',
  	}
  },
  configureWebpack: config => {
  	config.output.filename = 'script.js';
  },
  filenameHashing: false,
};
