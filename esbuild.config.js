import esbuild from 'esbuild';
import fs from 'fs';
import pkg from './package.json' assert { type: 'json' };

// generate build info
const buildNumber = new Date().toISOString();
fs.writeFileSync('src/build.js', `
  export const VERSION = "${pkg.version}";
  export const BUILD = "${buildNumber}";
`);

esbuild.build({
  entryPoints: ['src/main.js'],
  bundle: true,
  outfile: 'dist/app.js',
  sourcemap: false,
  target: ['es2017'],
});