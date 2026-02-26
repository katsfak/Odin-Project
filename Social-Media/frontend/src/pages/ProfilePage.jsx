import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import "../styles/ProfilePage.css";
import { useAuth } from "../utils/AuthContext.jsx";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    bio: user?.bio || "",
    profileImage: user?.profileImage || "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await updateUser(formData);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <NavBar />
      <div className="profile-container">
        <div className="profile-card">
          {formData.profileImage && (
            <img
              src={formData.profileImage}
              alt={user?.username}
              className="profile-avatar"
            />
          )}

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label htmlFor="profileImage">Profile Image URL</label>
                <input
                  id="profileImage"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.profileImage}
                  onChange={(e) =>
                    setFormData({ ...formData, profileImage: e.target.value })
                  }
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <div className="button-group">
                <button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      username: user?.username || "",
                      bio: user?.bio || "",
                      profileImage: user?.profileImage || "",
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <h1>{user?.username}</h1>
              {user?.bio && <p className="profile-bio">{user.bio}</p>}
              <p className="profile-email">{user?.email}</p>

              <button
                className="edit-profile-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
