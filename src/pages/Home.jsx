import Facts from '../components/Facts'
import Hero from '../components/Hero'
import TrendingApps from '../components/TrendingApps'
import useDocumentTitle from '../hooks/useDocumentTitle'

function Home() {
  useDocumentTitle('Productive Apps for Smarter Living', false)
  
  return (
    <div>
      <Hero />
      <Facts/>
      <TrendingApps />
    </div>
  )
}

export default Home