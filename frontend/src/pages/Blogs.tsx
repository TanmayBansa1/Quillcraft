import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import {useBlogs,BlogType } from "../hooks";

export default function Blogs() {
  const {blogs,loading} = useBlogs();

  if(loading){
    return (
      <div>
        loading...
      </div>
    )
  }
  return (
    <div className="flex flex-col w-screen">
      <div className=" w-screen">
        <AppBar></AppBar>
      </div>
      <div className="max-w-xl mt-16 ml-44">
        
        {blogs.map((blog: BlogType) =>{

          return (
            <BlogCard
            authorName={blog.author.name}
            title={blog.title}
            content={blog.content}
            id={blog.id}
            publishedDate="Dec 3, 2023"
            ></BlogCard>
          )
          
})}
      </div>   
    </div>
  );
}
