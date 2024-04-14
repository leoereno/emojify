import { Children, PropsWithChildren, ReactNode } from "react";

interface ButtonProps {
    color: 'green' | 'red' | 'yellow';
    children: ReactNode;
    type?: 'submit' 
}
export default function Button({color, children, type}: ButtonProps){



    return (
        <button 
            type={type} 
            className={`bg-${color}-400 transition duration-200 hover:bg-${color}-300 font-bold text-xl p-2 rounded-lg m-2 shadow-md`}>
            {children}
        </button>
    )
}