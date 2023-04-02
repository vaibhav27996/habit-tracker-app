import '../styles/Navbar.css';
import { Link } from 'react-router-dom';


const Navbar=()=>{

    return (
        <div className="navbar">
          <span className='heading'><Link to='/' className="contactLink">Home</Link></span>
        </div>
    )

}

export default Navbar;
