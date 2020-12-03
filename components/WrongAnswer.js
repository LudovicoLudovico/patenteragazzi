import React from 'react';
// import MDEditor from '@uiw/react-md-editor';
import uuid from 'react-uuid';
const WrongAnswer = ({ wrong }) => {
  return (
    <div className='wrong_answer' key={uuid()}>
      <div className='wrong_answer_image'>
        <p>{wrong.num + 1}/40</p>
        <img src={wrong.image} alt='' />
      </div>

      <div className='wrong_answer_content'>
        <p>{wrong.question}</p>
        <div>
          <p>Risposta corretta:</p>
          <p className='right'>{wrong.response ? 'Vero' : 'Falso'}</p>
          <p>La tua risposta: </p>
          <p className='wrong'>
            {(() => {
              if (wrong.userResponse === true) {
                return 'Vero';
              } else if (wrong.userResponse === false) {
                return 'Falso';
              } else {
                return 'Non data';
              }
            })()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WrongAnswer;
