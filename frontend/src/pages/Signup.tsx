import {Form1} from "../components/Form1"
import Quote from "../components/Quote"
export default function Signup(){

    return <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        <div>
            <Form1 ></Form1>
        </div>
        <div className="invisible lg:visible">

        <Quote></Quote>
        </div>
    </div>
}