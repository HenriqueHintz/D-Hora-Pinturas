/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import DetailedServices from './components/DetailedServices';
import Contact from './components/Contact';
import Location from './components/Location';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-100 font-sans text-neutral-900">
      <Header />
      <main>
        <Hero />
        <DetailedServices />
        <Location />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
