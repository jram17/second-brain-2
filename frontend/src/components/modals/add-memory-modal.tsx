import {  useRef, useState } from "react";
import { X, Globe,  File, PlusCircle, Link, NotebookPen, Merge } from "lucide-react";
import { useDispatch } from "react-redux";
import { resetModalState } from "../../redux/Slices/modalSlice";

import Button from "../button";
import { BASEURL, privateAxios } from "../../config/axiosConfig";
import { toast } from "sonner";
import { toggleState } from "../../redux/Slices/contentSlice";



export function AddMemoryModal() {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("Website");
    const linkRef = useRef<HTMLInputElement>();
    const noteRef =useRef<HTMLInputElement>();

    const handleMemory = async () => {
        const link = linkRef.current?.value;
        const toastId = toast.loading("Adding to memory...");
        if (link) {
            let type = "";
            
            if (link.includes("youtube")) {
                type = "Youtube";
            } else if (link.includes("x.com") || link.split(".")[0].includes("twitter")) {
                type = "Twitter";
            } else {
                type = "Website";
            }

            console.log("hit");

            const status=await privateAxios.post(`${BASEURL}/api/v1/content`, {
                link,
                type
            });

            dispatch(resetModalState());
            dispatch(toggleState());

            if(status.data.flag){
                toast.success("Memory added successfully!",{
                    id: toastId,
                    action:{
                        label:'close',
                        onClick:()=>{}
                    }
                });
            }else{
                toast.error("Failed to add memory!");
            }
            

            
        }else{
            const type="Note";
            const text=noteRef.current?.value;
            const status=await privateAxios.post(`${BASEURL}/api/v1/content`, {
                text,
                type
            });
            dispatch(resetModalState());
            dispatch(toggleState());

            if(status.data.flag){
                toast.success("Memory added successfully!",{
                    id: toastId,
                    action:{
                        label:'close',
                        onClick:()=>{}
                    }
                });
            }else{
                toast.error("Failed to add memory!");
            }
        }

        
    };


    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={() => dispatch(resetModalState())}>
            <div className="bg-white p-6 rounded-lg shadow-lg w-auto"
                onClick={(e) => e.stopPropagation()}>

                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <PlusCircle />Add Memory
                    </h2>
                    <X className="cursor-pointer text-gray-600 hover:text-black" onClick={() => dispatch(resetModalState())} />
                </div>

                <div className="group grid grid-cols-4 border gap-2 p-2 rounded-md bg-gray-50 dark:bg-stone-900 dark:border-neutral-700">
                    <div className={`p-3 rounded-md text-sm font-medium cursor-pointer ${activeTab === "Website" ? "bg-blue-50 border border-blue-200" : "bg-transparent border border-transparent"}`}
                        onClick={() => setActiveTab("Website")}
                    >
                        <Globe className="h-4 w-4 text-blue-500" />
                        <div className="mt-2 dark:text-gray-300">Website</div>
                    </div>

                    <div className={`p-3 rounded-md text-sm font-medium cursor-pointer  ${activeTab === "Notes" ? "bg-green-50 border border-green-200" : "bg-transparent border border-transparent"}`}
                        onClick={() => setActiveTab("Notes")}
                    >
                        <NotebookPen className="h-4 w-4 text-green-500" />
                        <div className="mt-2 dark:text-gray-300">Notes</div>
                    </div>

                    <div className={`p-3 rounded-md text-sm font-medium cursor-pointer  ${activeTab === "Documents" ? "bg-yellow-50 border border-yellow-200" : "bg-transparent border border-transparent"}`}
                        onClick={() => setActiveTab("Documents")}
                    >
                        <File className="h-4 w-4 text-yellow-500" />
                        <div className="mt-2 dark:text-gray-300">Documents</div>
                    </div>
                    <div className={`p-3 rounded-md text-sm font-medium cursor-pointer  ${activeTab === "Integrations" ? "bg-purple-100 border border-purple-200" : "bg-transparent border border-transparent"}`}
                        onClick={() => setActiveTab("Integrations")}
                    >
                        <Merge className="h-4 w-4 text-purple-500" />
                        <div className="mt-2 dark:text-gray-300">Integrations</div>
                    </div>
                </div>



                {activeTab === "Website" && <div className="mt-4 border border-blue-100 shadow-md  p-4 rounded-md">
                    <label className=" flex items-center gap-2 pb-2 justify-start ">
                        <Link className="h-4 w-4 text-blue-500" /><div className="font-medium text-sm ">Website or Tweet </div></label>
                    <input ref={linkRef} type="text" placeholder="https://google.com"
                        className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-blue-300 outline-none" />
                </div>}

                {
                    activeTab === "Notes" &&
                    <div className="mt-4 rounded-md border border-green-100 dark:border-stone-700 p-4 shadow-md dark:bg-stone-900">
                        <div className="flex gap-2 items-center">
                            <NotebookPen className="h-4 w-4 text-green-500" />
                            <label htmlFor="note" className="text-sm font-medium dark:text-gray-200">Note</label>
                        </div>
                        <textarea ref={noteRef} id="note" name="note" placeholder="Add your note" rows={3} className="mt-4 w-full p-4 border rounded-md focus:outline-zinc-900 font-semibold  ">
                        </textarea>

                    </div>
                }

                {
                    activeTab === "Documents" &&
                    <div className="mt-4 rounded-md border border-purple-100 dark:bg-stone-900 dark:border-stone-700 p-4 shadow-md">
                        <h1 className="text-sm font-semibold dark:text-gray-300 ">working Documents</h1></div>
                }

                {
                    activeTab === "Integrations" &&
                    <div className="mt-4 rounded-md border border-purple-100 dark:bg-stone-900 dark:border-stone-700 p-4 shadow-md">
                        <h1 className="text-sm font-semibold dark:text-gray-300 ">Working on Integrations</h1></div>
                }

                <div className="flex justify-between mt-4">
                    <Button
                        text="Cancel"
                        variant={"outline"}
                        onClick={() => {
                            dispatch(resetModalState());
                        }}
                    ></Button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
                        onClick={handleMemory}>
                        Add Memory
                    </button>
                </div>
            </div>
        </div>
    );
}
