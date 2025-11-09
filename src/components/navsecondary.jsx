const secondaryLinks = [
  {
    href: "https://outsidecoat.github.io/itis3135/AWFULWEBSITE/INNE()()ndex.htm",
    label: "Terrible Website",
  },
  {
    href: "https://outsidecoat.github.io/itis3135/hobby/index.html",
    label: "Hobby",
  },
];

function NavSecondary() {
  return (
    <nav className="nav-secondary" aria-label="Secondary">
      {secondaryLinks.map((link, index) => (
        <span key={link.href}>
          <a href={link.href}>{link.label}</a>
          {index < secondaryLinks.length - 1 && (
            <span className="nav-separator" aria-hidden="true">
              {" "}
              |{" "}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

export default NavSecondary;
