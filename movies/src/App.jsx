import Home from './components/Home/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import { SearchProvider } from './context/ContextSearch';

function App() {

  return (
    <SearchProvider>
    <Home></Home>
    </SearchProvider>
  )
}

export default App
