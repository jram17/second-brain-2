import { Globe, NotebookPen, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Tweet } from 'react-tweet';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { BASEURL } from '../../config/axiosConfig';
import { toast } from 'sonner';
import { toggleState } from '../../redux/Slices/contentSlice';

interface CardProps {
    contentId: string;
    text: string;
    link: string;
    type: string;
    timestamp?: Date;
}






export function Card({ contentId, link, text, type, timestamp }: CardProps) {
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();



    function populateTweetCard(link: string) {
        const tweetId: string = link.split('/')[5];
        return (
            <div className='light dark:dark react-tweet-theme' >
                <Tweet id={tweetId} classname="m-0 "/>
            </div>
        );
    }

    function populateWebsiteCard(link: string) {
        return <div className='px-6 py-10 font-normal whitespace-normal break-words overflow-auto'>{link}</div>
    }
    function populateNoteCard(text: string) {
        return <div className='px-6 py-10 font-normal whitespace-normal break-words overflow-auto'>{text}</div>
    }

    // function formatDate(timestamp: Date) {
    //     const date = new Date(timestamp);
    //     const day = String(date.getDate()).padStart(2, '0');
    //     const month = String(date.getMonth() + 1).padStart(2, '0');
    //     const year = date.getFullYear();
    //     return `Created on ${day}/${month}/${year}`;
    // }

    const handleDelete = async (contentId: String) => {
        try {

            console.log(`Deleting ${contentId}`);
            const response = await axiosPrivate.delete(`${BASEURL}/api/v1/${contentId}`);
            if (response.data.valid) {
                toast.success("Content deleted successfully", {
                    action: {
                        label: 'close',
                        onClick: () => { }
                    }
                });
                dispatch(toggleState());
            } else {
                toast.error("Failed to add memory!");
            }
        } catch (error) {

        }
    }

    function cardType(type: string) {
        if (type === "Youtube" || type === "Twitter") {
            return null;
        }

        return (

            <div className='bg-gray-200 rounded-3xl text-gray-800  px-2 py-1 mt-1'>
                {type === "Note" && (
                    <div className='flex items-center gap-1'>
                        <NotebookPen className='h-3 w-3' />
                        <div className='text-xs '>Note</div>
                    </div>
                )}
                {type === "Website" && (
                    <div className='flex items-center gap-1'>
                    <Globe className='h-3 w-3' />
                    <div className='text-xs '>WebPage</div>
                </div>
                )}
            </div>
        );
    }

    return (
        <div className={`group relative ${type === "Note" ? "bg-green-50 " : "bg-white"} 
        rounded-2xl shadow-md max-w-72   min-w-72 transition-all duration-300 overflow-hidden border-gray-300 border   ` }>
            <div>
                <div className='absolute top-2 right-2 '>{cardType(type)}</div>
                {type === "Youtube" && (
                    <iframe
                        className="w-full"
                        src={link.replace("watch?v=", "embed/")}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                )}

                {type === "Twitter" && populateTweetCard(link)}
                {type === "Website" && populateWebsiteCard(link)}
                {type === "Note" && populateNoteCard(text)}
                {/* onhover availd this  */}
                <div className='absolute bottom-2 right-2 bg-gray-300 p-2 rounded-full cursor-pointer hidden group-hover:block transition-opacity duration-200' onClick={() => handleDelete(contentId)}>
                    <Trash2 className='h-3 w-3 text-gray-700' />
                </div>

            </div>
        </div>
    );
}