import { AddMemoryModal } from "../modals/add-memory-modal";
import { UserModal } from "../modals/user-modal";
import { Content } from "./content";
import { Menu } from "./menu";
import { useSelector } from 'react-redux'
import type { RootState } from "../../redux/store";
import { AiSearch } from "../ai-query-section";


export function Board(){

    const isModal = useSelector((state: RootState) => state.modal.isModal);
    // const isModal=true;
    const isUserModal= useSelector((state:RootState)=> state.userModal.isUserModal)
    // const isUserModal=true;
    return (
        <div className="py-24 pl-16 gap-2 overflow-x-hidden  max-w-full">
           {isModal && <AddMemoryModal />} 
            {isUserModal && <UserModal/>}
           <AiSearch/>
            <Menu/>
            <Content/>
        </div>
    )
}