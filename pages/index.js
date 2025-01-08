import Head from 'next/head';
    import Header from '../components/Header';
    import Hero from '../components/Hero';
    import Features from '../components/Features';
    import Footer from '../components/Footer';

    export default function Home() {
      return (
        <>
          <Head>
            <title>VocalHost.ai - AI-Powered Call Automation</title>
            <meta
              name="description"
              content="Revolutionize your business calls with VocalHost.ai. AI-powered call handling and customer interaction, seamlessly integrated."
            />
            <meta property="og:title" content="VocalHost.ai - AI-Powered Call Automation" />
            <meta
              property="og:description"
              content="Revolutionize your business calls with VocalHost.ai. AI-powered call handling and customer interaction, seamlessly integrated."
            />
            <meta property="og:image" content="https://vocalhost.ai/og-image.png" />
            <meta property="og:url" content="https://vocalhost.ai" />
            <meta name="twitter:card" content="summary_large_image" />
          </Head>
          <div className="min-h-screen">
            <Header />
            <Hero />
            <Features />
            <Footer />
          </div>
        </>
      );
    }
