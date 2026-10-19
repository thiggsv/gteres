import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { Header } from './components/Header'
import Contact from './components/Contact'
import './App.css'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Header
        brand="Geração Tech"
        description="Sede Bezerra"
      >
        <a href="#equipe">Equipe</a>
        <NavLink to="/contato">Contato</NavLink>
      </Header>

    
      <main className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;
