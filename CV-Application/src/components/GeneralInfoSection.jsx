import "../styles/Section.css";

function GeneralInfoSection({ data, isEditing, onChange, onSubmit, onEdit }) {
  return (
    <section className="section-card">
      <h2>General Information</h2>

      {isEditing ? (
        <form onSubmit={onSubmit} className="section-form">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={data.name}
            onChange={onChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={onChange}
            required
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={data.phone}
            onChange={onChange}
            required
          />

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="submitted-content">
          <p>
            <strong>Name:</strong> {data.name}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Phone:</strong> {data.phone}
          </p>
          <button type="button" onClick={onEdit}>
            Edit
          </button>
        </div>
      )}
    </section>
  );
}

export default GeneralInfoSection;
