import NavPrimary from "./navprimary.jsx";
import NavSecondary from "./navsecondary.jsx";

function Header() {
  return (
    <header>
      <h1>ITIS3135 | Jamison Bedell | Jolly Bear</h1>
      <NavPrimary />
      <NavSecondary />
      <p className="tagline">
        <em>Guiding policy with a gentle roar.</em>
      </p>
    </header>
  );
}

export default Header;
