
interface smoothProps{
    event:React.MouseEvent<HTMLAnchorElement>;
    sectionId: string;
}
export function handleSmoothScroll({event, sectionId}:smoothProps) {
    event.preventDefault(); // Prevent default anchor behavior
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}