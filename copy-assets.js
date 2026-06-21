import fs from 'fs';
import path from 'path';

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  // 1. Copy src/assets/images to dist/src/assets/images
  const srcImages = path.join(process.cwd(), 'src', 'assets', 'images');
  const destImages = path.join(process.cwd(), 'dist', 'src', 'assets', 'images');
  if (fs.existsSync(srcImages)) {
    console.log(`Copying ${srcImages} -> ${destImages}`);
    copyDir(srcImages, destImages);
  }

  // 2. Copy root level png files to dist root
  const rootFiles = ['input_file_0.png', 'input_file_1.png', 'input_file_1.png.png'];
  rootFiles.forEach(file => {
    const srcPath = path.join(process.cwd(), file);
    const destPath = path.join(process.cwd(), 'dist', file);
    if (fs.existsSync(srcPath)) {
      console.log(`Copying ${srcPath} -> ${destPath}`);
      fs.copyFileSync(srcPath, destPath);
    }
  });

  console.log('Static assets copied successfully!');
} catch (err) {
  console.error('Error copying assets:', err);
  process.exit(1);
}
