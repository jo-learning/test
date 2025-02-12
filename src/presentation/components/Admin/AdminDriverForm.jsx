import { useState } from "react";
// import { CiCirclePlus } from 'react-icons/ci';
import { NavLink } from "react-router-dom";
import { apiClient } from "../../../data/services/apiClient";

const DriverForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    sex: "",
    phoneNumber: "",
    username: "",
    // workingHours: [{ key: "", value: "" }],
    password: "",
    // confirmpassword: "",
  });
  const [confirmpassword, setConfirmPassword] = useState('')
  const [image, setImage] = useState(null);

  const [previewUrl, setPreviewUrl] = useState(null); // Store the preview URL

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setImage(file);

      // Generate a preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result); // Set the preview URL
        console.log("ready");
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleChange = (e, field, index = null) => {
    const { name, value } = e.target;
    if (index !== null) {
      const updatedField = [...formData[field]];
      updatedField[index][name] = value;
      setFormData({ ...formData, [field]: updatedField });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  //   const handleAddInput = (field) => {
  //     const newData = { ...formData };
  //     newData[field].push({ key: '', value: '' });
  //     setFormData(newData);
  //   };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);

    const formData1 = new FormData();
    formData1.append("profilePicture", image);
    formData1.append("name", formData.name);
    formData1.append("password", formData.password);
    formData1.append("phoneNumber", formData.phoneNumber);
    formData1.append("sex", formData.sex);
    formData1.append("username", formData.username);
    


    const response = await apiClient.post("/api/driver/addDriver", formData1, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    // const response = await apiClient.post("/api/driver/addDriver", {formData, file:{path: "abc/abv"}})
    console.log(response);
    if (response.data.data.sucess == true){
      setFormData({
        name: "",
        sex: "",
        phoneNumber: "",
        username: "",
        password: "",
      })
    }
    
  };

  return (
    <>
      <div className="mb-2">
        <NavLink
          to={"/drivertable"}
          className={"bg-gray-500 mb-5 ml-2 py-1 px-2 text-white rounded-lg"}
        >
          &lt; Back
        </NavLink>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex justify-around text-black dark:text-gray-400 space-y-4 space-x-4  max-w-full mx-auto p-6 border rounded-lg shadow-lg"
      >
        <div>
          <div>
            <label className="block text-sm font-medium">Driver Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange(e, "name")}
              className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Gender</label>
            <select
              name="sex"
              value={formData.sex}
              onChange={(e) => handleChange(e, "sex")}
              className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleChange(e, "phoneNumber")}
              className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Image</label>
            <div className="h-[200px] w-[200px] bg-gray-400 rounded-lg">
              {previewUrl && (
                <div>
                  {/* <h2>Image Preview:</h2> */}
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{ maxWidth: "100%", maxHeight: "300px" }}
                  />
                </div>
              )}
            </div>
            <p>
              Upload a JPG or PNG image with dimension 291x194 pixel.<br></br>{" "}
              Maximum file size: 1 MB
            </p>
            <input
              type="file"
              name="image"
              onChange={(e) => {
                handleFileChange(e);
              }}
              className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
            />
          </div>
        </div>
        <div>
          <div>
            <label className="block text-sm font-medium">Enter Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={(e) => handleChange(e, "username")}
              className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleChange(e, "password")}
              className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmpassword"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium">
              address
            </label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
            />
          </div> */}

          {/* Repeat similar blocks for Phone, Ambiance, Website, Social Media, Cuisine Type, Address */}

          

          <button
            type="submit"
            className="bottom-0 mt-10 w-full py-3 bg-blue-500 text-white rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default DriverForm;
