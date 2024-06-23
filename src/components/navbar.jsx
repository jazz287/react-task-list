import logo from "../assets/icon.svg";
import "../styles/navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="left">
        <img src={logo} alt="logo" width={30} height={30} />
        <div className="slash"></div>
        <div className="title">
            My ToDo's
        </div>
      </div>
    </div>
  );
}

export default Navbar;
