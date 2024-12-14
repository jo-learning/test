import SignUpForm from "../components/SignUpForm";
import image1 from "../../assets/zos.png";

function SignUp() {
  return (
    <div className="flex justify-between text-black dark:text-white">
      <div className="bg-brand-primary w-full h-full pb-8 pt-8 sm:pt-25">
        <SignUpForm />
      </div>
      <div className="hidden w-full sm:flex flex-col justify-center items-center">
        <img src={image1} alt="Zos" className="w-[400px] h-[400px]" />
        <h1 className="text-3xl font-bold text-center mb-8">
          Welcome to Zoskalus Platform Store
        </h1>
      </div>
    </div>
  );
}

export default SignUp;
