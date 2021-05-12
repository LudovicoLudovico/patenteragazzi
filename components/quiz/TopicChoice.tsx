// Layout
import QuizTopicsList from './QuizTopicsList';
import Link from 'next/link';

// Css Import
import '../../style/quizTopics.min.css';

const TopicChoice = ({ filters, setFilters, startQuiz }) => {
  return (
    <div className='topic-choice'>
      <div className='container'>
        <div className='topic-choice-top'>
          <h2>Scegli argomenti per il quiz</h2>

          <div>
            <button onClick={startQuiz} className='start'>
              Inizia quiz
            </button>

            <Link href='/'>
              <a style={{ textDecoration: 'none' }}>
                <button
                  className='close_quiz'
                  style={{ backgroundColor: '#9d0606' }}
                >
                  Esci
                </button>
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
