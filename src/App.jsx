import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from '@/pages/Home';
import Wordle from '@/pages/Wordle';
import Sopa from '@/pages/Sopa';
import Crucigrama from '@/pages/Crucigrama';
import Categorizar from '@/pages/Categorizar';
import Ahorcado from '@/pages/Ahorcado';

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wordle" element={<Wordle />} />
          <Route path="/sopa" element={<Sopa />} />
          <Route path="/crucigrama" element={<Crucigrama />} />
          <Route path="/categorizar" element={<Categorizar />} />
          <Route path="/ahorcado" element={<Ahorcado />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;