import { Link } from "react-router-dom";

function SignUpForm() {
  return (
    <div className="max-w-sm  mx-auto p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form>
        <input type="text" placeholder="Username" className="input-field mb-3" />
        <input type="email" placeholder="Email" className="input-field mb-3" />
        <input type="password" placeholder="Password" className="input-field mb-3" />
        <button type="submit" className="w-full p-2 bg-primary text-white rounded-lg">Sign Up</button>
        <p className="mt-4 text-center">
          Already have an account? <Link to={'/signin'} className="text-blue-500 hover:underline">Sign in</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUpForm;
