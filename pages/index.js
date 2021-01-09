//General and Next
import dynamic from 'next/dynamic';

//Get Data
import { getFaq } from '../fetchData/getFaq';

//Components
import IndexNavbar from '../components/home/IndexNavbar';
import IndexHero from '../components/home/IndexHero';

const IndexTheory = dynamic(() => import('../components/home/IndexTheory'), {
  loading: () => <p>Caricamento...</p>,
});
const IndexFaq = dynamic(() => import('../components/home/IndexFaq'), {
  loading: () => <p>Caricamento...</p>,
});

const Footer = dynamic(() => import('../components/Footer'), {
  loading: () => <p>Caricamento...</p>,
});

//SEO
import Seo from '../components/Seo';

//Home Component
export default function Home({ faq }) {
  return (
    <>
      {/* SEO Init  */}
      <Seo
        title='Patenteragazzi - Quiz Patente Online AM/B'
        description="Più di 7000 domande della patente AM/B, su cui allenarsi per passare al meglio l'esame di teoria. Puoi trovare anche tutta la teoria di cui hai bisogno"
        canonical='https://patenteragazzi.it/'
      />

      <div className='index'>
        <div className='container'>
          {/* Index Navbar */}
          <IndexNavbar />

          {/* Index Hero Section -> Quiz */}
          <IndexHero />
        </div>

        {/* Theory */}
        <IndexTheory />

        {/* FAQ Section */}
        <IndexFaq faq={faq} />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

// Get Data during Build
export async function getStaticProps(context) {
  const faqRaw = await getFaq();

  return {
    props: {
      faq: JSON.parse(JSON.stringify(faqRaw)),
    },
    revalidate: 60 * 10,
  };
}
