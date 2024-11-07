import { useParams } from "react-router-dom";
import AppBar from "../components/AppBar";
import FullBlog from "../components/FullBlog";
import { useBlog } from "../hooks";

export default function Blog() {
  const { id } = useParams();
  const { blog, loading } = useBlog({ id: id || "" });
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col w-screen">
      <div className=" w-screen">
        <AppBar ></AppBar>
      </div>

      <FullBlog
        key={blog?.id}
        id={blog.id}
        title={blog.title}
        content={blog.content}
        authorName={blog.author.name}
        publishedDate="3 Dec 2023"
      ></FullBlog>
    </div>
  );
  0;
}
