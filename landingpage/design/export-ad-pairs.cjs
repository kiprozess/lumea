const fs = require('node:fs');
const path = require('node:path');
const sharp = require('C:/Users/Flo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root = path.resolve(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'creatives/GENERIERUNG.json'), 'utf8'));

(async () => {
  for (const job of manifest.jobs) {
    // Both formats use one photograph. No independent generation of capsules or packaging.
    const story = await sharp(path.resolve(root, job.source)).resize(1080, 1920, { fit: 'fill' }).png().toBuffer();
    const top = job.feedCropTop ?? 285;
    const feed = await sharp(story).extract({ left: 0, top, width: 1080, height: 1350 }).png().toBuffer();
    for (const [format, bytes] of [['9x16', story], ['4x5', feed]]) {
      const target = path.join(root, 'creatives/exports', `${job.id}-${format}.png`);
      fs.writeFileSync(target, bytes);
      fs.copyFileSync(target, path.join(root, 'creatives/final', `${job.id}-${format}.png`));
      const m = await sharp(bytes).metadata();
      console.log(`${job.id}-${format}: ${m.width}x${m.height}`);
    }
    const crop = await sharp(story).extract({ left: 0, top, width: 1080, height: 1350 }).raw().toBuffer();
    const check = await sharp(feed).raw().toBuffer();
    if (!crop.equals(check)) throw new Error(`Pair mismatch: ${job.id}`);
  }
})();
