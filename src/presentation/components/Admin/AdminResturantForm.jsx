import { useState } from "react";
// import { CiCirclePlus } from "react-icons/ci";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { apiClient } from "../../../data/services/apiClient";
import { toast } from "react-toastify";

const ResturantForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    // image: "",
    username: "",
    password: "",
    workingHours: [{ key: "", value: "" }],
    email: [{ key: "", value: "" }],
    phoneNumber: [{ key: "", value: "" }],
    // ambiance: [{ key: "", value: "" }],
    website: [{ key: "", value: "" }],
    socialMedia: [{ key: "", value: "" }],
    cuisineType: [{ key: "", value: "" }],
    address: [{ key: "", value: "" }],
    geoLocation: [{ lat: "", long: "" }],
  });

  const [last, setLast] = useState({
    workingHours: 0,
    email: 0,
    phoneNumber: 0,
    // ambiance: 0,
    website: 0,
    socialMedia: 0,
    cuisineType: 0,
    address: 0,
  });

  const [loading, setLoading] = useState(false)

  const [previewUrl, setPreviewUrl] = useState(null); // Store the preview URL
  const [image, setImage] = useState(null);

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
    console.log(`${name} - ${value} - ${field}`)
    if (index !== null) {
      let updatedField = [...formData[field]];
      if (name == "value"){
        updatedField[index].value = value;
      }else{
        updatedField[index].key = value;
      }
      
      
      setFormData({ ...formData, [field]: updatedField });
    } else {
    
        setFormData({ ...formData, [name]: value });
     
      
    }
  };

  const handleAddInput = (field, index = null) => {
    const newData = { ...formData };
    if (index !== null) {
      setLast({ ...last, [field]: index + 1 });
    }
    newData[field].push({ key: "", value: "" });
    setFormData(newData);
  };

  const handleDeleteInput = (field, index) => {
    if (index !== null) {
      setLast({ ...last, [field]: last[field] - 1 });
    }
    const updatedArray = [...formData[field]];
    updatedArray.splice(index, 1); // Remove at specific index
    setFormData({
      ...formData,
      [field]: updatedArray,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(formData);
    const formData1 = new FormData();
    formData1.append("ambiance", image);
    formData1.append("name", formData.name);
    formData1.append("description", formData.description);
    formData1.append("phoneNumber[]", JSON.stringify(formData.phoneNumber));
    // formData.phoneNumber.forEach((phone, index) => {
    //   formData1.append(`phoneNumber[${index}]`, phone); // Serialize the object to a string
    // });
    formData1.append("workingHours", formData.workingHours);
    formData1.append("email[]", JSON.stringify(formData.email));
    formData1.append("website[]", JSON.stringify(formData.website));
    formData1.append("socialMedia[]", JSON.stringify(formData.socialMedia));
    formData1.append("address", formData.address);
    formData1.append("geoLocation[]", JSON.stringify(formData.geoLocation));
    formData1.append("cuisineType[]", JSON.stringify(formData.cuisineType));
    formData1.append("username", formData.username);
    formData1.append("password", formData.password);
    
    try{
      const response = await apiClient.post("/api/restaurant/addRestaurant", formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data)
      if (response.data.succuss){
        toast.success(response.data.msg)
        setFormData({
          name: "",
          description: "",
          // image: "",
          username: "",
          password: "",
          workingHours: [{ key: "", value: "" }],
          email: [{ key: "", value: "" }],
          phoneNumber: [{ key: "", value: "" }],
          // ambiance: [{ key: "", value: "" }],
          website: [{ key: "", value: "" }],
          socialMedia: [{ key: "", value: "" }],
          cuisineType: [{ key: "", value: "" }],
          address: [{ key: "", value: "" }],
          geoLocation: [{ lat: "", long: "" }],
        })
      }else{
        toast.error(response.data.msg)
      }
    }catch(e){
        toast.error(e.response.data.msg)
    }finally{
      setLoading(false)
    }

   
    
  };

  return (
    <>
      <div className="mb-2">
        <NavLink
          to={"/resturanttable"}
          className={"bg-gray-500 mb-5 ml-2 py-1 px-2 text-white rounded-lg"}
        >
          &lt; Back
        </NavLink>
      </div>
      <form
        // encType="multipart/formdata"
        onSubmit={handleSubmit}
        className="flex justify-between text-black dark:text-gray-400 space-y-4 space-x-4  max-w-full mx-auto p-6 border rounded-lg shadow-lg"
      >
        <div>
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange(e, "name")}
              className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) => handleChange(e, "description")}
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
              name="ambiance"
              onChange={(e) => {
                handleChange(e, "image");
                handleFileChange(e);
              }}
              className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Username</label>
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
        </div>
        <div>
          <div>
            <label className="block text-sm font-medium">Working Hours</label>
            {formData.workingHours.map((item, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  name="key"
                  placeholder="Key"
                  value={item.key}
                  onChange={(e) => handleChange(e, "workingHours", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                <input
                  type="text"
                  name="value"
                  placeholder="Value"
                  value={item.value}
                  onChange={(e) => handleChange(e, "workingHours", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />

                {last["workingHours"] == index ? (
                  <div className="h-[50px] w-[50px] bg-green-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleAddInput("workingHours", index)}
                      className=" bg-green-500 text-white font-bold m-0 p-0"
                    >
                      <FaPlusCircle size={28} />
                    </button>
                  </div>
                ) : (
                  <div className="h-[50px] w-[50px] bg-red-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteInput("workingHours", index)}
                      className=" bg-red-500 text-white font-bold m-0 p-0"
                    >
                      <FaMinusCircle size={28} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium">email</label>
            {formData.email.map((item, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  name="key"
                  placeholder="Key"
                  value={item.key}
                  onChange={(e) => handleChange(e, "email", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                <input
                  type="email"
                  name="value"
                  placeholder="Value"
                  value={item.value}
                  onChange={(e) => handleChange(e, "email", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                {last["email"] == index ? (
                  <div className="h-[50px] w-[50px] bg-green-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleAddInput("email", index)}
                      className=" bg-green-500 text-white font-bold m-0 p-0"
                    >
                      <FaPlusCircle size={28} />
                    </button>
                  </div>
                ) : (
                  <div className="h-[50px] w-[50px] bg-red-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteInput("email", index)}
                      className=" bg-red-500 text-white font-bold m-0 p-0"
                    >
                      <FaMinusCircle size={28} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            {formData.phoneNumber.map((item, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  name="key"
                  placeholder="Key"
                  value={item.key}
                  onChange={(e) => handleChange(e, "phoneNumber", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                <input
                  type="phone"
                  name="value"
                  placeholder="Value"
                  value={item.value}
                  onChange={(e) => handleChange(e, "phoneNumber", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                {last["phoneNumber"] == index ? (
                  <div className="h-[50px] w-[50px] bg-green-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleAddInput("phoneNumber", index)}
                      className=" bg-green-500 text-white font-bold m-0 p-0"
                    >
                      <FaPlusCircle size={28} />
                    </button>
                  </div>
                ) : (
                  <div className="h-[50px] w-[50px] bg-red-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteInput("phoneNumber", index)}
                      className=" bg-red-500 text-white font-bold m-0 p-0"
                    >
                      <FaMinusCircle size={28} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* <div>
            <label className="block text-sm font-medium">Ambiance</label> */}
            {/* {formData.ambiance.map((item, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  name="key"
                  placeholder="Key"
                  value={item.key}
                  onChange={(e) => handleChange(e, "ambiance", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                <input
                  type="ambiance"
                  name="value"
                  placeholder="Value"
                  value={item.value}
                  onChange={(e) => handleChange(e, "ambiance", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                {last["ambiance"] == index ? (
                  <div className="h-[50px] w-[50px] bg-green-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleAddInput("ambiance", index)}
                      className=" bg-green-500 text-white font-bold m-0 p-0"
                    >
                      <FaPlusCircle size={28} />
                    </button>
                  </div>
                ) : (
                  <div className="h-[50px] w-[50px] bg-red-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteInput("ambiance", index)}
                      className=" bg-red-500 text-white font-bold m-0 p-0"
                    >
                      <FaMinusCircle size={28} />
                    </button>
                  </div>
                )}
              </div>
            ))} */}
            {/* <input type="file"></input>
          </div> */}
          <div>
            <label className="block text-sm font-medium">website</label>
            {formData.website.map((item, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  name="key"
                  placeholder="Key"
                  value={item.key}
                  onChange={(e) => handleChange(e, "website", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                <input
                  type="website"
                  name="value"
                  placeholder="Value"
                  value={item.value}
                  onChange={(e) => handleChange(e, "website", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                {last["website"] == index ? (
                  <div className="h-[50px] w-[50px] bg-green-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleAddInput("website", index)}
                      className=" bg-green-500 text-white font-bold m-0 p-0"
                    >
                      <FaPlusCircle size={28} />
                    </button>
                  </div>
                ) : (
                  <div className="h-[50px] w-[50px] bg-red-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteInput("website", index)}
                      className=" bg-red-500 text-white font-bold m-0 p-0"
                    >
                      <FaMinusCircle size={28} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium">Social Media</label>
            {formData.socialMedia.map((item, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  name="key"
                  placeholder="Key"
                  value={item.key}
                  onChange={(e) => handleChange(e, "socialMedia", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                <input
                  type="socialMedia"
                  name="value"
                  placeholder="Value"
                  value={item.value}
                  onChange={(e) => handleChange(e, "socialMedia", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                {last["socialMedia"] == index ? (
                  <div className="h-[50px] w-[50px] bg-green-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleAddInput("socialMedia", index)}
                      className=" bg-green-500 text-white font-bold m-0 p-0"
                    >
                      <FaPlusCircle size={28} />
                    </button>
                  </div>
                ) : (
                  <div className="h-[50px] w-[50px] bg-red-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteInput("socialMedia", index)}
                      className=" bg-red-500 text-white font-bold m-0 p-0"
                    >
                      <FaMinusCircle size={28} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium">Cuisine Type</label>
            {formData.cuisineType.map((item, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  name="key"
                  placeholder="Key"
                  value={item.key}
                  onChange={(e) => handleChange(e, "cuisineType", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                <input
                  type="cuisineType"
                  name="value"
                  placeholder="Value"
                  value={item.value}
                  onChange={(e) => handleChange(e, "cuisineType", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                {last["cuisineType"] == index ? (
                  <div className="h-[50px] w-[50px] bg-green-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleAddInput("cuisineType", index)}
                      className=" bg-green-500 text-white font-bold m-0 p-0"
                    >
                      <FaPlusCircle size={28} />
                    </button>
                  </div>
                ) : (
                  <div className="h-[50px] w-[50px] bg-red-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteInput("cuisineType", index)}
                      className=" bg-red-500 text-white font-bold m-0 p-0"
                    >
                      <FaMinusCircle size={28} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Repeat similar blocks for Phone, Ambiance, Website, Social Media, Cuisine Type, Address */}

          <div>
            <label className="block text-sm font-medium">Geo Location</label>
            {formData.geoLocation.map((item, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  name="lat"
                  placeholder="lat"
                  value={item.key}
                  onChange={(e) => handleChange(e, "geoLocation", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                <input
                  type="cuisineType"
                  name="long"
                  placeholder="long"
                  value={item.value}
                  onChange={(e) => handleChange(e, "geoLocation", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                {last["cuisineType"] == index ? (
                  <div className="h-[50px] w-[50px] bg-green-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleAddInput("cuisineType", index)}
                      className=" bg-green-500 text-white font-bold m-0 p-0"
                    >
                      <FaPlusCircle size={28} />
                    </button>
                  </div>
                ) : (
                  <div className="h-[50px] w-[50px] bg-red-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteInput("cuisineType", index)}
                      className=" bg-red-500 text-white font-bold m-0 p-0"
                    >
                      <FaMinusCircle size={28} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 bg-blue-500 text-white rounded-lg"
            disabled={loading}
          >
            {loading ? 'loading...' :'Submit'}
          </button>
        </div>
      </form>
    </>
  );
};

export default ResturantForm;
