import headshot from "../assets/headshot.jpg";

function Introduction() {
  return (
    <article id="intro">
      <h2 id="bedell-jamison">Bedell, Jamison - Introduction</h2>
      <p>
        <em>
          I acknowledge that information posted here is public. - JB, 2025-09-04
        </em>
      </p>
      <p className="display-line">Jamison "Jamie" Bedell ~ Jolly Bear</p>
      <figure className="profile-figure">
        <img
          src={headshot}
          alt="Jamison Bedell headshot"
          className="headshot"
        />
        <figcaption>At the Renaissance Festival in 2024</figcaption>
      </figure>
      <section className="content-block">
        <h3>Background and Course Information</h3>
        <ul className="info-list">
          <li>
            <strong>Personal Background:</strong> I was born in Charlotte, I
            mostly just do my own thing! I like to hang out with my partner,
            tinker with computers, play games.
          </li>
          <li>
            <strong>Professional Background:</strong> Haven&apos;t done much
            professionally, worked for a non profit as a lab tech when I was in
            high school.
          </li>
          <li>
            <strong>Academic Background:</strong> CS major at UNC Charlotte.
            Concentration in cybersecurity. This is my third year here.
          </li>
          <li>
            <strong>Background in this Subject:</strong> I have some HTML
            experience, I like to make my own websites and such so I&apos;d
            imagine I have an intermediate understanding. I can do a lot I
            believe.
          </li>
          <li>
            <strong>Primary Computer Platform:</strong> Custom desktop, Windows
            11, at-home workstation.
          </li>
          <li>
            <strong>Courses I&apos;m Taking &amp; Why:</strong>
            <ul>
              <li>
                <strong>ITIS 3135 - Web Design &amp; Development:</strong>{" "}
                Course is required for my major, but seems fun.
              </li>
              <li>
                <strong>ITSC 3155 - Software Engineering:</strong> Also required
                for major.
              </li>
              <li>
                <strong>STAT 2122 - Intro To Prob and Stat:</strong> Required
                for my major.
              </li>
              <li>
                <strong>GEOG 1511 - Local Social Science:</strong> I&apos;m
                passionate about urban planning and urban development, so I
                really wanted to take this class.
              </li>
            </ul>
          </li>
          <li>
            <strong>Funny/Interesting Item to Remember me by:</strong> My dad
            and I have the same initials!
          </li>
        </ul>
      </section>
      <section>
        <h3>Favorite Quote</h3>
        <p className="favorite-quote">
          &quot;I&apos;m not a fan of quotes. I don&apos;t like sounding
          pretentious&quot;
          <br />- <em>Jamison Bedell</em>
        </p>
      </section>
    </article>
  );
}

export default Introduction;
