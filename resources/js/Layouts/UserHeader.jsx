import React from 'react';
import LogoSCP from '@/Components/LogoSCP';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { hasPermission } from '@/utils/hasPermission';

export default function UserHeader(auth) {

    auth = auth.auth;

    return (
        <header className='relative z-50'>
            <div className="flex items-center bg-gradient-to-b from-[#314E59] to-[#00010F] to-25% h-[70px] px-20">
                <div className="flex justify-center gap-[0.5vw] items-center w-[33%]">
                    <LogoSCP className="h-[8vh]"/>
                    <a href='/' className="text-white text-opacity-75 text-[5vh] uppercase bebas">Fondation SCP</a>
                    <img className="h-[8vh]" src="/images/icon/spectre_phantom2.png" alt="Logo Spectre" />
                </div>
                <div className='w-[33%] flex justify-center items-center'>
                    <p className='text-white uppercase bebas text-[4vh]'>Personal Digital Assistant</p>
                </div>
                <div className='flex justify-center gap-[2vw] w-[33%] items-center'>
                    <a href={route('absenceView')} className='text-white font-bold text-[2.2vh] hover:underline'>Absence</a>
                    <a href={route('BDDList')} className='text-white font-bold text-[2.2vh] hover:underline'>Base de données</a>
                    {hasPermission(auth, 'dashboard') ? (
                    <a href={route('dashboard')} className='text-white font-bold text-[2.2vh] hover:underline'>Configuration</a>
                    ) : null}
                    <ResponsiveNavLink method="post" href={route('logout')} className=' text-red-600' as="button"><i class="fa-solid fa-power-off"></i></ResponsiveNavLink>
                </div>
            </div>
            <div className='flex justify-center'>
                <p className='text-white bebas text-[9vh]'>S.P.E.C.T.R.E.</p>
            </div>
        </header>
    )
}