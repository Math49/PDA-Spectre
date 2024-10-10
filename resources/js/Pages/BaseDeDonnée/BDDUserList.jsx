import { Link, Head } from '@inertiajs/react';
import React, { useState } from 'react';
import UserHeader from '@/Layouts/UserHeader';
import { Input, Textarea } from "@nextui-org/react";
import { DateInput } from "@nextui-org/date-input";
import { Inertia } from '@inertiajs/inertia';
import { hasPermission } from '@/utils/hasPermission';
import NotificationPopup from '@/Components/NotificationPopup';

export default function BDDUserList({ auth, users, SpectreData, BDD }) {

    let user = auth.user;

    return (
        <div className='background-spectre z-10 relative flex flex-col gap-[5vh] h-[100vh]'>
            <Head title="BDD Liste" />
            <UserHeader auth={auth} />
            <NotificationPopup />

            <main className='w-full h-full overflow-hidden'>
                <div className='flex flex-col py-[2vh] px-[2vw] h-full gap-[2vh]'>
                    <div className='flex w-full justify-center'>
                        <h3 className='text-white font-bold text-[4vh]'>Base de Donnée</h3>
                    </div>
                    <div className='h-min'>
                        {hasPermission(auth, 'addBDD') ? (
                        <a href={route("BDDUserCreate")} className='text-white font-semibold text-[3.5vh] flex gap-[1vw] items-center w-min px-[1.5vw] py-[0.8vh] border-white border-1 border-opacity-75 rounded-[2px]'>
                            <p>Add</p>
                            <i class="fa-solid fa-plus"></i>
                        </a>
                        ) : null}
                    </div>
                    <div className='flex flex-wrap gap-[2vh] items-start justify-center overflow-y-scroll h-full w-full'>
                        {BDD.map((data, index) => (
                            <div 
                                key={index}
                                className='w-[24%] gap-[1vh] flex justify-center items-center cursor-pointer'
                                onClick={() => Inertia.visit(route("BDDView", { id: data.id }))}
                            >
                                <div className='border-white border-1 border-opacity-80 min-w-[8vh] max-w-[8vh] w-[8vh] min-h-[8vh] max-h-[8vh] h-[8vh] flex justify-center items-center'>
                                    <p className='text-white text-[4vh]'>{data.nom.charAt(0)}{data.prenom.charAt(0)}</p>
                                </div>
                                <div className='border-white border-1 border-opacity-80 h-[8vh] w-full'>
                                    <div className='flex justify-around items-center'>
                                        <p className='text-[#71FFFF] text-[2.5vh] '>{data.nom} {data.prenom}</p>
                                        <p className='text-white text-[2vh] border-b-1 border-[#5E7F8C]'>{data.status}</p>
                                    </div>
                                    <div className='flex justify-around items-center'>
                                        <p className='text-white text-[2vh]'>{data.branche}</p>
                                        <p className='text-white text-[2vh]'>{data.grade}</p>
                                        <p className='text-white text-[2vh]'>{data.groupe}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}