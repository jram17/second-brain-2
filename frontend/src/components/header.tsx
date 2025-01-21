import { Brain, Plus } from "lucide-react";
import { Button } from "./ui/button";


export function Header() {
    return (
        <div className=" fixed top-0 left-0 z-50 bg-purple-500 flex justify-between  py-4 px-4  w-full  backdrop-blur-md border-b border-gray-200">
            <div className="hover:text-gray-600 p-2">
                <Brain className="h-6 w-6 " />
            </div>
            <div className="flex gap-2">
                <Button variant={"outline"} className="flex items-center rounded-md"  >
                    <Plus/>
                    <div className="font-semibold">
                        Add memory
                    </div></Button>
                <Button variant={"outline"}>user</Button>
            </div>
        </div>
    )
}