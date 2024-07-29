import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
const Confirmed = () => {
    const navigate=useNavigate();
    const {msg}=useParams();
    return (
        <>
            <div className="flex justify-center">
                <svg className="h-1/3 w-1/3 sm:w-1/5 mt-32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 22.5" x="0px" y="0px"><path fill-rule="evenodd" d="M9,0 C4.029,0 0,4.029 0,9 C0,13.971 4.029,18 9,18 C13.971,18 18,13.971 18,9 C18,4.029 13.971,0 9,0 M8.063,13 C7.809,13 7.555,12.904 7.36,12.712 L5.298,10.711 C4.904,10.323 4.9,9.69 5.289,9.298 C5.677,8.903 6.31,8.901 6.702,9.289 L8.056,10.588 L12.29,6.295 C12.682,5.905 13.314,5.902 13.705,6.29 C14.097,6.681 14.099,7.313 13.71,7.705 L8.773,12.705 C8.576,12.901 8.319,13 8.063,13" /><text x="0" y="33" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by Kevin White</text><text x="0" y="38" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>
            </div>
            <div className="flex flex-col justify-center">
            <h1 className="text-center text-3xl sm:text-5xl font-extrabold ">{msg}</h1>
            <Button variant="outlined" color="success" onClick={()=>navigate('/')} className="w-1/5 mx-auto mt-4">Home</Button>
            </div>
        </>
    )
}
export default Confirmed;