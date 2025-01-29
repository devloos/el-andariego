export function prettyContent(content = [], locale) {
  if (content.length === 1) {
    return content[0];
  }

  const separator = locale === 'es' ? ' y' : ' and';

  const res = content.join(', ');
  const index = res.lastIndexOf(',');
  return res.slice(0, index + 1) + separator + res.slice(index + 1);
}

export function getImageKitUrl(src) {
  return new URL(src, 'https://ik.imagekit.io');
}

export function log(...message) {
  if (import.meta.env.VITE_ENV === 'development') {
    console.log(...message);
  }
}
