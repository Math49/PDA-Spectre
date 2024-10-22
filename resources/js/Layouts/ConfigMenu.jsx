import React from "react";
import ConfigNav from "@/Components/ConfigNav";
import { hasPermission } from "@/utils/hasPermission";

export default function ConfigMenu({auth, header, children }) {

    return (
        <div className="relative z-10 bg-gradient-to-b from-[rgba(94,127,140,0.4)] to-[rgba(49,78,89,0.4)] to-20% w-[8vw] h-[100vh] flex flex-col items-center gap-[3vh] py-[2vh] overflow-hidden">
            <a href="/" className="flex flex-col items-center h-min w-full">
                <img
                    src="/images/icon/spectre_phantom2.png"
                    className="w-auto h-[10vh]"
                />
                <p className="text-white font-bold text-[2vh]">S.P.E.C.T.R.E</p>
            </a>
            <p className="text-center text-white font-bold text-[2vh] w-full h-min">
                Zone de <b></b> Configuration
            </p>
            <div className="flex flex-col items-center justify-between w-[100%] h-min gap-[3vh]">
                <ConfigNav href={route("dashboard")} active={route().current('dashboard')}>
                    <i class="fa-solid fa-house"></i>
                </ConfigNav>
                {hasPermission(auth, "viewUser") ? (
                <ConfigNav href={route("usersList")} active={route().current('usersList')}>
                    <i class="fa-solid fa-users"></i>
                </ConfigNav>
                ) : null}
                {hasPermission(auth, "viewAbsence") ? (
                <ConfigNav href={route("absenceAdmin")} active={route().current('absenceAdmin')}>
                    <i class="fa-regular fa-calendar"></i>
                </ConfigNav>
                ) : null}
                {hasPermission(auth, "viewAll") ? (
                <ConfigNav href={route("historique")} active={route().current('historique')}>
                    <i class="fa-solid fa-clock-rotate-left"></i>
                </ConfigNav>
                ) : null}
                {hasPermission(auth, "loyaute") ? (
                <ConfigNav href={route("loyaute")} active={route().current('loyaute')}>
                    <i class="fa-solid fa-medal"></i>
                </ConfigNav>
                ) : null}
                {hasPermission(auth, "editBDD") ? (
                <ConfigNav href={route("BDDAdminList")} active={route().current('BDDAdminList')}>
                    <i class="fa-solid fa-address-card"></i>
                </ConfigNav>
                ) : null}
            </div>
        </div>
    );
}
