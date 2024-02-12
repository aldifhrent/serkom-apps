import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import Benefit from '@/components/benefit'
import Footer from '@/components/footer'
import Header from '@/components/header'
export default async function Home() {
  return (
    <main>
      <Header/>
      <Hero/>
      <Benefit/>
      <Footer/>
    </main>
  )
}
