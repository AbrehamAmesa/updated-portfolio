
const imageModules = import.meta.glob(
  '../assets/images/*',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
) as Record<string, string>;

export function getImageUrl(imagePath?: string | null): string {
  if (!imagePath) return '';

  // External images and data URLs
  if (/^(https?:\/\/|data:|blob:)/i.test(imagePath)) {
    return imagePath;
  }

  // Get the filename from an existing stored path
  const filename = imagePath.replace(/\\/g, '/').split('/').pop();

  if (!filename) return '';

  const match = Object.entries(imageModules).find(
    ([path]) => path.split('/').pop() === filename
  );

  return match?.[1] ?? '';
}
