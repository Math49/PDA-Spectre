import { Link } from '@inertiajs/react';

export default function ConfigNav({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'text-[5vh] w-[100%] flex justify-center items-center p-[10%] ' +
                (active
                    ? 'text-[#00010F] bg-[#71FFFF] rounded-l-[50px] hover:text-[rgba(0,1,15,0.75)] focus:text-[rgba(0,1,15,0.75)]'
                    : 'border-transparent text-[#71FFFF] hover:opacity-50 focus:opacity-50') +
                className
            }
        >
            {children}
        </Link>
    );
}
