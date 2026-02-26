import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ProfilePage.css";
import { useAuth } from "../utils/AuthContext";
import * as api from "../utils/api";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, token, updateUser } = useAuth();
  const [profile, setProfile] = useState(user);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    bio: user?.bio || "",
    avatar: user?.avatar || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const updated = await api.updateProfile(user.id, formData, token);
      setProfile(updated);
      updateUser(updated);
      setEditing(false);
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>

        <div className="profile-card">
          <h2>My Profile</h2>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          {editing ? (
            <form onSubmit={handleSaveProfile} className="profile-form">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>Avatar URL</label>
                <input
                  type="url"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              {formData.avatar && (
                <div className="avatar-preview">
                  <img src={formData.avatar} alt="Avatar preview" />
                </div>
              )}

              <div className="button-group">
                <button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setFormData({
                      username: profile?.username || "",
                      bio: profile?.bio || "",
                      avatar: profile?.avatar || "",
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-view">
              {profile?.avatar && (
                <img
                  src={profile.avatar}
                  alt={profile.username}
                  className="avatar-large"
                />
              )}

              <div className="profile-info">
                <p>
                  <strong>Username:</strong> {profile?.username}
                </p>
                <p>
                  <strong>Email:</strong> {profile?.email}
                </p>
                {profile?.bio && (
                  <p>
                    <strong>Bio:</strong> {profile.bio}
                  </p>
                )}
                <p>
                  <strong>Member since:</strong>{" "}
                  {new Date(profile?.createdAt).toLocaleDateString()}
                </p>
              </div>

              <button onClick={() => setEditing(true)} className="edit-btn">
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
