import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Barra from './components/barra'
import Index from './screens/index';
import Historial from './screens/Historial';
import Blockchain from './screens/blockchain';
import Riesgo from './screens/Riesgo';

function App() {

  return (
    <>
      <BrowserRouter>
        <Barra />
        <Routes>
          <Route index element={<Index />} />
          <Route path='/historial' element={<Historial />} />
          <Route path='/blockchain' element={<Blockchain />} />
          <Route path='/mapa' element={<Riesgo />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
