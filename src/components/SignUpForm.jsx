import { Link } from "react-router-dom";

function SignUpForm() {
  return (
    <div className="max-w-sm  mb-10 sm:mb-0 mx-auto p-8 bg-gray-200 dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 flex justify-center">Sign Up</h2>
      <form>
        <input type="text" placeholder="Username" className="input-field mb-3" />
        <input type="email" placeholder="Email" className="input-field mb-3" />
        <input type="password" placeholder="Password" className="input-field mb-3" />
        <input type="password" placeholder="Password" className="input-field mb-3" />
        <div className="flex ">
        <p className="bg-white text-gray-800 items-center justify-center flex px-1 mr-1 rounded-lg h-[50px]">+251</p>
        <input type="number" placeholder="900000000" className="input-field mb-3 " />
        </div>
        <button type="submit" className="w-full p-2 bg-primary dark:text-white rounded-lg">Sign Up</button>
        <p className="mt-4 text-center">
          Already have an account? <Link to={'/signin'} className="text-blue-500 hover:underline">Sign in</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUpForm;
