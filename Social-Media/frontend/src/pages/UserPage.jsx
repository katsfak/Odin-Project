import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import Post from "../components/Post.jsx";
import "../styles/ProfilePage.css";
import { useAuth } from "../utils/AuthContext.jsx";
import * as api from "../utils/api.js";

export default function UserPage() {
  const { userId } = useParams();
  const { token, user: currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followStatus, setFollowStatus] = useState("none");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("posts");
  const [followingList, setFollowingList] = useState([]);
  const [followersList, setFollowersList] = useState([]);

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  async function fetchProfile() {
    try {
      setLoading(true);
      const profileData = await api.getUserProfile(token, userId);
      setProfile(profileData);

      const postsData = await api.getUserPosts(token, userId);
      setPosts(postsData.posts);

      if (currentUser.id !== userId) {
        const statusData = await api.checkFollowStatus(token, userId);
        setFollowStatus(statusData.status);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleFollow() {
    try {
      await api.sendFollowRequest(token, userId);
      setFollowStatus("pending");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUnfollow() {
    try {
      await api.unfollow(token, userId);
      setFollowStatus("none");
    } catch (err) {
      setError(err.message);
    }
  }

  async function fetchFollowing() {
    try {
      const data = await api.getFollowing(token, userId);
      setFollowingList(data.users);
    } catch (err) {
      setError(err.message);
    }
  }

  async function fetchFollowers() {
    try {
      const data = await api.getFollowers(token, userId);
      setFollowersList(data.users);
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="loading">Loading profile...</div>
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <NavBar />
        <div className="error-message">Profile not found</div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="profile-container">
        <div className="profile-card">
          {profile.profileImage && (
            <img
              src={profile.profileImage}
              alt={profile.username}
              className="profile-avatar"
            />
          )}

          <h1>{profile.username}</h1>
          {profile.bio && <p className="profile-bio">{profile.bio}</p>}

          <div className="profile-stats">
            <div className="stat">
              <span className="stat-value">{profile._count.posts}</span>
              <span className="stat-label">Posts</span>
            </div>
            <button
              className="stat-link"
              onClick={() => {
                fetchFollowers();
                setTab("followers");
              }}
            >
              <span className="stat-value">{profile._count.followers}</span>
              <span className="stat-label">Followers</span>
            </button>
            <button
              className="stat-link"
              onClick={() => {
                fetchFollowing();
                setTab("following");
              }}
            >
              <span className="stat-value">{profile._count.following}</span>
              <span className="stat-label">Following</span>
            </button>
          </div>

          {currentUser.id !== userId && (
            <div className="profile-actions">
              {followStatus === "none" && (
                <button className="follow-btn" onClick={handleFollow}>
                  Follow
                </button>
              )}
              {followStatus === "pending" && (
                <button className="pending-btn" disabled>
                  Request Pending
                </button>
              )}
              {followStatus === "accepted" && (
                <button className="unfollow-btn" onClick={handleUnfollow}>
                  Unfollow
                </button>
              )}
            </div>
          )}

          {currentUser.id === userId && (
            <Link to="/profile" className="edit-profile-btn">
              Edit Profile
            </Link>
          )}
        </div>

        <div className="profile-tabs">
          <button
            className={`tab-btn ${tab === "posts" ? "active" : ""}`}
            onClick={() => setTab("posts")}
          >
            Posts
          </button>
          <button
            className={`tab-btn ${tab === "following" ? "active" : ""}`}
            onClick={() => {
              fetchFollowing();
              setTab("following");
            }}
          >
            Following
          </button>
          <button
            className={`tab-btn ${tab === "followers" ? "active" : ""}`}
            onClick={() => {
              fetchFollowers();
              setTab("followers");
            }}
          >
            Followers
          </button>
        </div>

        <div className="profile-content">
          {tab === "posts" && (
            <div className="posts-list">
              {posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
              {posts.length === 0 && (
                <div className="no-posts">No posts yet</div>
              )}
            </div>
          )}

          {tab === "following" && (
            <div className="users-list">
              {followingList.map((user) => (
                <Link
                  key={user.id}
                  to={`/user/${user.id}`}
                  className="user-item"
                >
                  {user.profileImage && (
                    <img
                      src={user.profileImage}
                      alt={user.username}
                      className="user-avatar"
                    />
                  )}
                  <div className="user-info">
                    <p className="user-username">{user.username}</p>
                    {user.bio && <p className="user-bio">{user.bio}</p>}
                    <p className="user-followers">{user.followers} followers</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {tab === "followers" && (
            <div className="users-list">
              {followersList.map((user) => (
                <Link
                  key={user.id}
                  to={`/user/${user.id}`}
                  className="user-item"
                >
                  {user.profileImage && (
                    <img
                      src={user.profileImage}
                      alt={user.username}
                      className="user-avatar"
                    />
                  )}
                  <div className="user-info">
                    <p className="user-username">{user.username}</p>
                    {user.bio && <p className="user-bio">{user.bio}</p>}
                    <p className="user-followers">{user.followers} followers</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
