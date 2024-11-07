import DOMPurify from "dompurify";
import { BlogCardProps } from "./BlogCard";

export default function FullBlog(props: BlogCardProps) {
  const sanitizedContent = DOMPurify.sanitize(props.content);
  return (
    <div className="w-screen grid grid-cols-12 mt-20">
      <div className="col-span-8 pl-20">
        <div className="font-bold text-4xl">
          {props.title}
        </div>
        <div
          className="font-medium text-md mt-10"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>
      <div className="col-span-4 pl-20">
        <div className="text-lg font-medium p-1 text-slate-500">
          Written By
        </div>
        <div className="font-bold text-xl p-1">

          {props.authorName}
        </div>
      </div>
    </div>
  );
}
