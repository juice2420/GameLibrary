import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import {Page1} from './components/Page1'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Page1" element={<Page1 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
