import React from 'react';
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const Editor = ({ text, setText }) => {
  return (
    <SunEditor
      setContents={text}
      onChange={setText}
      height={500}
      setOptions={{
        buttonList: buttonList.complex,
      }}
    />
  );
};
export default Editor;
