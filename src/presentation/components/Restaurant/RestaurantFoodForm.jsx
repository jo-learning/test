import { useState, useEffect, useContext } from "react";
// import { CiCirclePlus } from "react-icons/ci";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { apiClient } from "../../../data/services/apiClient";
import UserContext from "../../../shared/utils/UserContext";

const FoodForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    description: "",
    // image: "uploaded/abb",
    restaurantId: "e7265202-7ced-4d7e-9f03-4b15b11ff884",
    ingredients: [{ value: "" }],
  });
  const [category, setCategory] = useState([]);
  const {user } = useContext(UserContext);

  const [last, setLast] = useState({
    ingredients: 0,
  });

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
    if (index !== null) {
      const updatedField = [...formData[field]];
      updatedField[index][name] = value;
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
    newData[field].push({ value: "" });
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

  useEffect(() => {
    const handleFetchCategory = async () => {
      // const response = await fetch(
      //   "http://localhost:3010/api/category/fetchAllCategories"
      // );
      const response = await apiClient.get('/api/category/fetchAllCategories')
      const data = response.data
      console.log(data)
      if (data.success == true) {
        console.log(data)
        setCategory(data.data);
      }
    };
    handleFetchCategory();
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();

    console.log(image);
    const price = parseFloat(formData.price);
    const formData1 = new FormData();
    formData1.append("image", image);
    formData1.append("name", formData.name);
    formData1.append("categoryId", formData.categoryId);
    formData1.append("price", price);
    formData1.append("description", formData.description);
    formData1.append("restaurantId", user[0].id);
    formData1.append("ingredients[]", JSON.stringify(formData.ingredients));
    
    console.log(formData);
    // const response = await apiClient.post("/api/food/addFood", formData);
    const response = await apiClient.post("/api/food/addFood", formData1, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response)
    
  };

  return (
    <>
      <div className="mb-2">
        <NavLink
          to={"/foodtable"}
          className={"bg-gray-500 mb-5 ml-2 py-1 px-2 text-white rounded-lg"}
        >
          &lt; Back
        </NavLink>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex justify-start text-black dark:text-gray-400 space-y-4 space-x-4  max-w-full mx-auto p-6 border dark:border-none rounded-lg shadow-lg"
      >
        <div className="w-full">
          <div>
            <label className="block text-sm font-medium">Food Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange(e, "name")}
              className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={(e) => handleChange(e, "category")}
              className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
            />
          </div> */}
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={(e) => handleChange(e, "categoryId")}
              className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
            >
              <option value="" disabled>
                Select Category
              </option>
              {
                category.map((cate, index)=>(
                  <option key={index} value={cate.id}>{cate.name}</option>
                ))
              }
              {/* <option value="model1">Model 1</option>
              <option value="model2">Model 2</option> */}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Food Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={(e) => handleChange(e, "price")}
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
              onChange={(e) => handleFileChange(e)}
              className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
            />
          </div>
        </div>
        <div className="w-full">
          <div>
            <label className="block text-sm font-medium">
              Food Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) => handleChange(e, "description")}
              className="w-full h-[200px] px-4 py-2 mt-2 border rounded-lg bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Add Ingredients</label>
            {formData.ingredients.map((item, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  name="value"
                  placeholder="Value"
                  value={item.value}
                  onChange={(e) => handleChange(e, "ingredients", index)}
                  className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
                />

                {last["ingredients"] == index ? (
                  <div className="h-[50px] w-[50px] bg-green-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleAddInput("ingredients", index)}
                      className=" bg-green-500 text-white font-bold m-0 p-0"
                    >
                      <FaPlusCircle size={28} />
                    </button>
                  </div>
                ) : (
                  <div className="h-[50px] w-[50px] bg-red-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteInput("ingredients", index)}
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
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default FoodForm;
