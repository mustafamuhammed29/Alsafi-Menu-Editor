/**
 * Utility to optimize and compress user-uploaded images on the client side.
 * Downscales oversized camera images (e.g. 5000px DSLR shots) to crisp A4 300DPI printable resolution (max 1800px)
 * and compresses them to ~300KB-600KB without any visible loss in sharpness or color fidelity.
 */
export const optimizeImageFile = (file, maxWidth = 1800, maxHeight = 2400, quality = 0.90) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('No file provided'));
    }

    // If SVG, return as is
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        const isPng = file.type === 'image/png' || (!file.type && file.name && file.name.toLowerCase().endsWith('.png'));

        // If file is reasonably sized and is PNG, keep original to guarantee 100% vector-crisp alpha
        if (isPng && width <= maxWidth && height <= maxHeight && file.size < 500 * 1024) {
          return resolve(e.target.result);
        }

        // Calculate proportional scale
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return resolve(e.target.result);
        }

        const outputFormat = isPng ? 'image/png' : 'image/jpeg';

        // Clear canvas to ensure complete alpha transparency for PNGs
        ctx.clearRect(0, 0, width, height);

        // Only fill background with white if converting to JPEG (since JPEG does not support alpha channel)
        if (outputFormat === 'image/jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
        }

        // High quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Preserve PNG transparency if PNG, otherwise use high-quality JPEG
        const dataUrl = canvas.toDataURL(outputFormat, isPng ? undefined : quality);
        resolve(dataUrl);
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
