import UserProvider from '../context/userContext';
import QuestionsProvider from '../context/questionsContext';
import '../main.min.css';

// Custom App to wrap it with context provider
export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <QuestionsProvider>
        <Component {...pageProps} />
      </QuestionsProvider>
    </UserProvider>
  );
}
