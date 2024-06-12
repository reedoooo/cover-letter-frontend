/**
 * Creates a CDN link for an image file.
 * -- Explained -- A CDN link is a URL that points to a file on a remote server. This function creates a CDN link for an image file.
 * @param {string} filename - The name of the image file.
 * @returns {string} The CDN link for the image file.
 */
export const createImageCdnLink = filename => {
  return `https://cdn.jsdelivr.net/gh/reedoooo/assets@main/${filename}`;
};
