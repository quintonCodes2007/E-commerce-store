import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, User } from 'lucide-react';
import  { Link } from 'react-router-dom';

const Navbar = () => {
    const user = false;
    const isAdmin = true;

  return (
       
    
    <header className="navbar-style">
  <div className="container mx-auto navbar-container">
    <Link to="/" className="logo-link">
      Absolutely Nothing E-Commerce
    </Link>

    <nav className="navbar-nav">
      <Link to="/" className="nav-link">
        Home
      </Link>

      {user && (
        <Link to="/cart" className="cart-link">
          <ShoppingCart className="cart-icon icon-spacing" size={20} />

          <span className="mobile-hidden">Cart</span>

          <span className="cart-badge">
            10
          </span>
        </Link>
      )}

      {isAdmin && (
        <Link className="dashboard-btn">
          <Lock className="icon-spacing" size={18} />
          <span className="mobile-hidden">Dashboard</span>
        </Link>
      )}

      {user ? (
        <button className="logout-btn">
          <LogOut className="icon-spacing" size={18} />
          <span className="mobile-hidden">Logout</span>
        </button>
      ) : (
        <>
          <Link to="/signup" className="auth-btn">
            <UserPlus className="icon-spacing" size={18} />
            Sign Up
          </Link>

          <Link to="/login" className="auth-btn">
            <LogIn className="icon-spacing" size={18} />
            Login
          </Link>
        </>
      )}
    </nav>
  </div>
</header>
  )
}

export default Navbar