import {Form2} from "../components/Form2"
import Quote from "../components/Quote"
export default function Signup(){

    return <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        <div>
            <Form2 ></Form2>
        </div>
        <div className="invisible lg:visible">

        <Quote></Quote>
        </div>
    </div>
}