import { Trash2 } from 'lucide-react';
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

function populateTweetCard(link: string) {
    const tweetId: string = link.split('/')[5];
    return (
        <div >
            <Tweet id={tweetId} />
        </div>
    );
}

function populateWebsiteCard(link: string) {
    return <div className='p-4'>{link}</div>
}
function populateNoteCard(text: string) {
    return <div className='p-5 font-normal whitespace-normal break-words overflow-auto'>{text}</div>
}

function formatDate(timestamp: Date) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `Created on ${day}/${month}/${year}`;
}




export function Card({ contentId, link, text, type, timestamp }: CardProps) {
    const dispatch =useDispatch();
    const axiosPrivate =useAxiosPrivate();
    const handleDelete = async (contentId: String) => {
        try {
            
            console.log(`Deleting ${contentId}`);
            const response = await  axiosPrivate.delete(`${BASEURL}/api/v1/${contentId}`);
            if(response.data.valid){
                toast.success("Content deleted successfully",{
                    action:{
                        label:'close',
                        onClick:()=>{}
                    }
                });
                dispatch(toggleState());
            }else{
                toast.error("Failed to add memory!");
            }
        } catch (error) {
            
        }
    }

    return (
        <div className={`group relative ${type === "Note" ? "bg-green-50 border-green-50 border" : "bg-white"} 
        rounded-md shadow-md border-slate-100 max-w-72 border h-fit min-w-72 transition-all duration-300 overflow-hidden`}>
            <div>
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
                <div className='absolute bottom-2 right-2 bg-gray-300 p-2 rounded-full cursor-pointer hidden group-hover:block transition-opacity duration-200' onClick={()=>handleDelete(contentId)}>
                    <Trash2 className='h-3 w-3 text-gray-700' />
                </div>

            </div>
        </div>
    );
}