import { ChangeEvent } from "react";

export default function InputBox({type, onChange,placeholder}: {type: string, onChange: (e: ChangeEvent<HTMLInputElement>)=>void , placeholder: string}){

    return <div className="">
        <input onChange={onChange} placeholder={placeholder} type={type == "password" ? type: "text"} className="border border-gray-600 rounded-md w-full p-2"></input>
    </div>
}