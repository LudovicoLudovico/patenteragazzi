import React from 'react';

const UngivenModal = ({ ungivenState, correctPopup, forceCorrect }) => {
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
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UngivenModal;
