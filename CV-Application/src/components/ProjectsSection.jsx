import "../styles/Section.css";

function ProjectsSection({ data, isEditing, onChange, onSubmit, onEdit }) {
  return (
    <section className="section-card">
      <h2>Projects</h2>

      {isEditing ? (
        <form onSubmit={onSubmit} className="section-form">
          <label htmlFor="projectName">Project Name</label>
          <input
            id="projectName"
            name="projectName"
            type="text"
            value={data.projectName}
            onChange={onChange}
            required
          />

          <label htmlFor="projectRole">Your Role</label>
          <input
            id="projectRole"
            name="projectRole"
            type="text"
            value={data.projectRole}
            onChange={onChange}
            required
          />

          <label htmlFor="projectDescription">Project Description</label>
          <textarea
            id="projectDescription"
            name="projectDescription"
            rows="4"
            value={data.projectDescription}
            onChange={onChange}
            required
          />

          <label htmlFor="technologies">Technologies Used</label>
          <input
            id="technologies"
            name="technologies"
            type="text"
            value={data.technologies}
            onChange={onChange}
            placeholder="React, Node.js, PostgreSQL"
            required
          />

          <label htmlFor="projectDate">Project Date</label>
          <input
            id="projectDate"
            name="projectDate"
            type="date"
            value={data.projectDate}
            onChange={onChange}
            required
          />

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="submitted-content">
          <p>
            <strong>Project:</strong> {data.projectName}
          </p>
          <p>
            <strong>Role:</strong> {data.projectRole}
          </p>
          <p>
            <strong>Description:</strong> {data.projectDescription}
          </p>
          <p>
            <strong>Technologies:</strong> {data.technologies}
          </p>
          <p>
            <strong>Date:</strong> {data.projectDate}
          </p>
          <button type="button" onClick={onEdit}>
            Edit
          </button>
        </div>
      )}
    </section>
  );
}

export default ProjectsSection;
