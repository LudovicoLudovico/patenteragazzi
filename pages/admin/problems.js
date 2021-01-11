import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import firebase from 'firebase/app';
import ProblemItem from '../../components/admin/ProblemItem';
import TheoryProblemItem from '../../components/admin/TheoryProblemItem';
import { useUser } from '../../context/userContext';
import '../../admin.min.css';

const problems = () => {
  const [questionsProblems, setQuestionsProblems] = useState([]);
  const [theoryProblems, setTheoryProblems] = useState([]);
  const { isAdmin } = useUser();

  useEffect(() => {
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
            },
          ]);
        });
      });
  }, []);
  if (isAdmin) {
    return (
      <div>
        <Navbar isAdminNav={true} active='problems' />

        <div className='main_content container-full admin_problems'>
          <h1>Problemi</h1>

          <h2>Problemi con le domande</h2>

          {questionsProblems.length === 0 && (
            <p>Non ci sono problemi segnalati</p>
          )}
          {questionsProblems.map((prob) => {
            return (
              <ProblemItem
                questionId={prob.questionId}
                id={prob.id}
                image={prob.image}
                question={prob.question}
                response={prob.response}
                category={prob.category}
                answer={prob.answer}
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
