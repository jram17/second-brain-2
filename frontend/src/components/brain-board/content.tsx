import { Plus } from "lucide-react";
import { Card } from "./card";
import Masonry from "@mui/lab/Masonry";
import { useDispatch } from "react-redux";
import { setModalState } from "../../redux/Slices/modalSlice";

export function Content() {
    return (
        <div className="flex flex-row gap-4 h-full py-4 max-w-full">
            <AddMemory />
            <ContentDiv />
        </div>
    );
}

export function AddMemory() {
    const dispatch=useDispatch()
    return (
        <div className="border-dashed border-2 border-grey-200 rounded-lg hover:cursor-pointer transition-all duration-300 ease-in-out
        hover:scale-105 hover:shadow-xl hover:border-gray-500 flex flex-col p-6 w-64 h-64" onClick={()=>{dispatch(setModalState())}}>
            <Plus className="h-12 w-12 " />
            <div className="text-2xl font-semibold mt-2 dark:text-gray-100">Add to your second brain.</div>
            <div className="text-gray-600 dark:text-gray-400 font-medium mt-4">Add a link, a note, a document,tweet, etc.</div>
        </div>
    );
}

export function ContentDiv() {
    return (
        <Masonry
            columns={{ xs: 1, sm: 2, md: 3, lg: 4}} 
            spacing={3} 
        >
            <Card type="twitter" link={"https://x.com/SahilBloom/status/1881468830544970082"} />
            <Card type="youtube" link={"https://www.youtube.com/watch?v=1MTyCvS05V4"} />
            <Card type="twitter" link={"https://x.com/SahilBloom/status/1881468830544970082"} />
            <Card type="youtube" link={"https://www.youtube.com/watch?v=1MTyCvS05V4"} />
            <Card type="twitter" link={"https://x.com/SahilBloom/status/1881468830544970082"} />
            <Card type="youtube" link={"https://www.youtube.com/watch?v=1MTyCvS05V4"} />
            <Card type="twitter" link={"https://x.com/SahilBloom/status/1881468830544970082"} />
            
            <Card type="twitter" link={"https://x.com/SahilBloom/status/1881468830544970082"} />
            <Card type="youtube" link={"https://www.youtube.com/watch?v=1MTyCvS05V4"} />
            <Card type="twitter" link={"https://x.com/SahilBloom/status/1881468830544970082"} />
            
            <Card type="twitter" link={"https://x.com/SahilBloom/status/1881468830544970082"} />
            <Card type="youtube" link={"https://www.youtube.com/watch?v=1MTyCvS05V4"} />
            <Card type="twitter" link={"https://x.com/SahilBloom/status/1881468830544970082"} />
            
        </Masonry>
    );
}

