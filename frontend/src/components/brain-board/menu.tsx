import { useDispatch, useSelector } from "react-redux";
import { setState } from "../../redux/Slices/stateSlice";
import { RootState } from "../../redux/store";

export function Menu() {
    return (
        <nav className="flex flex-row ">
            <MenuDiv item="All Memories" />
            <MenuDiv item="Web Pages" />
            <MenuDiv item="Videos" />
            <MenuDiv item="Tweets" />
            <MenuDiv item="Documents" />
            <MenuDiv item="Notes" />
        </nav>
    );
}

interface MenuDivProps {
    item: string;
}



export function MenuDiv({ item }: MenuDivProps) {
    const selectedState = useSelector((state:RootState)=>state.state.value);
    const dispatch = useDispatch();

    function findState(item: String) {
        if (item === "Web Pages") {
            dispatch(setState("Website"));
        } else if ((item === "Videos")) {
            dispatch(setState("Youtube"));
        } else if ((item === "Tweets")) {
            dispatch(setState("Twitter"));
        } else if (item === "Notes") {
            dispatch(setState("Note"));
        } else if (item === "Documents") {
            dispatch(setState("Document"));
        } else {
            dispatch(setState("All Memories"));
        }
    }


    return (
        <div className="text-gray-600 dark:text-gray-400 
        px-4 rounded-md py-2 font-medium  hover:shadow-md
        cursor-pointer text-center
        hover:bg-gray-100 hover:text-gray-950 dark:hover:bg-zinc-900 dark:hover:text-gray-200"
            onClick={() => findState(item)}
        >
            {item}
        </div>
    );
}
