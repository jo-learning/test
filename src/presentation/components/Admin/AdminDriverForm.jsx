import { useState } from 'react';
// import { CiCirclePlus } from 'react-icons/ci';
import { NavLink } from 'react-router-dom';

const DriverForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    phoneNumber: '',
    username: '',
    workingHours: [{ key: '', value: '' }],
    password: '',
    confirmpassword: '',
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
    <div className='mb-2'><NavLink to={'/drivertable'} className={'bg-gray-500 mb-5 ml-2 py-1 px-2 text-white rounded-lg'}>&lt; Back</NavLink></div>
    <form onSubmit={handleSubmit} className="flex justify-around text-black dark:text-gray-400 space-y-4 space-x-4  max-w-full mx-auto p-6 border rounded-lg shadow-lg">
        
        <div>
      <div>
        <label className="block text-sm font-medium">Driver Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => handleChange(e, 'name')}
          className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
          
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Gender</label>
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={(e) => handleChange(e, 'gender')}
          className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={(e) => handleChange(e, 'phoneNumber')}
          className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium">Image</label>
        <div className='h-[200px] w-[200px] bg-gray-400 rounded-lg'></div>
        <p>Upload a JPG or PNG image with dimension 291x194 pixel.<br></br> Maximum file size: 1 MB</p>
        <input
          type="file"
          name="image"
          onChange={(e) => handleChange(e, 'image')}
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
          onChange={(e) => handleChange(e, 'username')}
          className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => handleChange(e, 'password')}
          className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Confirm Password</label>
        <input
          type="password"
          name="confirmpassword"
          value={formData.confirmpassword}
          onChange={(e) => handleChange(e, 'confirmpassword')}
          className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
        />
      </div>
      


      {/* Repeat similar blocks for Phone, Ambiance, Website, Social Media, Cuisine Type, Address */}

      <div>
        <label className="block text-sm font-medium">Current Location</label>
        <input
          type="text"
          name="currentlocation"
          value={formData.currentlocation}
          onChange={(e) => handleChange(e, 'currentlocation')}
          className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
        />
      </div>

      <button type="submit" className="bottom-0 mt-10 w-full py-3 bg-blue-500 text-white rounded-lg">
        Submit
      </button>
      </div>
    </form>
    </>
  );
};

export default DriverForm;
