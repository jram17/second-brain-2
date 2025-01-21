import { AddMemoryModal } from "../modals/add-memory-modal";
import { Content } from "./content";
import { Menu } from "./menu";


export function Board(){
    return (
        <div className="py-24 pl-16 gap-2 ">
            <AddMemoryModal/>
            <Menu/>
            <Content/>
        </div>
    )
}