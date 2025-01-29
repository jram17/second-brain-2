import { AddMemoryModal } from "../modals/add-memory-modal";
import { Content } from "./content";
import { Menu } from "./menu";
import { useSelector } from 'react-redux'
import type { RootState } from "../../redux/store";

export function Board(){

    const isModal = useSelector((state: RootState) => state.modal.isModal);
    // const isModal=true;
    return (
        <div className="py-24 pl-16 gap-2 max-w-full overflow-x-hidden">
           {isModal && <AddMemoryModal />} 
            <Menu/>
            <Content/>
        </div>
    )
}