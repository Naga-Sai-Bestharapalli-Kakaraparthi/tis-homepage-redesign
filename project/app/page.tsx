import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import SportsGrid from '@/components/SportsGrid';
import Testimonials from '@/components/Testimonials';
import InquiryForm from '@/components/InquiryForm';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main className="hide-cursor">
        <Hero />
        <Stats />
        <SportsGrid />
        <Testimonials />
        <InquiryForm />
      </main>
      <Footer />
    </>
  );
}
