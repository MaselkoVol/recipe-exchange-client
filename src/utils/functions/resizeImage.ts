export const resizeImage = (file: File, width: number, height: number, filetype: string): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.readAsDataURL(file);

    // transform to blob
    reader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        img.src = e.target.result;
      } else {
        reject(new Error("Failed to read file as Data URL"));
      }
    };
    reader.onerror = (err) => reject(err);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = width;
      canvas.height = height;

      // Calculate image aspect ratio and canvas aspect ratio
      const imageAspectRatio = img.width / img.height;
      const canvasAspectRatio = width / height;

      let sx, sy, swidth, sheight;

      // Determine the cropping dimensions
      if (imageAspectRatio > canvasAspectRatio) {
        // Image is wider than canvas, crop the left and right sides
        swidth = img.height * canvasAspectRatio;
        sheight = img.height;
        sx = (img.width - swidth) / 2;
        sy = 0;
      } else {
        // Image is taller than or equal to canvas, crop the top and bottom
        swidth = img.width;
        sheight = img.width / canvasAspectRatio;
        sx = 0;
        sy = (img.height - sheight) / 2;
      }

      ctx.drawImage(img, sx, sy, swidth, sheight, 0, 0, width, height);
      ctx.imageSmoothingEnabled = true; // Enable smoothing
      ctx.imageSmoothingQuality = "high"; // Set quality to high

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const resizedImage = new File([blob], "resized.jpg", { type: filetype, lastModified: Date.now() });
            resolve(resizedImage);
          } else {
            reject(new Error("failed to resize image"));
          }
        },
        filetype,
        0.8
      );
    };
  });
};
