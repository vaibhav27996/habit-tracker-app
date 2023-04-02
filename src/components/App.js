import { Route ,Routes} from "react-router-dom";
import '../styles/App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Habits from '../components/Habits';

function App () {
  return (
      <div className="App">
        <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        
        />
         <Navbar />
        <Routes>
            <Route  exact path="/" element={<Habits />}></Route>
        </Routes>
      </div>
  );
}

export default App;
