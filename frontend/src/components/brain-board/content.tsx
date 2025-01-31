import { Plus } from "lucide-react";
import { Card } from "./card";
import Masonry from "@mui/lab/Masonry";
import { useDispatch } from "react-redux";
import { setModalState } from "../../redux/Slices/modalSlice";

import { useEffect, useState } from "react";

export function Content() {
    return (
        <div className="mt-2 flex gap-4">
            <AddMemory />
            <ContentDiv />
        </div>
    );
}

export function AddMemory() {
    const dispatch = useDispatch()
    return (
        <div className="border-dashed border-2 border-grey-200 rounded-lg hover:cursor-pointer transition-all duration-300 ease-in-out
        hover:scale-105 hover:shadow-xl hover:border-gray-500 flex flex-col p-6 w-64 h-64" onClick={() => { dispatch(setModalState()) }}>
            <Plus className="h-12 w-12 " />
            <div className="text-2xl font-semibold mt-2 dark:text-gray-100">Add to your second brain.</div>
            <div className="text-gray-600 dark:text-gray-400 font-medium mt-4">Add a link, a note, a document,tweet, etc.</div>
        </div>
    );
}






// import { getContent } from "../../services/contentService";
import { BASEURL, privateAxios } from "../../config/axiosConfig";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AddMemoryModal } from "../modals/add-memory-modal";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export interface ScrappedProps {
    author?: string;
    contentId?: string;
    description?: string;
    imageUrl?: string;
    logoUrl?: string;
    originUrl?: string;
    publisher?: string;
    title?: string;
    url?: string;
    _id?: string;
}
interface ContentProps {
    _id: string;
    type: string;
    link?: string;
    text?: string;
    tags?: string[];
    scrapped?: ScrappedProps;
    userId: string;
    timestamp: Date;

}

export function ContentDiv() {
    const [content, setContent] = useState<ContentProps[]>([]);
    const contentChange = useSelector((state: RootState) => state.content.value);
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    async function fetchContent() {
        try {
            console.log("Fetching content")
            const content = await axiosPrivate.get(`${BASEURL}/api/v1/content`);
            console.log(content.data.content);
            setContent(content.data.content);
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        fetchContent();
    }, [contentChange]);


    function populate() {
        return content.map(({ _id, type, link, text, timestamp, scrapped }) => <Card
            key={_id}
            contentId={_id}
            type={type}
            link={link}
            scrapped={scrapped}
            text={text}
            timestamp={timestamp}
        />)
    }
    return (

        <>

            <Masonry className="flex"

                columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
                spacing={3}
            >
                {populate()}
            </Masonry>
        </>
    );
}

