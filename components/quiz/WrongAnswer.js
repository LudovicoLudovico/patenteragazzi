import React, { useState } from 'react';
import uuid from 'react-uuid';
import Modal from '@material-ui/core/Modal';
import { decrypt } from '../../lib/enc';
import MDEditor from '@uiw/react-md-editor';

const WrongAnswer = ({ wrong, theory }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`wrong_answer ${wrong.image ? 'image' : 'no-image'}`}
      key={uuid()}
    >
      <div className='wrong_answer_image'>
        {wrong.image && <img src={wrong.image} alt='' />}
      </div>

      <Modal
        open={open}
        onClick={() => setOpen(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          outline: 'none',
        }}
      >
        {theory.length !== 0 && (
          <div
            className='theory_popup'
            style={{
              backgroundColor: 'white',
              color: 'black',
              textAlign: 'center',
              flexDirection: 'column',
              flexWrap: 'wrap',
              justifyContent: 'center',
              maxWidth: 900,
              maxHeight: '70vh',
              overflow: 'scroll',
              padding: 20,
            }}
          >
            {theory[0].image && (
              <img
                src={decrypt(theory[0].image)}
                style={{ height: 100, width: 'auto' }}
                alt=''
              />
            )}
            <h3> {decrypt(theory[0].title)}</h3>
            <MDEditor.Markdown
              source={decrypt(theory[0].theory)}
              style={{ textAlign: 'left' }}
            />
          </div>
        )}
      </Modal>

      <div className='wrong_answer_content'>
        <p>{wrong.question}</p>
        <div>
          <p>
            <strong>Risposta corretta:</strong>
          </p>
          <p className='right'>{wrong.response ? 'VERO' : 'FALSO'}</p>
          <p>
            <strong>La tua risposta:</strong>
          </p>
          <p className='wrong'>
            {(() => {
              if (wrong.userResponse === true) {
                return 'VERO';
              } else if (wrong.userResponse === false) {
                return 'FALSO';
              } else {
                return 'NON DATA';
              }
            })()}
          </p>
        </div>

        <img
          src='/book.svg'
          alt=''
          className='open_theory'
          onClick={() => setOpen(true)}
        />
      </div>
    </div>
  );
};

export default WrongAnswer;
