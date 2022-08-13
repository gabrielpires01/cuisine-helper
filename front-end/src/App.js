import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Timeline from './pages/Timeline/Timeline';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Timeline />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
