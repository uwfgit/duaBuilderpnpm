import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GlobalHeader from './components/GlobalHeader'
import { AppLayout } from './components/AppLayout'
import HomePage from './pages/HomePage'
import PreviewPage from './pages/PreviewPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <GlobalHeader />
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/preview" element={<PreviewPage />} />
          </Routes>
        </AppLayout>
      </div>
    </Router>
  )
}

export default App
