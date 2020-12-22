import React from 'react';
import SunEditor, { buttonList } from 'suneditor-react';

import 'suneditor/dist/css/suneditor.min.css';
const Editor = ({ text, setText, height }) => {
  return (
    <>
      <SunEditor
        text={text}
        onChange={(content) => setText(content)}
        setOptions={{
          height: height || '500',
          buttonList: [
            ['undo', 'redo'],
            ['formatBlock'],
            ['bold', 'italic', 'underline'],
            ['list'],
            ['image', 'video'],
            ['horizontalRule'],
          ],
        }}
      />
    </>
  );
};

export default Editor;
