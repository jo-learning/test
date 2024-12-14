import { useState } from 'react';
// import { CiCirclePlus } from 'react-icons/ci';
import { NavLink } from 'react-router-dom';

const VehicleForm = () => {
  const [formData, setFormData] = useState({
    type: '',
    model: '',
    license: '',
    platenumber: '',
    workingHours: [{ key: '', value: '' }],
    insurance: '',
    currentlocation: '',
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
    <div className='mb-2'><NavLink to={'/vehicletable'} className={'bg-gray-500 mb-5 ml-2 py-1 px-2 text-white rounded-lg'}>&lt; Back</NavLink></div>
    <form onSubmit={handleSubmit} className="flex justify-between text-black dark:text-gray-400 space-y-4 space-x-4  max-w-full mx-auto p-6 border rounded-lg shadow-lg">
        
        <div>
      <div>
        <label className="block text-sm font-medium">Vehicle Type</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={(e) => handleChange(e, 'type')}
          className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
          
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Vehicle Model</label>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={(e) => handleChange(e, 'model')}
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
        <label className="block text-sm font-medium">Plate Number</label>
        <input
          type="text"
          name="platenumber"
          value={formData.platenumber}
          onChange={(e) => handleChange(e, 'platenumber')}
          className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Insurance</label>
        <input
          type="text"
          name="insurance"
          value={formData.insurance}
          onChange={(e) => handleChange(e, 'insurance')}
          className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Working Hours</label>
        {formData.workingHours.map((item, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              name="key"
              placeholder="Key"
              value={item.key}
              onChange={(e) => handleChange(e, 'workingHours', index)}
              className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
            />
            <input
              type="text"
              name="value"
              placeholder="Value"
              value={item.value}
              onChange={(e) => handleChange(e, 'workingHours', index)}
              className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
            />
            
          </div>
        ))}
        
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

      <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg">
        Submit
      </button>
      </div>
    </form>
    </>
  );
};

export default VehicleForm;
