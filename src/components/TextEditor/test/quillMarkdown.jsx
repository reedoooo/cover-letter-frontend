import Quill from 'quill';
import QuillMarkdown from 'quilljs-markdown';
import 'quilljs-markdown/dist/quilljs-markdown-common-style.css'; // recommend import css, @option improve common style

const options = {
  theme: 'snow',
};
document.addEventListener('DOMContentLoaded', () => {
  const editor = new Quill('#editor', options);
  const markdownOptions = {
    /**
     ignoreTags: [ 'pre', 'strikethrough'], // @option - if you need to ignore some tags.
     tags: { // @option if you need to change for trigger pattern for some tags.
      blockquote: {
        pattern: /^(\|){1,6}\s/g,
      },
      bold: {
        pattern:  /^(\|){1,6}\s/g,
      italic: {
        pattern: /(\_){1}(.+?)(?:\1){1}/g,
    },
    */
  };
  // markdown is enabled
  const quillMarkdown = new QuillMarkdown(editor, markdownOptions);
  // markdown is now disabled
  // quillMarkdown.destroy()
});
