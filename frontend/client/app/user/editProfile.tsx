"use dom";
import { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Utensils, ChevronLeft, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/lib/api";

const EditProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNo: "",
    password: "",
  });
  const [addresses, setAddresses] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [newAddress, setNewAddress] = useState("");
  const [newAllergy, setNewAllergy] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Extract user data from URL params
  const params = useLocalSearchParams();
  const userData = params.user as string;

  // Initialize user state when the component mounts
  useEffect(() => {
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser); // Update user state with parsed data
    }
  }, [userData]);

  // Update formData whenever the user state changes
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        phoneNo: user.phoneNo || "",
        password: "",
      });
      setAddresses(user.address || []);
      setAllergies(user.alergy || []);
    }
  }, [user]);

  // Handle profile update
  const handleUpdate = async () => {
    setLoading(true);
    setError(null);

    try {
      const updatedData = {
        ...formData,
        address: addresses,
        alergy: allergies,
      };

      const res = await updateProfile(updatedData);

      if (res.status === 200) {
        setUser(updatedData); // Update global user state
        router.push("/user/profile"); // Redirect to profile page
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Add new address
  const handleAddAddress = () => {
    if (!newAddress.trim()) return;
    setAddresses([...addresses, newAddress.trim()]);
    setNewAddress("");
  };

  // Remove an address
  const handleRemoveAddress = (index: number) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };

  // Add new allergy
  const handleAddAllergy = () => {
    if (!newAllergy.trim()) return;
    setAllergies([...allergies, newAllergy.trim()]);
    setNewAllergy("");
  };

  // Remove an allergy
  const handleRemoveAllergy = (index: number) => {
    const updatedAllergies = allergies.filter((_, i) => i !== index);
    setAllergies(updatedAllergies);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {/* Back Button */}
        <Button onClick={() => router.back()} className="mb-4">
          <ChevronLeft /> Back
        </Button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-orange-500 mb-4">Edit Profile</h2>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="w-full p-3 border rounded-lg"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-3 border rounded-lg"
          />

          {/* Phone Number */}
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phoneNo}
            onChange={(e) =>
              setFormData({ ...formData, phoneNo: e.target.value })
            }
            className="w-full p-3 border rounded-lg"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="New Password (optional)"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full p-3 border rounded-lg"
          />

          {/* Addresses */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Addresses
            </h3>
            <div className="space-y-2">
              {addresses.map((addr, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span>{addr}</span>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleRemoveAddress(index)}
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Add new address"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddAddress}
                  className="p-2"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Allergies */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Allergies
            </h3>
            <div className="space-y-2">
              {allergies.length > 0 ? (
                allergies.map((allergy, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span>{allergy}</span>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleRemoveAllergy(index)}
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No allergies listed.</p>
              )}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Add new allergy"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddAllergy}
                  className="p-2"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-2">{error}</p>}

        {/* Update Button */}
        <Button
          onClick={handleUpdate}
          className="w-full mt-4 bg-orange-500 hover:bg-orange-600"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;