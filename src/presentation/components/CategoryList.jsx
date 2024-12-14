import { Link } from "react-router-dom";
const CategoryList = () => {
    return (
        <>
         <div className="mt-6 ">
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
      </div>
        </>
    );
}

export default CategoryList;