import { Tweet } from 'react-tweet';

interface CardProps {
    contentId?: string;
    title?: string;
    link: string;
    type?: string;
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

function formatDate(timestamp: Date) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `Created on ${day}/${month}/${year}`;
}

export function Card({ contentId, title, link, type, timestamp }: CardProps) {
    return (
        <div className={`bg-white rounded-md shadow-md border-slate-100  max-w-72 border h-fit min-w-72 transition-all duration-300 overflow-hidden`}>
            <div>
                {type === "youtube" && (
                    <iframe className="w-full " src={link.replace("watch?v=", "embed/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                )}

                {type === "twitter" && (
                    populateTweetCard(link)
                )}
            </div>
        </div>
    )
}