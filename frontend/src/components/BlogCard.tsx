import DOMPurify from "dompurify";
import { Link } from "react-router-dom";

export interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export default function BlogCard(props: BlogCardProps) {
  // Sanitize the content and then truncate it
  const sanitizedContent = DOMPurify.sanitize(props.content);
  const truncatedContent = sanitizedContent.length > 100
    ? sanitizedContent.slice(0, 100) + "..."
    : sanitizedContent;

  return (
    <Link to={`/blog/${props.id}`}>
      <div className="border-b border-slate-300 cursor-pointer">
        <div className="flex gap-2 p-3 pl-0">
          <div>
            <span className="pl-0 inline-flex items-center justify-center size-[24px] text-sm font-semibold leading-none rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500">
              {props.authorName[0]}
            </span>
          </div>
          <div className="flex flex-col justify-center font-medium text-sm text-slate-700">
            <div>{props.authorName} .</div>
          </div>
          <div className="flex flex-col justify-center text-slate-600 text-sm">
            <div>{props.publishedDate}</div>
          </div>
        </div>
        <div className="font-bold text-2xl">{props.title}</div>
        <div
          className="mb-4 mt-1 text-slate-800"
          dangerouslySetInnerHTML={{ __html: truncatedContent }}
        />
        <div className="font-thin text-sm">
          {`${Math.ceil(truncatedContent.length / 100)} minute(s) read`}
        </div>
      </div>
    </Link>
  );
}
