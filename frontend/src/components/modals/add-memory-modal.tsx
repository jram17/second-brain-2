import { XIcon } from "lucide-react";
import { Input } from "../input";
import { useRef } from "react";
import Button from "../button";
import { useDispatch } from "react-redux";
import { resetModalState } from "../../redux/Slices/modalSlice";

export function AddMemoryModal() {
    const dispatch = useDispatch();
    const modalRef = useRef<HTMLDivElement>(null);

    const handleBackdropClick = (event: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            dispatch(resetModalState());
        }
    };

    return (
        <div
            className="w-screen h-screen bg-white/30 backdrop-blur-md fixed top-0 left-0 flex justify-center items-center z-50"
            onClick={handleBackdropClick} 
        >
            <div
                ref={modalRef} 
                className="p-4 rounded-md shadow-lg bg-white outline outline-purple-300"
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="flex justify-end">
                    <div
                        className="cursor-pointer"
                        onClick={() => dispatch(resetModalState())}
                    >
                        <XIcon />
                    </div>
                </div>
                <div>
                    <Input reference={useRef()} placeholder={"title"} />
                    <Input reference={useRef()} placeholder={"link"} />
                </div>
                <div className="pt-2">
                    <div className="flex gap-1 justify-center pb-2">
                        <Button
                            text="Youtube"
                            variant="secondary"
                            onClick={() => {
                                // setType(ContentType.Youtube);
                            }}
                        ></Button>
                        <Button
                            text="Twitter"
                            variant="secondary"
                            onClick={() => {
                                // setType(ContentType.Twitter);
                            }}
                        ></Button>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Button onClick={() => { }} variant="primary" text="submit" />
                </div>
            </div>
        </div>
    );
}
