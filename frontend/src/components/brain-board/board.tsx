import { Content } from "./content";
import { Menu } from "./menu";


export function Board(){
    return (
        <div className="py-8 px-24 gap-2">
            <Menu/>
            <Content/>
        </div>
    )
}