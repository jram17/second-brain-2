import { Plus } from "lucide-react";

export function Content() {
    return (
        <div className="flex flex-row gap-4 h-full py-4">
            <AddMemory />
            <ContentDiv />
        </div>
    );
}

export function AddMemory() {
    return (
        <div className="border-dashed border-2 border-grey-200 rounded-lg hover:cursor-pointer transition-all duration-300 ease-in-out
        hover:scale-105 hover:shadow-xl hover:border-gray-500 flex flex-col p-6 w-64">
            <Plus className="h-12 w-12 "/>
            <div className="text-2xl font-semibold mt-2 dark:text-gray-100">Add to your second brain.</div>
            <div className="text-gray-600 dark:text-gray-400 font-medium mt-4">Add a link, a note, a document,tweet, etc.</div>
        </div>
    );
}

export function ContentDiv() {
    return (
        <div className="h-full flex-grow">
           
        </div>
    );
}

