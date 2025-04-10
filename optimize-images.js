const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImages() {
    const imageDir = path.join(__dirname, 'images');
    const optimizedDir = path.join(__dirname, 'optimized-images');

    try {
        // Create optimized-images directory if it doesn't exist
        await fs.mkdir(optimizedDir, { recursive: true });

        // Get all files in the images directory
        const files = await fs.readdir(imageDir);

        // Filter for image files
        const imageFiles = files.filter(file => 
            ['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase())
        );

        // Process each image
        for (const file of imageFiles) {
            const inputPath = path.join(imageDir, file);
            const outputPath = path.join(optimizedDir, file);

            await sharp(inputPath)
                .resize(1200, 1200, { // Max dimensions
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .jpeg({ // Convert to JPEG and compress
                    quality: 80,
                    progressive: true
                })
                .toFile(outputPath);

            console.log(`Optimized: ${file}`);
        }

        // Replace original images with optimized ones
        for (const file of imageFiles) {
            const optimizedPath = path.join(optimizedDir, file);
            const originalPath = path.join(imageDir, file);
            await fs.rename(optimizedPath, originalPath);
        }

        // Remove optimized directory
        await fs.rmdir(optimizedDir);

        console.log('All images have been optimized!');
    } catch (error) {
        console.error('Error optimizing images:', error);
    }
}

optimizeImages();
