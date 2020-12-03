import React from 'react';
import { PaginatedList } from 'react-paginated-list';
import MDEditor from '@uiw/react-md-editor';
import firebase from 'firebase';

const QuestionsList = ({ questionsList, theoryList }) => {
  const getTheory = (answer) => {
    const theoryItem = theoryList.filter((element) => {
      if (element.id === answer) {
        return element.theory;
      } else {
      }
    });
    console.log(theoryItem);
    if (theoryItem.length !== 0) return theoryItem[0].theory;
  };
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      {questionsList && <h1>Numero di domande: {questionsList.length}</h1>}

      <div
        className='questions'
        onClick={(e) => {
          if (e.target.className === 'delete') {
            firebase
              .firestore()
              .collection('questions')
              .doc(e.target.id)
              .delete()
              .then(() => {
                console.log('Domanda cancellata con successo');
              });
          }
        }}
      >
        {questionsList && theoryList && (
          <PaginatedList
            list={questionsList}
            itemsPerPage={10}
            renderList={(list) => (
              <>
                {list.map((question, id) => {
                  return (
                    <div key={question.id} className='questions-container'>
                      <div className='image-container'>
                        {question.image && (
                          <img
                            src={question.image}
                            alt='Immagine non disponibile'
                          />
                        )}
                        {!question.image && (
                          <div className='no-image'>No image</div>
                        )}
                      </div>

                      <p
                        className={`questions-item answer ${
                          question.response ? 'true' : 'false'
                        }`}
                      >
                        {question.response ? 'Vero' : 'Falso'}
                      </p>

                      <p className='questions-item'>{question.question}</p>

                      <MDEditor.Markdown source={getTheory(question.answer)} />

                      <p className='questions-item'>{question.category}</p>

                      <p className='questions-item-delete'>
                        <button className='delete' id={question.id}>
                          Elimina
                        </button>
                      </p>
                    </div>
                  );
                })}
              </>
            )}
          />
        )}
      </div>
    </>
  );
};

export default QuestionsList;
