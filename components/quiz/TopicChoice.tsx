import React from 'react';

// Layout
import QuizTopicsList from './QuizTopicsList';
import Link from 'next/link';
import { Button } from '@material-ui/core';

// Css Import
import '../../style/quizTopics.min.css';

const TopicChoice = ({ filters, setFilters, startQuiz }) => {
  return (
    <div className='topic-choice '>
      <div className='container-full'>
        <div className='topic-choice-top'>
          <h2>Scegli argomenti per il quiz</h2>

          <div>
            <Button variant='contained' className='start' onClick={startQuiz}>
              Inizia quiz
            </Button>
            <Link href='/' passHref>
              <a style={{ textDecoration: 'none' }}>
                <Button variant='contained' className='close_quiz'>
                  Esci
                </Button>
              </a>
            </Link>
          </div>
        </div>
        {/* Theory List */}
        <QuizTopicsList filters={filters} setFilters={(e) => setFilters(e)} />
      </div>
    </div>
  );
};

export default TopicChoice;
