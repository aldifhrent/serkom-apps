import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignUpForm from "./components/sign-up-form";

const SignUpPage = () => {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="w-full mb-12 mt-12 m-auto lg:max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            Create an account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </div>
    </div>
  );
};

export default SignUpPage;
