/**
* esbuild.config.js
* 
* @author Prahlad Yeri <prahladyeri@yahoo.com>
* @license MIT
*/
import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import pkg from './package.json' with { type: 'json' };
import { toLocalTime } from './src/helpers.js';

const isDev = process.argv.includes('--dev');
const dtmap = toLocalTime(new Date());
const datePart = `${dtmap.year}${dtmap.month}${dtmap.day}`;
const timePart = `${dtmap.hour}${dtmap.minute}`;
const buildId = `${pkg.version}-${datePart}-${timePart}`;

// Read the .env file manually (no 'dotenv' package required)
let bingToken = '';
if (fs.existsSync('.env')) {
	const envContent = fs.readFileSync('.env', 'utf8');
	const match = envContent.match(/BING_VERIFY_TOKEN=(.*)/);
	bingToken = match ? match[1].trim() : '';
	// Remove surrounding quotes if they exist in the .env file
	bingToken = bingToken.replace(/^["']|["']$/g, ''); 
} else {
	console.warn('⚠️ .env file not found. Bing token will be empty.');
}

const config = {
  entryPoints: ['src/main.js'],
  bundle: true,
  minify: true,
  sourcemap: false,
  legalComments: 'none',
  outfile: `dist/app-${pkg.version}.js`,
  loader: { '.png': 'file', '.jpg': 'file', '.css': 'css', '.html': 'text' },
  define: {
    'process.env.VERSION': JSON.stringify(pkg.version),
    'process.env.BUILD': JSON.stringify(buildId),
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

//html = html.replace('/app.js', `/app-${pkg.version}.js`);
//html = html.replace('/app.css', `/app-${pkg.version}.css`);
let html = fs.readFileSync('./public/index.html', 'utf8');
html = html.replaceAll('{{pkgver}}', `${pkg.version}`);
html = html.replaceAll('{{bingToken}}', `${bingToken}`);
fs.writeFileSync('./dist/index.html', html);
