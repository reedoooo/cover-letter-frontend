/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export const MarkdownBlock = ({
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
    <div className="relative">
      <button
        className="absolute right-0 top-0 z-10 rounded bg-[#1A1B26] p-1 text-xs text-white hover:bg-[#2D2E3A] active:bg-[#2D2E3A]"
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopyText('Copied!');
        }}
      >
        {copyText}
      </button>
      <div className="p-4 h-500px bg-[#1A1B26] text-white overflow-scroll rounded-md">
        <ReactMarkdown className="font-normal">{code}</ReactMarkdown>
      </div>
    </div>
  );
};
