import { useState, useEffect } from 'react';
// import { CiCirclePlus } from 'react-icons/ci';
import { NavLink } from 'react-router-dom';
import { apiClient } from '../../../data/services/apiClient';

const VehicleForm = () => {
  const [formData, setFormData] = useState({
    vehicleType: '',
    vehicleModel: '',
    license: '',
    plateNumber: '',
    workingHours: '',
    insurance: [{ key: '', value: '' }],
    currentLocation: [{ long: '', lat: '' }],
    driverId: ''
  });
  // const [image, setImage] = useState(null);

  // const [previewUrl, setPreviewUrl] = useState(null); // Store the preview URL
  const [drivers, setDrivers] = useState([])

  // Handle file input change
  // const handleFileChange = (event) => {
  //   const file = event.target.files[0]; // Get the selected file
  //   if (file) {
  //     // setImage(file);

  //     // Generate a preview URL
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setPreviewUrl(reader.result); // Set the preview URL
  //       console.log("ready");
  //     };
  //     reader.readAsDataURL(file); // Read the file as a data URL
  //   }
  // };

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
    const response = await apiClient.post("/api/vehicle/addVehicle", formData, {
      headers: "multipart/form-data"
    })
    console.log(response);
    // if (response.data.data.sucess == true){
    //   setFormData({
    //     name: "",
    //     sex: "",
    //     phoneNumber: "",
    //     username: "",
    //     password: "",
    //   })
    // }
  };

  useEffect(()=>{
    const fetchdriver = async() => {
      const res = await apiClient.get("/api/driver/fetchDrivers?page=1&limit=8&sortBy=id&sortOrder=asc")
      if (res.data.success == true){
        // console.log(res.data.data)
        // const a= res.data.data
        setDrivers(res.data.data)
        console.log(res.data.data)
      }
    }
    fetchdriver();
  },[])

  return (
    <>
    <div className='mb-2'><NavLink to={'/vehicletable'} className={'bg-gray-500 mb-5 ml-2 py-1 px-2 text-white rounded-lg '}>&lt; Back</NavLink></div>
    <form onSubmit={handleSubmit} className="flex justify-between text-black dark:text-gray-400 space-y-4 space-x-4  max-w-full mx-auto p-6 border rounded-lg shadow-lg">
        
        <div>
        <div>
            <label className="block text-sm font-medium">Vehicle Type</label>
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={(e) => handleChange(e, "vehicleType")}
              className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="Bicycle">Bicycle</option>
              <option value="scooter">Scooter</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Driver</label>
            <select
              name="driverId"
              value={formData.driverId}
              onChange={(e) => handleChange(e, "driverId")}
              className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
            >
              <option value="" disabled>
                Select Type
              </option>
              {drivers.map((driver, index)=>(
                <option key={index} value={driver.id}>{driver.name}</option>
              ))}
            </select>
          </div>
      
      <div>
        <label className="block text-sm font-medium">Vehicle Model</label>
        <input
          type="text"
          name="vehicleModel"
          value={formData.vehicleModel}
          onChange={(e) => handleChange(e, 'vehicleModel')}
          className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">License</label>
        <input
          type="text"
          name="license"
          value={formData.license}
          onChange={(e) => handleChange(e, 'license')}
          className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
        />
      </div>
      
     
      
      </div>
      <div>
      <div>
        <label className="block text-sm font-medium">Plate Number</label>
        <input
          type="text"
          name="plateNumber"
          value={formData.plateNumber}
          onChange={(e) => handleChange(e, 'plateNumber')}
          className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Working Hour</label>
        <input
          type="text"
          name="workingHours"
          value={formData.workingHours}
          onChange={(e) => handleChange(e, 'workingHours')}
          className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Insurance </label>
        {formData.insurance.map((item, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              name="key"
              placeholder="Key"
              value={item.key}
              onChange={(e) => handleChange(e, 'insurance', index)}
              className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
            />
            <input
              type="text"
              name="value"
              placeholder="Value"
              value={item.value}
              onChange={(e) => handleChange(e, 'insurance', index)}
              className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
            />
            
          </div>
        ))}
        
      </div>


      {/* Repeat similar blocks for Phone, Ambiance, Website, Social Media, Cuisine Type, Address */}

      <div>
        <label className="block text-sm font-medium">Current Location </label>
        {formData.currentLocation.map((item, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              name="long"
              placeholder="Longitude"
              value={item.key}
              onChange={(e) => handleChange(e, 'currentLocation', index)}
              className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
            />
            <input
              type="text"
              name="lat"
              placeholder="Latitude"
              value={item.value}
              onChange={(e) => handleChange(e, 'currentLocation', index)}
              className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
            />
            
          </div>
        ))}
        
      </div>

      <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg">
        Submit
      </button>
      </div>
    </form>
    </>
  );
};

export default VehicleForm;
