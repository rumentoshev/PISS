import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import FullFeaturedCrudGrid from "../Components/DataGrid"
 // Home.propTypes = {
//   onLogout: PropTypes.func.isRequired,
// };

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    sessionStorage.setItem("isLogged","false");
    sessionStorage.setItem("userID", "");
    navigate("/"); 
  };

  return (
    <div className="home-container">
     <FullFeaturedCrudGrid />
      <button onClick={handleClick}>ZDR</button>
    </div>
  );
}

export default Home;