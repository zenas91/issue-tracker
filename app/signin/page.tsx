import { Suspense } from "react";
import SignIn from "./SignIn";
import { Spinner } from "../components";

const SignInPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <SignIn />
    </Suspense>
  );
};

export default SignInPage;
