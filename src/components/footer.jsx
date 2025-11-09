const footerLinks = [
  { href: "https://webpages.charlotte.edu/jbedell", label: "Webspace" },
  { href: "https://github.com/outsidecoat", label: "GitHub" },
  { href: "https://outsidecoat.github.io", label: "GitHub.io" },
  { href: "https://www.freecodecamp.org/OutsideCoat", label: "FreeCodeCamp" },
  { href: "https://www.codecademy.com/profiles/OutsideCoat", label: "Codecademy" },
  { href: "https://www.linkedin.com/in/jamison-bedell/", label: "LinkedIn" },
  {
    href: "https://outsidecoat.github.io/itis3135/fccfsjs_outline.html",
    label: "FCC JavaScript Outline",
  },
];

function Footer() {
  return (
    <footer>
      <nav aria-label="Site resources">
        {footerLinks.map((link, index) => (
          <span key={link.href}>
            <a href={link.href}>{link.label}</a>
            {index < footerLinks.length - 1 && (
              <span className="nav-separator" aria-hidden="true">
                {" "}
                |{" "}
              </span>
            )}
          </span>
        ))}
      </nav>
      <p>
        Designed by Jamison Design Co -{" "}
        <a href="https://outsidecoat.github.io/itis3135/jamisonbedelldesign.com/index.html">
          Jamison Design Co
        </a>
      </p>
    </footer>
  );
}

export default Footer;
