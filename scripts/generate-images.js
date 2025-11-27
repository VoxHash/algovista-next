/**
 * Script to generate PNG images from SVG files
 * Requires: npm install sharp
 * Run: node scripts/generate-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// Generate og-image.png from SVG
async function generateOGImage() {
  const svgPath = path.join(publicDir, 'og-image.svg');
  const outputPath = path.join(publicDir, 'og-image.png');
  
  if (!fs.existsSync(svgPath)) {
    console.error('og-image.svg not found!');
    return;
  }
  
  try {
    await sharp(svgPath)
      .resize(1200, 630)
      .png()
      .toFile(outputPath);
    console.log('✓ Generated og-image.png (1200x630)');
  } catch (error) {
    console.error('Error generating og-image.png:', error);
  }
}

// Generate icon-192.png
async function generateIcon192() {
  const svgPath = path.join(publicDir, 'icon.svg');
  const outputPath = path.join(publicDir, 'icon-192.png');
  
  if (!fs.existsSync(svgPath)) {
    console.error('icon.svg not found!');
    return;
  }
  
  try {
    await sharp(svgPath)
      .resize(192, 192)
      .png()
      .toFile(outputPath);
    console.log('✓ Generated icon-192.png (192x192)');
  } catch (error) {
    console.error('Error generating icon-192.png:', error);
  }
}

// Generate icon-512.png
async function generateIcon512() {
  const svgPath = path.join(publicDir, 'icon.svg');
  const outputPath = path.join(publicDir, 'icon-512.png');
  
  if (!fs.existsSync(svgPath)) {
    console.error('icon.svg not found!');
    return;
  }
  
  try {
    await sharp(svgPath)
      .resize(512, 512)
      .png()
      .toFile(outputPath);
    console.log('✓ Generated icon-512.png (512x512)');
  } catch (error) {
    console.error('Error generating icon-512.png:', error);
  }
}

async function main() {
  console.log('Generating images...\n');
  await generateOGImage();
  await generateIcon192();
  await generateIcon512();
  console.log('\n✓ All images generated successfully!');
}

main().catch(console.error);

