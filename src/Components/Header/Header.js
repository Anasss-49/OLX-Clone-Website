import { useContext } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { user } = useContext(AuthContext);
  const { Fauth } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(Fauth).then(() => {
      navigate('/'); // Navigate to the homepage after logout
    });
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>

        {/* Login/Welcome Section */}
        <div className="loginPage">
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div>Welcome {user.displayName}</div>
              <div onClick={handleLogout}>Logout
              </div>
            </div>
          ) : (
            <span
              onClick={() => {
                navigate('/login');
              }}
            >
              Login
            </span>
          )}
        </div>

        {/* Sell Section */}
        <div className="sellMenu">
          <SellButton />
          <div className="sellMenuContent"
            onClick={() => {
              navigate('/create')
            }}>
            <SellButtonPlus />
            <span

            >SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
