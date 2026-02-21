import "../styles/Section.css";

function PracticalExperienceSection({
  data,
  isEditing,
  onChange,
  onSubmit,
  onEdit,
}) {
  return (
    <section className="section-card">
      <h2>Practical Experience</h2>

      {isEditing ? (
        <form onSubmit={onSubmit} className="section-form">
          <label htmlFor="companyName">Company Name</label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            value={data.companyName}
            onChange={onChange}
            required
          />

          <label htmlFor="positionTitle">Position Title</label>
          <input
            id="positionTitle"
            name="positionTitle"
            type="text"
            value={data.positionTitle}
            onChange={onChange}
            required
          />

          <label htmlFor="responsibilities">Main Responsibilities</label>
          <textarea
            id="responsibilities"
            name="responsibilities"
            rows="4"
            value={data.responsibilities}
            onChange={onChange}
            required
          />

          <label htmlFor="dateFrom">Date From</label>
          <input
            id="dateFrom"
            name="dateFrom"
            type="date"
            value={data.dateFrom}
            onChange={onChange}
            required
          />

          <label htmlFor="dateUntil">Date Until</label>
          <input
            id="dateUntil"
            name="dateUntil"
            type="date"
            value={data.dateUntil}
            onChange={onChange}
            required
          />

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="submitted-content">
          <p>
            <strong>Company:</strong> {data.companyName}
          </p>
          <p>
            <strong>Position:</strong> {data.positionTitle}
          </p>
          <p>
            <strong>Responsibilities:</strong> {data.responsibilities}
          </p>
          <p>
            <strong>Dates:</strong> {data.dateFrom} to {data.dateUntil}
          </p>
          <button type="button" onClick={onEdit}>
            Edit
          </button>
        </div>
      )}
    </section>
  );
}

export default PracticalExperienceSection;
