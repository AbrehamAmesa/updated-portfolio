
const imageModules = import.meta.glob<string>(
  '../assets/images/*',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
);

const normalizePath = (path: string): string =>
  path.replace(/\\/g, '/');

const getFilename = (path: string): string =>
  normalizePath(path).split('/').pop()?.split('?')[0] ?? '';

const imageUrlByFilename = new Map<string, string>();

for (const [path, url] of Object.entries(imageModules)) {
  const filename = getFilename(path).toLowerCase();

  if (filename) {
    imageUrlByFilename.set(filename, url);
  }
}

export function getImageUrl(imagePath?: string | null): string {
  if (!imagePath || typeof imagePath !== 'string') {
    return '';
  }

  const path = imagePath.trim();

  if (!path) {
    return '';
  }

  // External URLs and browser-generated image URLs.
  if (/^(https?:\/\/|data:|blob:)/i.test(path)) {
    return path;
  }

  const normalized = normalizePath(path);

  // Already-resolved Vite URLs must be returned unchanged.
  // Example: /assets/project_corehcm_preview-abc123.jpg
  if (/^\/assets\//i.test(normalized)) {
    return normalized;
  }

  // Resolve paths pointing to source assets by their original filename.
  // Examples:
  // ../assets/images/project_corehcm_preview_1790668823547.jpg
  // /src/assets/images/project_corehcm_preview_1790668823547.jpg
  // project_corehcm_preview_1790668823547.jpg
  const isSourceAssetPath =
    /(^|\/)src\/assets\/images\//i.test(normalized) ||
    /(^|\/)assets\/images\//i.test(normalized) ||
    !normalized.startsWith('/');

  if (isSourceAssetPath) {
    const filename = getFilename(normalized).toLowerCase();
    const matchedUrl = imageUrlByFilename.get(filename);

    if (matchedUrl) {
      return matchedUrl;
    }

    // Do not turn unresolved source paths into broken browser URLs.
    return '';
  }

  // Public-folder paths, such as /images/project.png.
  return normalized;
}
