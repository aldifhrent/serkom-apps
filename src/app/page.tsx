import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import Benefit from '@/components/benefit'
import Footer from '@/components/footer'
export default async function Home() {
  return (
    <main>
      <Navbar/>
      <Hero/>
      <Benefit/>
      <Footer/>
    </main>
  )
}
