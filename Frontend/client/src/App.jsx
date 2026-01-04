import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Footer from './components/Footer/Footer'
import About from './components/Hero/About'
import Services from './components/Hero/Services'
import ContactForm from './components/ContactForm/Contactform'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <div className="max-w-6xl mx-auto px-6">
        <Services />
        <About />
      <ContactForm />
        </div>
      <Footer />
    </div>
  )
}

