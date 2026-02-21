import "../styles/App.css";

function showValue(value) {
  return value && value.trim() ? value : "—";
}

function CVPreview({ generalInfo, education, practical, projects, volunteer }) {
  return (
    <section className="preview-card">
      <h2>CV Preview</h2>

      <div className="preview-block">
        <h3>General Information</h3>
        <p>
          <strong>Name:</strong> {showValue(generalInfo.name)}
        </p>
        <p>
          <strong>Email:</strong> {showValue(generalInfo.email)}
        </p>
        <p>
          <strong>Phone:</strong> {showValue(generalInfo.phone)}
        </p>
      </div>

      <div className="preview-block">
        <h3>Educational Experience</h3>
        <p>
          <strong>School:</strong> {showValue(education.schoolName)}
        </p>
        <p>
          <strong>Study:</strong> {showValue(education.studyTitle)}
        </p>
        <p>
          <strong>Date:</strong> {showValue(education.studyDate)}
        </p>
      </div>

      <div className="preview-block">
        <h3>Practical Experience</h3>
        <p>
          <strong>Company:</strong> {showValue(practical.companyName)}
        </p>
        <p>
          <strong>Position:</strong> {showValue(practical.positionTitle)}
        </p>
        <p>
          <strong>Responsibilities:</strong>{" "}
          {showValue(practical.responsibilities)}
        </p>
        <p>
          <strong>Dates:</strong> {showValue(practical.dateFrom)} to{" "}
          {showValue(practical.dateUntil)}
        </p>
      </div>

      <div className="preview-block">
        <h3>Projects</h3>
        <p>
          <strong>Name:</strong> {showValue(projects.projectName)}
        </p>
        <p>
          <strong>Role:</strong> {showValue(projects.projectRole)}
        </p>
        <p>
          <strong>Description:</strong> {showValue(projects.projectDescription)}
        </p>
        <p>
          <strong>Technologies:</strong> {showValue(projects.technologies)}
        </p>
        <p>
          <strong>Date:</strong> {showValue(projects.projectDate)}
        </p>
      </div>

      <div className="preview-block">
        <h3>Volunteer Experience</h3>
        <p>
          <strong>Organization:</strong> {showValue(volunteer.organizationName)}
        </p>
        <p>
          <strong>Role:</strong> {showValue(volunteer.volunteerRole)}
        </p>
        <p>
          <strong>Responsibilities:</strong>{" "}
          {showValue(volunteer.volunteerResponsibilities)}
        </p>
        <p>
          <strong>Dates:</strong> {showValue(volunteer.volunteerDateFrom)} to{" "}
          {showValue(volunteer.volunteerDateUntil)}
        </p>
      </div>
    </section>
  );
}

export default CVPreview;
