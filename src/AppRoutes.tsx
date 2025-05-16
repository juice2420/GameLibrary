import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import {Page1} from './Page1'
import {Page2} from './Page2'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Page1" element={<Page1 />} />
        <Route path="/Page2" element={<Page2 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
