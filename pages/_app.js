import '../styles/globals.css';
import PageTransition from '../components/PageTransition';

function MyApp({ Component, pageProps }) {
  return (
    <PageTransition>
      <Component {...pageProps} />
    </PageTransition>
  );
}

export default MyApp;
