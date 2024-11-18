import SignInForm from "../components/SignInForm";
import image1 from "../assets/zos.png";

function Signin() {
  return (
    <div className="flex justify-between">
      <div className="hidden w-full sm:flex flex-col justify-center items-center">
        <img src={image1} alt="Zos" className="w-[400px] h-[400px]" />
        <h1 className="text-3xl font-bold text-center mb-8">
          Welcome to Zoskalus Platform Store
        </h1>
        <h1 className="text-xl font-bold text-center mb-8">
          The Fastest Food Delivery
        </h1>
      </div>
      <div className="bg-brand-primary w-full h-screen pt-8 sm:pt-28">
        <SignInForm />
      </div>
    </div>
  );
}

export default Signin;
