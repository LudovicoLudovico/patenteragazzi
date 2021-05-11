import React, { useState, useEffect } from 'react';
import Navbar from '../../components/general/Navbar';
import firebase from 'firebase/app';
import ProblemItem from '../../components/admin/ProblemItem';
import TheoryProblemItem from '../../components/admin/TheoryProblemItem';
import { useUser } from '../../context/userContext';
import { useAdmin } from '../../context/adminContext';
import '../../style/admin.min.css';

const problems = () => {
  const [questionsProblems, setQuestionsProblems] = useState([]);
  const [theoryProblems, setTheoryProblems] = useState([]);
  const { isAdmin } = useUser();

  const { theoryList, getTheoryList } = useAdmin();

  useEffect(() => {
    getTheoryList();
    firebase
      .firestore()
      .collection('problems')
      .where('type', '==', 'question')
      .onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setQuestionsProblems((questionsProblems) => [
            ...questionsProblems,
            {
              id: doc.id,
              questionId: doc.data().questionId,
              question: doc.data().question,
              category: doc.data().category,
              answer: doc.data().answer,
              response: doc.data().response,
              image: doc.data().image,
              hasProblemAnswer: doc.data().hasProblemAnswer,
              hasProblemImage: doc.data().hasProblemImage,
              hasProblemQuestion: doc.data().hasProblemQuestion,
            },
          ]);
        });
      });
    firebase
      .firestore()
      .collection('problems')
      .where('type', '==', 'theory')
      .onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setTheoryProblems((theoryProblems) => [
            ...theoryProblems,
            {
              id: doc.id,
              theoryId: doc.data().theoryId,
              theory: doc.data().theory,
              category: doc.data().category,
              title: doc.data().title,
              image: doc.data().image,
              hasProblemContent: doc.data().hasProblemContent,
              hasProblemImage: doc.data().hasProblemImage,
              hasProblemTypo: doc.data().hasProblemTypo,
            },
          ]);
        });
      });
  }, []);
  if (isAdmin) {
    return (
      <div>
        <Navbar isAdminNav={true} active='problems' />

        <div className='main_content container admin_problems'>
          <h1>Problemi</h1>

          <h2>Problemi con le domande</h2>

          {questionsProblems.length === 0 && (
            <p>Non ci sono problemi segnalati</p>
          )}
          {questionsProblems.map((prob) => {
            const theory = theoryList.filter((theoryItem) => {
              return theoryItem.id == prob.theory;
            });
            return (
              <ProblemItem
                questionId={prob.questionId}
                id={prob.id}
                image={prob.image}
                question={prob.question}
                response={prob.response}
                category={prob.category}
                answer={prob.answer}
                theory={theory}
                hasProblemAnswer={prob.hasProblemAnswer}
                hasProblemQuestion={prob.hasProblemQuestion}
                hasProblemImage={prob.hasProblemImage}
              />
            );
          })}

          <h2>Problemi con la teoria</h2>
          {theoryProblems.length === 0 && <p>Non ci sono problemi segnalati</p>}
          {theoryProblems.map((prob) => {
            return (
              <TheoryProblemItem
                theoryId={prob.theoryId}
                id={prob.id}
                image={prob.image}
                title={prob.title}
                theory={prob.theory}
                category={prob.category}
                hasProblemContent={prob.hasProblemContent}
                hasProblemTypo={prob.hasProblemTypo}
                hasProblemImage={prob.hasProblemImage}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div>Non sei una admin, non rompere le balle</div>;
  }
};

export default problems;
