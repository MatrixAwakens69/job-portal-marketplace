import { useEffect, useState } from "react";

const EmployerProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    logo: "",
    description: "",
    website: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/employer/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          setError("Failed to fetch profile.");
        }
      } catch (err) {
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    try {
      const response = await fetch("/api/employer/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        alert("Profile updated successfully");
      } else {
        setError("Failed to update profile.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    try {
      const response = await fetch("/api/employer/profile", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.clear();
        window.location.href = "/employer/register";
      } else {
        setError("Failed to delete account.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="w-full max-w-md m-6 md:max-w-2xl p-8 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-2xl flex flex-col items-center">
      <h2 className="text-3xl mb-6 text-center">Profile Information</h2>
      <div className="space-y-4 w-full">
        <input
          type="text"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#3E92CC]"
          placeholder="Name"
        />
        <input
          type="email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#3E92CC]"
          placeholder="Email"
        />
        <input
          type="text"
          value={profile.logo}
          onChange={(e) => setProfile({ ...profile, logo: e.target.value })}
          className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#3E92CC]"
          placeholder="Logo URL"
        />
        <textarea
          value={profile.description}
          onChange={(e) =>
            setProfile({ ...profile, description: e.target.value })
          }
          className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#3E92CC]"
          placeholder="Description"
        />
        <input
          type="url"
          value={profile.website}
          onChange={(e) => setProfile({ ...profile, website: e.target.value })}
          className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#3E92CC]"
          placeholder="Website"
        />
        <button
          className="w-full py-2 bg-[#3E92CC] text-[#13293D] rounded-full hover:bg-[#2A628F] transition transform hover:scale-105"
          onClick={handleUpdate}
        >
          Update Profile
        </button>
        <button
          className="w-full py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition transform hover:scale-105"
          onClick={handleDelete}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default EmployerProfile;
