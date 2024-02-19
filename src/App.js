import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import LayoutComponent from './layout/index';


function App() {
  return (
    <div>
     <BrowserRouter>
     <LayoutComponent/>
     </BrowserRouter>
    </div>
  );
}

export default App;
