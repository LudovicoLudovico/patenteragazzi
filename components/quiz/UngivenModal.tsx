import React from 'react';
import { Modal, Button } from '@material-ui/core';

interface UngivenModalProps {
  ungivenState: UngivenState;
  correctPopup: boolean;
  forceCorrect: () => void;
  setCorrectPopup: (value: boolean) => void;
  setQuestionCounter: (number: number) => void;
}

interface UngivenState {
  number: number;
  position: number[];
}
const UngivenModal = ({
  ungivenState,
  correctPopup,
  forceCorrect,
  setCorrectPopup,
  setQuestionCounter,
}: UngivenModalProps) => {
  return (
    <div>
      {ungivenState && (
        <Modal
          open={correctPopup}
          onClick={() => setCorrectPopup(false)}
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            outline: 'none',
          }}
        >
          <div className='correct_popup'>
            {ungivenState.number !== 0 && (
              <>
                <h3>Non hai risposto a {ungivenState.number} domande</h3>
                <p>Vuoi consegnarlo comunque?</p>
                <Button
                  variant='contained'
                  className='correct_btn'
                  onClick={forceCorrect}
                >
                  Correggi
                </Button>
                <p>Torna al quiz</p>

                <div
                  style={{
                    maxHeight: 300,
                    overflow: 'scroll',
                  }}
                >
                  {ungivenState.position.map((question) => {
                    return (
                      <span
                        key={question}
                        style={{
                          display: 'inline-block',
                          width: 30,
                          padding: 10,
                          textAlign: 'center',
                          background: '#3a8df0',
                          margin: 10,
                          color: 'white',
                          borderRadius: 20,
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setQuestionCounter(question);
                          setCorrectPopup(false);
                        }}
                      >
                        {question + 1}
                      </span>
                    );
                  })}
                </div>
              </>
            )}

            {ungivenState.number === 0 && (
              <>
                <h3>Hai completato il quiz!</h3>
                <p>Vuoi correggerlo?</p>
                <Button
                  variant='contained'
                  className='correct_btn'
                  onClick={forceCorrect}
                >
                  Correggi
                </Button>
                <p>Torna al quiz</p>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UngivenModal;
