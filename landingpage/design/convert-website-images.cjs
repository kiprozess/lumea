const fs = require('node:fs');
const path = require('node:path');
const sharp = require('C:/Users/Flo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root = path.resolve(__dirname, '..');
const assets = path.join(root, 'public/images');

function files(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? files(path.join(dir,e.name)) : [path.join(dir,e.name)]);
}
(async()=>{
 const report=[];
 const codeFiles=[...files(path.join(root,'src')),path.join(root,'index.html')].filter(p=>/\.(tsx?|css|html)$/.test(p));
 const used=new Set(codeFiles.flatMap(file=>[...fs.readFileSync(file,'utf8').matchAll(/\/images\/([A-Za-z0-9_./-]+)\.(?:png|jpe?g|svg|webp)/g)].map(m=>m[1])));
 for(const source of files(assets).filter(p=>/\.(png|jpe?g|svg)$/i.test(p) && used.has(path.relative(assets,p).replaceAll('\\','/').replace(/\.[^.]+$/,'')))){
  const vector=source.endsWith('.svg');
  const exact=vector || /lumea-(logo|leaf|packshot)|lumea-info-/.test(path.basename(source));
  const original=await sharp(source).metadata();
  let pipeline=sharp(source,vector?{density:432}:{});
  const target=source.replace(/\.(png|jpe?g|svg)$/i,'.webp');
  if(!fs.existsSync(target) || fs.statSync(target).mtimeMs < fs.statSync(source).mtimeMs)
   await pipeline.webp({lossless:exact,quality:exact?100:86,effort:4}).toFile(target);
  const converted=await sharp(target).metadata();
  if(!vector && (original.width!==converted.width || original.height!==converted.height))throw new Error('Size changed: '+source);
  if(original.hasAlpha && !converted.hasAlpha){
   const stats=await sharp(source).stats();
   if(stats.channels.at(-1).min<255)throw new Error('Lost transparency: '+source);
  }
  report.push({source:path.relative(root,source).replaceAll('\\','/'),target:path.relative(root,target).replaceAll('\\','/'),originalBytes:fs.statSync(source).size,webpBytes:fs.statSync(target).size,width:converted.width,height:converted.height,lossless:exact});
 }
 // Change only the actual website references; PNG source files remain available for documents and masters.
 for(const file of codeFiles){
  const before=fs.readFileSync(file,'utf8');
  const after=before.replace(/(\/images\/[A-Za-z0-9_./-]+)\.(png|jpe?g|svg)/g,'$1.webp').replace('type="image/png"','type="image/webp"');
  if(before!==after)fs.writeFileSync(file,after);
 }
 fs.writeFileSync(path.join(root,'design/webp-images.json'),JSON.stringify(report,null,2));
 const sum=k=>report.reduce((s,r)=>s+r[k],0);
 console.log(JSON.stringify({converted:report.length,originalBytes:sum('originalBytes'),webpBytes:sum('webpBytes'),savingPercent:Math.round((1-sum('webpBytes')/sum('originalBytes'))*100)}));
})().catch(e=>{console.error(e);process.exit(1)});
