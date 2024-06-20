import { getCurrentDate } from 'utils/date';

export function genTempDownloadLink(imgUrl) {
  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.href = imgUrl;
  // generate a file name, chat-shot-2021-08-01.png
  const ts = getCurrentDate();
  tempLink.setAttribute('download', `chat-shot-${ts}.png`);
  if (typeof tempLink.download === 'undefined')
    tempLink.setAttribute('target', '_blank');
  return tempLink;
}
