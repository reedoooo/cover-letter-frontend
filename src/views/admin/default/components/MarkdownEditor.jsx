import { StreamLanguage } from '@codemirror/language';
import { go } from '@codemirror/legacy-modes/mode/go';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import CodeMirror from '@uiw/react-codemirror';
import React, { useEffect, useState, useRef, forwardRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import 'styles/_textEditor.scss';

export const CodeBlock = ({
  height,
  code,
  editable = false,
  onChange = () => {},
}) => {
  const [copyText, setCopyText] = useState('Copy');
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopyText('Copy');
    }, 2000);
    return () => clearTimeout(timeout);
  }, [copyText]);

  return (
    <div className={`relative h-${height}px overflow-scroll`}>
      <button
        className="absolute right-0 top-0 z-10 rounded bg-[#1A1B26] p-1 text-xs text-white hover:bg-[#2D2E3A] active:bg-[#2D2E3A]"
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopyText('Copied!');
        }}
      >
        {copyText}
      </button>
      <CodeMirror
        editable={editable}
        value={code}
        minHeight={`${height}px`}
        className="rounded-md overflow-scroll"
        extensions={[StreamLanguage.define(go)]}
        theme={tokyoNight}
        onChange={value => onChange(value)}
      />
    </div>
  );
};

const MarkdownEditor = forwardRef(({ initialValue, onChange }, ref) => {
  const [value, setValue] = useState(initialValue);

  const handleQuillChange = content => {
    setValue(content);
    onChange(content);
  };

  useEffect(() => {
    const observer = new MutationObserver(() => {
      // Handle mutation events
    });

    if (ref?.current) {
      observer.observe(ref.current.getEditor().root, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return (
    <div className="markdown-editor">
      <CodeBlock
        height={450}
        code={value}
        editable={true}
        onChange={setValue}
      />
      <ReactQuill
        ref={ref}
        value={value}
        onChange={handleQuillChange}
        modules={{
          toolbar: false,
        }}
      />
    </div>
  );
});

MarkdownEditor.displayName = 'MarkdownEditor';

export default MarkdownEditor;
