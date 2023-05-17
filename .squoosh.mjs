import { mkdtemp } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { writeFileSync } from "node:fs";
import glob from "glob";
import pLimit from "p-limit";
import sharp from "sharp";

const limit = pLimit(3);
const [globs] = process.argv.slice(2);
const promises = [];
const errors = [];

const imgs = glob.sync(globs, {nonull: false});

if (imgs.length !== 0) {
  const dir = await mkdtemp(join(tmpdir(), 'optimise-'));

  imgs.map(async (img) => promises.push(
    limit(async () => {
      try {
        const ext = /\.([^\.]+)$/ig.exec(img)[1];
        const outputFile = join(dir, img);

        // Convert and optimize images
        let image = sharp(img);

        switch (ext) {
          case 'jpg':
            image.jpeg({ mozjpeg: true });
            break;
          case 'jpeg':
            image.jpeg({ mozjpeg: true });
            break;
          case 'png':
            image.png({ oxipng: true });
            break;
          case 'webp':
            image.webp();
            break;
          case 'avif':
            image.avif();
            break;
          case 'jxl':
            image.jxl();
            break;
          case 'wp2':
            image.wp2();
            break;
          default:
            throw new Error(`Unsupported file extension: ${ext}`);
        }

        writeFileSync(img, await image.toBuffer());

        // await image.toFile(outputFile);
      } catch (e) {
        console.log(e);
        errors.push(e.message || e);
      }
    })
  ));
}

await Promise.all(promises);

if (errors.length > 0) {
  console.error('Optimising images failed with errors:\n\n', errors.join('\n\n'));
  process.exit(1);
} else {
  console.log('Optimised all images, running additional commands now');
  process.exit(0);
}
