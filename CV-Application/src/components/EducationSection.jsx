import "../styles/Section.css";

function EducationSection({ data, isEditing, onChange, onSubmit, onEdit }) {
  return (
    <section className="section-card">
      <h2>Educational Experience</h2>

      {isEditing ? (
        <form onSubmit={onSubmit} className="section-form">
          <label htmlFor="schoolName">School Name</label>
          <input
            id="schoolName"
            name="schoolName"
            type="text"
            value={data.schoolName}
            onChange={onChange}
            required
          />

          <label htmlFor="studyTitle">Title of Study</label>
          <input
            id="studyTitle"
            name="studyTitle"
            type="text"
            value={data.studyTitle}
            onChange={onChange}
            required
          />

          <label htmlFor="studyDate">Date of Study</label>
          <input
            id="studyDate"
            name="studyDate"
            type="date"
            value={data.studyDate}
            onChange={onChange}
            required
          />

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="submitted-content">
          <p>
            <strong>School:</strong> {data.schoolName}
          </p>
          <p>
            <strong>Study:</strong> {data.studyTitle}
          </p>
          <p>
            <strong>Date:</strong> {data.studyDate}
          </p>
          <button type="button" onClick={onEdit}>
            Edit
          </button>
        </div>
      )}
    </section>
  );
}

export default EducationSection;
