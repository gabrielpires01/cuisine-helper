import { Routes, Route } from 'react-router-dom';
import Timeline from './pages/Timeline/Timeline';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Timeline />}/>

      
    </Routes>
  );
}

export default App;
