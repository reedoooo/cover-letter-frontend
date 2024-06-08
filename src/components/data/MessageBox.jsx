import React from 'react';
import ReactMarkdown from 'react-markdown';
import useMode from 'hooks/useMode';
import { Card } from '..';

export default function MessageBox(props) {
  const { output } = props;
  const { colorModeValues } = useMode();
  const textColor = colorModeValues('navy.700', 'white');

  return (
    <Card
      display={output ? 'flex' : 'none'}
      px="22px !important"
      pl="22px !important"
      color={textColor}
      minHeight="450px"
      fontSize={{
        base: 'sm',
        md: 'md',
      }}
      lineHeight={{
        base: '24px',
        md: '26px',
      }}
      fontWeight="500"
    >
      <ReactMarkdown className="font-medium">
        {output ? output : ''}
      </ReactMarkdown>
    </Card>
  );
}
