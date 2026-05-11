import { Suspense } from "react";
import SignUp from "./SignUp";
import { Spinner } from "../components";

const SignUpPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <SignUp />;
    </Suspense>
  );
};

export default SignUpPage;
