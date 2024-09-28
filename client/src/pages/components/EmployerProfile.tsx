import React, { useEffect, useState, useRef } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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
  const [success, setSuccess] = useState<string | null>(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    setButtonLoading(true);

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
        setSuccess("Updated successfully");
        setError(null);
      } else {
        setError("Failed to update profile.");
        setSuccess(null);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      setSuccess(null);
    } finally {
      setButtonLoading(false);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    setButtonLoading(true);

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
    } finally {
      setButtonLoading(false);
    }
  };

  const handleLogoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const storageRef = ref(storage, `logos/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setSuccess(`Upload is ${Math.trunc(progress)}% done`);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              setError("User doesn't have permission to access the object");
              break;
            case "storage/canceled":
              setError("User canceled the upload");
              break;
            case "storage/unknown":
              setError("Unknown error occurred, inspect error.serverResponse");
              break;
            default:
              setError("Failed to upload logo.");
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProfile({ ...profile, logo: downloadURL });
            setSuccess("Logo updated successfully");
          });
        }
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Profile Information
      </h2>
      <div className="space-y-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 rounded-lg shadow-lg">
        <input
          type="text"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="w-full p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Name"
        />
        <input
          type="email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          className="w-full p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Email"
        />
        <div className="w-full p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-500">
          {profile.logo && (
            <div className="flex flex-col items-center mb-4">
              <img
                src={profile.logo}
                alt="Logo"
                className="w-32 h-32 object-cover rounded-full mb-2 cursor-pointer"
                onClick={handleLogoClick}
              />
              <label
                className="text-gray-500 cursor-pointer"
                onClick={handleLogoClick}
              >
                Change Logo
              </label>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleLogoChange}
            className="hidden"
          />
        </div>
        <textarea
          value={profile.description}
          onChange={(e) =>
            setProfile({ ...profile, description: e.target.value })
          }
          className="w-full p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Description"
        />
        <input
          type="url"
          value={profile.website}
          onChange={(e) => setProfile({ ...profile, website: e.target.value })}
          className="w-full p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Website"
        />
        <button
          className={`w-full py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition transform hover:scale-105 ${
            buttonLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleUpdate}
          disabled={buttonLoading}
        >
          {buttonLoading ? "Updating..." : "Update Profile"}
        </button>
        <button
          className={`w-full py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition transform hover:scale-105 ${
            buttonLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleDelete}
          disabled={buttonLoading}
        >
          {buttonLoading ? "Deleting..." : "Delete Account"}
        </button>
        {success && <p className="text-green-500">{success}</p>}
      </div>
    </div>
  );
};

export default EmployerProfile;
