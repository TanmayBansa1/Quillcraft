import { Link } from "react-router-dom";

export default function AppBar() {
  const userName = localStorage.getItem("username") || "Anonymous";
  return (
    <div className="flex justify-between max-w-full overflow-hidden border-b">
      <div className="p-3 text-4xl font-bold">QuillCraft</div>
      <div className="m-3 w-1/2">
        {" "}
        {/* Changed to max-w-md */}
        <form className="w-full">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-black"
          >
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="w-full block p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-slate-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search QuillCraft"
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-black-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 bg-gray-800 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex">
          <Link to={'/publish'}>
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center mt-2.5 mb-2"
            >
              Write
            </button>
          </Link>
          <span className="m-3 mr-6 inline-flex items-center justify-center size-[36px] text-sm font-semibold leading-none rounded-full bg-gray-800 text-white">
            {userName[0]}
          </span>
        </div>
      </div>
    </div>
  );
}
