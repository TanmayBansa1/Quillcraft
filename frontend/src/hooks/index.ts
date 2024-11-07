import axios from "axios";
import { useEffect,useState } from "react";
import { BACKEND_URL } from "../config";

export interface BlogType{
    id: string,
    title: string,
    content: string,
    authorId: string,
    author: {
        name: string
    }
}
export  function useBlogs(){
    const [blogs, setBlogs] = useState<BlogType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const res = axios.get(`${BACKEND_URL}blog/bulk`,{ headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }}).then(res=>{
            setBlogs(res.data.result);
            setLoading(false)
        })
    }, [])

    return {
        loading,
        blogs
    }
}
export  function useBlog({id}: {id: string}){
    const [blog, setBlog] = useState<BlogType>();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const res = axios.get(`${BACKEND_URL}blog/find/${id}`,{ headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }}).then(res=>{
            setBlog(res.data.post);
            setLoading(false)
        })
    }, [])

    return {
        loading,
        blog
    }
}