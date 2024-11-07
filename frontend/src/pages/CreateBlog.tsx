import AppBar from "../components/AppBar";
import React, { ChangeEvent, useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { createType } from "@homosapien11/mediumclone";

export default function CreateBlog() {
  const editor = useRef(null);
  const [postInputs, setPostInputs] = useState<createType>({
    title: "",
    content: "",
  });
  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/
      placeholder: "Type your content here...",
    }),
    []
  );
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("");
  async function handleReq(){
    try{

      const response = await axios.post(`${BACKEND_URL}blog/post`,postInputs,{
        headers:{
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      navigate(`/blog/${response.data.id}`)
    }catch (err: unknown) {
      if (axios.isAxiosError(err)) {

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
    <div className="w-screen">
      <AppBar />
      <div className="mt-20 flex flex-col gap-3 justify-center items-center">
        <div className="w-full max-w-2xl">
          <input
            type="search"
            id="default-search"
            className="w-full block p-4 ps-5   border text-md border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your title here"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPostInputs(() => {
                return { ...postInputs, title: e.target.value };
              });
            }}
          />
        </div>

        <div className="w-full max-w-2xl mt-4">
          <JoditEditor
            config={config}
            ref={editor}
            value={postInputs.content}
            onChange={(newContent) =>
              setPostInputs({ ...postInputs, content: newContent })
            }
          ></JoditEditor>
        <div className="items-start w-full mt-5">
          <Link to={"/blog"}>
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center mt-2.5 mb-2"
              onClick={handleReq}
            >
              Publish
            </button>
          </Link>
        </div>
        </div>
        <div>
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
    </div>
  );
}
