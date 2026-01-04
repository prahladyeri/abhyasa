import esbuild from 'esbuild';

const isWatch = process.argv.includes('--watch');

esbuild.build({
  entryPoints: ['src/main.js'],
  bundle: true,
  outfile: 'dist/app.js',
  sourcemap: true,
  minify: !isWatch,
  target: ['es2017'],
  loader: {
    '.js': 'js'
  }
}).then(() => {
  if (isWatch) {
    console.log('Watching for changes...');
  }
}).catch(() => process.exit(1));

if (isWatch) {
  esbuild.context({
    entryPoints: ['src/main.js'],
    bundle: true,
    outdir: 'dist',
    sourcemap: true
  }).then(ctx => ctx.watch());
}
