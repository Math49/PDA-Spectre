import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

export default function NotificationPopup() {
    // Accéder aux flash messages depuis la page actuelle via Inertia
    const { flash } = usePage().props;

    const [showPopup, setShowPopup] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (flash && flash.success) {
            setShowPopup(true);
            setIsAnimating(true);
            // Désactiver l'animation après la fin de l'animation (exemple 0.5s)
            setTimeout(() => setIsAnimating(false), 10000);
        }
    }, [flash]);

    return (
        showPopup && (
            <div className="fixed z-50 top-[0%] right-[0%]">
                <div
                    id="modal-box"
                    className={`h-[10vh] flex items-center gap-2 p-6 bg-[#00010F] bg-opacity-80 rounded-l-[20px] transition-all duration-500 ease-in-out transform ${
                        isAnimating ? "translate-x-0" : "translate-x-[100vw]"
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-[#3fc02e] mx-auto h-[5vh] w-[5vh] rounded-full border-[2px] border-[#3fc02e]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                    <p className="text-[2vh] text-white">
                        {flash.success}
                    </p>
                </div>
            </div>
        )
    );
}
