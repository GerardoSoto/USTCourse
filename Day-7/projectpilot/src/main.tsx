import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Container } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Container fixed>
      <BrowserRouter>
        <App />   
      </BrowserRouter>
    </Container>
  </StrictMode>,
)
