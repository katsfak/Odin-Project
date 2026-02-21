import "../styles/Section.css";

function VolunteerSection({ data, isEditing, onChange, onSubmit, onEdit }) {
  return (
    <section className="section-card">
      <h2>Volunteer Experience</h2>

      {isEditing ? (
        <form onSubmit={onSubmit} className="section-form">
          <label htmlFor="organizationName">Organization Name</label>
          <input
            id="organizationName"
            name="organizationName"
            type="text"
            value={data.organizationName}
            onChange={onChange}
            required
          />

          <label htmlFor="volunteerRole">Role</label>
          <input
            id="volunteerRole"
            name="volunteerRole"
            type="text"
            value={data.volunteerRole}
            onChange={onChange}
            required
          />

          <label htmlFor="volunteerResponsibilities">
            Main Responsibilities
          </label>
          <textarea
            id="volunteerResponsibilities"
            name="volunteerResponsibilities"
            rows="4"
            value={data.volunteerResponsibilities}
            onChange={onChange}
            required
          />

          <label htmlFor="volunteerDateFrom">Date From</label>
          <input
            id="volunteerDateFrom"
            name="volunteerDateFrom"
            type="date"
            value={data.volunteerDateFrom}
            onChange={onChange}
            required
          />

          <label htmlFor="volunteerDateUntil">Date Until</label>
          <input
            id="volunteerDateUntil"
            name="volunteerDateUntil"
            type="date"
            value={data.volunteerDateUntil}
            onChange={onChange}
            required
          />

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="submitted-content">
          <p>
            <strong>Organization:</strong> {data.organizationName}
          </p>
          <p>
            <strong>Role:</strong> {data.volunteerRole}
          </p>
          <p>
            <strong>Responsibilities:</strong> {data.volunteerResponsibilities}
          </p>
          <p>
            <strong>Dates:</strong> {data.volunteerDateFrom} to{" "}
            {data.volunteerDateUntil}
          </p>
          <button type="button" onClick={onEdit}>
            Edit
          </button>
        </div>
      )}
    </section>
  );
}

export default VolunteerSection;
