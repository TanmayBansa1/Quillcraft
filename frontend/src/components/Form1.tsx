import { Link,  useNavigate } from "react-router-dom";
import InputBox from "./InputBox";
import { SignupType } from "@homosapien11/mediumclone";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
export const Form1 = () => {
  const [postInputs, setPostInputs] = useState<SignupType>({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleReq() {
    try {
      const response = await axios.post(`${BACKEND_URL}user/signup`, postInputs);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userName",postInputs.name)
      navigate('/blogs')
    } catch (err: unknown) {
      // Handle error response
      if (axios.isAxiosError(err)) {
        // Check if there is a response from the server
        if (err.response) {
          setErrorMessage(err.response.data as string); // assuming the error is sent as plain text
        } else {
          setErrorMessage("An unexpected error occurred");
        }
      } else {
        // Handle any other unexpected errors (TypeScript-safe)
        setErrorMessage("An unexpected error occurred");
      }
    }
  }
  return (
    <div className="bg-white h-screen flex justify-center">
      <div className="flex flex-col justify-center gap-1 align-middle w-96">
        <div className="text-3xl font-bold text-center">
          <h1>Create an Account</h1>
        </div>
        <Link className="text-center font-light" to={"/signin"}>
          Already Have an Account?
        </Link>

        <LabelInputs
          label="Name"
          placeholder="Enter your name"
          onChange={(e) => {
            setPostInputs({
              ...postInputs,
              name: e.target.value,
            });
          }}
        ></LabelInputs>
        <LabelInputs
          label="Email"
          placeholder="Enter your email"
          onChange={(e) => {
            setPostInputs({
              ...postInputs,
              email: e.target.value,
            });
          }}
        ></LabelInputs>
        <LabelInputs
          label="Password"
          placeholder="Enter your password"
          onChange={(e) => {
            setPostInputs({
              ...postInputs,
              password: e.target.value,
            });
          }}
          type="password"
        ></LabelInputs>
        <button
          onClick={handleReq}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-semibold rounded-md text-lg px-5 py-2.5 me-2 mb-2 mt-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full "
        >
          Sign Up
        </button>
        {errorMessage && (
          <div
            className="bg-red-500 flex items-center justify-center p-2
          rounded-lg"
          >
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};
type labeledTypes = {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};
function LabelInputs({ label, placeholder, onChange, type }: labeledTypes) {
  return (
    <div>
      <div className="text-lg mt-4 font-medium">{label}</div>
      <div>
        <InputBox
          placeholder={placeholder}
          onChange={onChange}
          type={type ? type : ""}
        ></InputBox>
      </div>
    </div>
  );
}
