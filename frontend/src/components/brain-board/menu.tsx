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
    return (
        <div className="text-gray-600 dark:text-gray-400 
        px-4 rounded-md py-2 font-medium  hover:shadow-md
        cursor-pointer text-center
        hover:bg-gray-100 hover:text-gray-950 dark:hover:bg-zinc-900 dark:hover:text-gray-200">
            {item}
        </div>
    );
}
