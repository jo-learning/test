import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
const CategoryList = ({navigates}) => {
  const [nav, setNav] = useState(navigates)
  const navigate = useNavigate()
  const handleChange = (e) =>{
    navigate(e.target.value)
  }
    return (
        <>
         <div className="mt-6 flex justify-between lg:mr-[160px]">
        <ul className="flex space-x-5 sm:pl-[160px] pl-4">
          <li className="font-bold underline">
            <Link>All</Link>
          </li>
          <li className="font-bold">
            <Link className="text-black">Fasting</Link>
          </li>
          <li className="font-bold">
            <Link className="text-black">Nan Fasting</Link>
          </li>
          <li className="font-bold">
            <Link className="text-black">Drinks</Link>
          </li>
          {/* <li className="font-"><Link>Beauty</Link></li> */}
        </ul>
        <div>
          <select
          value={nav}
          onChange={handleChange}
          className="bg-gray-200 p-2 rounded-lg w-[200px] text-center">
            <option value="/">Food</option>
            <option value="/restaurant">Restaurant</option>
          </select>
        </div>
      </div>
        </>
    );
}

export default CategoryList;