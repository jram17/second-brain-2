import  { ReactElement } from 'react'


interface ButtonProps {
    variant: "primary" | "secondary" | "outline";
    text: string;
    startIcon?: ReactElement;
    onClick?:()=>void;
    fullwidth?: boolean;
    loading?: boolean;
}

const variantClasses = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-500",
    "outline": " text-gray-800",
}

const defaultStyle = "px-4 py-2 rounded-md font-normal flex justify-center items-center"
const Button = ({ variant, text, startIcon,onClick,fullwidth, loading }: ButtonProps) => {
    return (
        <button onClick={onClick} className={variantClasses[variant] + " " + defaultStyle +`${fullwidth ? " w-full flex justify-center " : ""} ${loading ? "opacity-45" : ""} `} disabled={loading}>
            <div className='pr-2'>
                {startIcon}
            </div>
            {text}

        </button>
    )
}

export default Button