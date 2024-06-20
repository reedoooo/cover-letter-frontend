/**
 * Escape HTML characters
 * @param source
 */
export function encodeHTML(source) {
  return source
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Check if the text includes code
 * @param text
 */
export function includeCode(text) {
  const regexp = /^(?:\s{4}|\t).+/gm;
  return !!(text?.includes(' = ') || text?.match(regexp));
}

/**
 * Copy text to clipboard
 * @param options
 */
export function copyText(options) {
  const props = { origin: true, ...options };

  let input;

  if (props.origin) input = document.createElement('textarea');
  else input = document.createElement('input');

  input.setAttribute('readonly', 'readonly');
  input.value = props.text;
  document.body.appendChild(input);
  input.select();
  if (document.execCommand('copy')) document.execCommand('copy');
  document.body.removeChild(input);
}
