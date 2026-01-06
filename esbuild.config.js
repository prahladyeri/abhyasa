/**
* esbuild.config.js
* 
* @author Prahlad Yeri <prahladyeri@yahoo.com>
* @license MIT
*/
import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import pkg from './package.json' assert { type: 'json' };

const isDev = process.argv.includes('--dev');

const config = {
  entryPoints: ['src/main.js'],
  bundle: true,
  minify: true,          // Don't minify in dev for easier debugging
  sourcemap: false,        // Enable sourcemaps in dev
  outfile: 'dist/app.js',
  loader: { '.png': 'file', '.jpg': 'file', '.css': 'css' },
  define: {
    'process.env.VERSION': JSON.stringify(pkg.version),
    'process.env.BUILD': JSON.stringify(new Date().toISOString()),
  },
};

// generate build info
// const buildNumber = new Date().toISOString();
// fs.writeFileSync('src/build.js', `
  // export const VERSION = "${pkg.version}";
  // export const BUILD = "${buildNumber}";
// `);

if (isDev) {
  // DEV MODE: Starts a local server and watches for changes
  const ctx = await esbuild.context(config);
  await ctx.watch();
  const { host, port } = await ctx.serve({ 
	servedir: 'dist', host: '127.0.0.1', port: 3000,
	fallback: path.join('dist', 'index.html')
	});
  console.log(`🚀 Dev server running at http://127.0.0.1:${port}`);
} else {
  // PRODUCTION BUILD
  await esbuild.build(config);
  console.log('✅ Build complete');
}