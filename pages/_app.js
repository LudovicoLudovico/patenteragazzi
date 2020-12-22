import UserProvider from '../context/userContext';
import QuestionsProvider from '../context/questionsContext';
import AdminProvider from '../context/adminContext';
import '../main.min.css';

const App = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <QuestionsProvider>
        <AdminProvider>
          <Component {...pageProps} />
        </AdminProvider>
      </QuestionsProvider>
    </UserProvider>
  );
};

export default App;
