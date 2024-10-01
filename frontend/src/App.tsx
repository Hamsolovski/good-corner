
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './pages/Layout'
import RecentAds from './components/RecentAds/RecentAds'
import About from './pages/About/About'
import AdDetails from './pages/AdDetails/AdDetails'

function App() {


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<RecentAds/>} />
        <Route path='/about' element={<About />} />
        <Route path='/ad/:id' element={<AdDetails />} />
      </Route>
    </Routes>
  )
}

export default App
