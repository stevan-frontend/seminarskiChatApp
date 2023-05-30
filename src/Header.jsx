import logo from "./logo.svg";

const Header = () => {
  return (
    <header className="title">
      <img src={logo} width="80px" alt="logo" />
      <h1>reactChat App</h1>
    </header>
  );
};

export default Header;
