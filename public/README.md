# Public Assets

This directory contains static assets for the AlgoVista application.

## Images

### Required PNG Files

The following PNG images are required for optimal SEO and PWA functionality:

- `og-image.png` (1200x630px) - Open Graph image for social media sharing
- `icon-192.png` (192x192px) - PWA icon for mobile devices
- `icon-512.png` (512x512px) - PWA icon for larger displays

### Generating Images

SVG source files are provided:
- `og-image.svg` - Source for og-image.png
- `icon.svg` - Source for icon-192.png and icon-512.png

To generate the PNG files from SVG:

1. Install the required dependency:
```bash
npm install sharp --save-dev
```

2. Run the generation script:
```bash
npm run generate-images
```

This will create all three PNG files automatically.

### Alternative: Manual Conversion

If you prefer to create the images manually:

1. Use an online SVG to PNG converter (e.g., CloudConvert, Convertio)
2. Or use image editing software (Photoshop, GIMP, Figma) to export the SVGs as PNGs
3. Ensure the exact dimensions:
   - og-image.png: 1200x630px
   - icon-192.png: 192x192px
   - icon-512.png: 512x512px

### Customization

You can edit the SVG files to customize:
- Colors (match your brand)
- Text content
- Layout and design

Then regenerate the PNG files using the script.

