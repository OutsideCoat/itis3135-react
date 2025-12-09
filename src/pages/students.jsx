import { useEffect, useMemo, useState } from "react";
import "../styles/students.css";

const DATA_URL =
  "https://dvonb.xyz/api/2025-fall/itis-3135/students?full=1";
const MEDIA_BASE = "https://dvonb.xyz";

const linkLabels = {
  charlotte: "UNCC Page",
  github: "GitHub",
  githubio: "GitHub Pages",
  itis3135: "ITIS3135 Site",
  freecodecamp: "freeCodeCamp",
  codecademy: "Codecademy",
  linkedin: "LinkedIn",
  other: "Link",
};

function formatName(name = {}) {
  const fullName = [
    name.first,
    name.middleInitial ? `${name.middleInitial}.` : "",
    name.last,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  if (name.preferred && name.preferred !== name.first) {
    return `${name.preferred} ${name.last} (${fullName})`;
  }

  return fullName || "Unknown Student";
}

function capitalizeLabel(label) {
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function StudentCard({ student }) {
  const {
    name,
    prefix,
    acknowledgement,
    acknowledgementDate,
    mascot,
    divider,
    platform,
    backgrounds,
    courses,
    personalStatement,
    quote,
    funFact,
    additional,
    links,
    media,
  } = student;

  const displayName = formatName(name);
  const imageSrc =
    media?.hasImage && media?.src ? `${MEDIA_BASE}${media.src}` : null;

  return (
    <article className="student-card">
      <header className="student-card__header">
        <div className="student-card__title">
          <p className="student-card__prefix">{prefix || "n/a"}</p>
          <h3 className="student-card__name">{displayName}</h3>
          {mascot ? <p className="student-card__mascot">{mascot}</p> : null}
          {acknowledgement || acknowledgementDate ? (
            <p className="student-card__ack">
              {acknowledgement}
              {acknowledgementDate ? ` — ${acknowledgementDate}` : ""}
            </p>
          ) : null}
          {platform ? (
            <p className="student-card__platform">
              {platform.device}
              {platform.os ? ` ${divider || "|"} ${platform.os}` : ""}
            </p>
          ) : null}
        </div>
        {imageSrc ? (
          <figure className="student-card__media">
            <img src={imageSrc} alt={`${displayName} headshot`} loading="lazy" />
            {media.caption ? <figcaption>{media.caption}</figcaption> : null}
          </figure>
        ) : null}
      </header>

      <div className="student-card__body">
        {backgrounds ? (
          <dl className="student-card__backgrounds">
            {["personal", "professional", "academic", "subject"].map((key) =>
              backgrounds[key] ? (
                <div key={key}>
                  <dt>{capitalizeLabel(key)}</dt>
                  <dd>{backgrounds[key]}</dd>
                </div>
              ) : null,
            )}
          </dl>
        ) : null}

        {courses?.length ? (
          <div className="student-card__courses">
            <h4>Courses</h4>
            <ul>
              {courses.map((course, idx) => {
                const code =
                  course.code ||
                  [course.dept, course.num].filter(Boolean).join(" ");
                return (
                  <li key={`${code}-${idx}`}>
                    <strong>{code}</strong>
                    {course.name ? ` — ${course.name}` : ""}
                    {course.reason ? ` | ${course.reason}` : ""}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {personalStatement ? (
          <p className="student-card__statement">
            <strong>Personal Statement:</strong> {personalStatement}
          </p>
        ) : null}

        {funFact ? (
          <p className="student-card__fact">
            <strong>Fun Fact:</strong> {funFact}
          </p>
        ) : null}

        {quote?.text ? (
          <blockquote className="student-card__quote">
            <p>{quote.text}</p>
            {quote.author ? <cite>— {quote.author}</cite> : null}
          </blockquote>
        ) : null}

        {additional && additional.toLowerCase() !== "n/a" ? (
          <p className="student-card__additional">
            <strong>Additional:</strong> {additional}
          </p>
        ) : null}

        {links && Object.values(links).some(Boolean) ? (
          <div className="student-card__links">
            <h4>Links</h4>
            <div className="student-card__linklist">
              {Object.entries(links).map(([key, value]) =>
                value ? (
                  <a
                    key={key}
                    href={value}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {linkLabels[key] || capitalizeLabel(key)}
                  </a>
                ) : null,
              )}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}

function Students() {
  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let isActive = true;
    setStatus("loading");
    fetch(DATA_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`);
        }
        return response.json();
      })
      .then((payload) => {
        if (!isActive) return;
        if (!Array.isArray(payload)) {
          throw new Error("Unexpected response shape.");
        }
        setStudents(payload);
        setStatus("ready");
      })
      .catch((err) => {
        if (!isActive) return;
        setError(err.message || "Unknown error");
        setStatus("error");
      });

    return () => {
      isActive = false;
    };
  }, []);

  const filteredStudents = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return students;

    return students.filter((student) => {
      const haystack = [];
      haystack.push(student.prefix || "");
      if (student.name) {
        haystack.push(
          [
            student.name.first,
            student.name.preferred,
            student.name.last,
          ].join(" "),
        );
      }
      if (student.mascot) haystack.push(student.mascot);
      if (student.funFact) haystack.push(student.funFact);
      if (student.quote?.text) haystack.push(student.quote.text);
      if (student.backgrounds) {
        haystack.push(...Object.values(student.backgrounds));
      }
      if (student.courses?.length) {
        haystack.push(
          student.courses
            .map(
              (course) =>
                `${course.code || ""} ${course.name || ""} ${course.reason || ""}`,
            )
            .join(" "),
        );
      }
      if (student.links) {
        haystack.push(...Object.values(student.links));
      }
      return haystack
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term));
    });
  }, [search, students]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [search, viewMode, students.length]);

  useEffect(() => {
    setCurrentIndex((prev) =>
      filteredStudents.length ? Math.min(prev, filteredStudents.length - 1) : 0,
    );
  }, [filteredStudents.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredStudents.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === filteredStudents.length - 1 ? 0 : prev + 1,
    );
  };

  const currentStudent =
    viewMode === "single" && filteredStudents.length
      ? filteredStudents[currentIndex]
      : null;

  return (
    <section className="students-page" aria-labelledby="students-heading">
      <div className="students-page__intro">
        <h2 id="students-heading">Class Introductions</h2>
        <p>
          Pulling everyone&apos;s submitted introduction data straight from the{" "}
          <a href={DATA_URL} target="_blank" rel="noreferrer">
            course API
          </a>
          . Use the controls below to browse, search, or step through one
          student at a time.
        </p>
      </div>

      <div className="students-controls">
        <label className="students-controls__search">
          <span>Search by name, prefix, mascot, or keyword</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="e.g. jbedell, bear, cybersecurity"
          />
        </label>
        <div className="students-controls__buttons">
          <button
            type="button"
            className={viewMode === "list" ? "active" : ""}
            onClick={() => setViewMode("list")}
          >
            Show all
          </button>
          <button
            type="button"
            className={viewMode === "single" ? "active" : ""}
            onClick={() => setViewMode("single")}
            disabled={!filteredStudents.length}
          >
            Show one at a time
          </button>
          <button type="button" onClick={() => setSearch("jbedell")}>
            Jump to my entry
          </button>
        </div>
      </div>

      {status === "loading" ? (
        <p className="students-status">Loading student introductions…</p>
      ) : null}

      {status === "error" ? (
        <p className="students-status students-status--error">
          Couldn&apos;t load the class data. {error}
        </p>
      ) : null}

      {status === "ready" && !filteredStudents.length ? (
        <p className="students-status">No matches found.</p>
      ) : null}

      {status === "ready" && filteredStudents.length ? (
        viewMode === "single" ? (
          <div className="students-single">
            <div className="students-single__controls">
              <button
                type="button"
                onClick={handlePrev}
                disabled={filteredStudents.length < 2}
              >
                Previous
              </button>
              <span>
                Showing {currentIndex + 1} of {filteredStudents.length}
              </span>
              <button
                type="button"
                onClick={handleNext}
                disabled={filteredStudents.length < 2}
              >
                Next
              </button>
            </div>
            {currentStudent ? <StudentCard student={currentStudent} /> : null}
          </div>
        ) : (
          <div className="students-grid">
            {filteredStudents.map((student) => (
              <StudentCard key={student.prefix} student={student} />
            ))}
          </div>
        )
      ) : null}
    </section>
  );
}

export default Students;
