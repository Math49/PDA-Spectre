import ConfigMenu from '@/Layouts/ConfigMenu';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect, useRef } from 'react';
import ConfigHeader from '@/Layouts/ConfigHeader';
import ConfigContent from '@/Layouts/ConfigContent';
import { Select, SelectItem, Input } from "@nextui-org/react";
import { Inertia } from '@inertiajs/inertia';
import dayjs from 'dayjs';

export default function Historique({ auth, historiques, users, header}) {
    
    let Historiques = [];
    historiques.map((historique) => {
        let user = users.find(user => parseInt(user.id) === parseInt(historique.user_id));
        Historiques.push({
            id: historique.id,
            date: dayjs(historique.created_at).format('DD/MM/YYYY à HH:mm'),
            user: user ? user.username : 'Unknown',
            type: historique.type,
            description: historique.description
        });
    });

    Historiques = Historiques.reverse();

    return (
        <div className='h-[100vh] w-[100vw] overflow-hidden flex relative z-20'>
            <Head title="Configuration" />
            <ConfigMenu auth={auth} />
            <NonAffiliee />
            <div className='py-[3vh] px-[2vw] w-full h-[100%]'>
                <ConfigHeader data={header} title={"Historique"}/>
                <div className='bg-[rgba(255,255,255,0.5)] w-[100%] h-[2px]'></div>
                <ConfigContent>
                    <div className='flex justify-center w-full py-[3vh] px-[2vw] h-[100%]'>
                        <div className='w-[90%] overflow-y-hidden'>
                            <div className='flex justify-around border-white border-b-1 mb-[2vh]'>
                                <p className='text-white font-bold w-[10%] text-center'>ID</p>
                                <p className='text-white font-bold w-[10%] text-center'>Date & Heure</p>
                                <p className='uppercase text-white font-bold w-[10%] text-center'>Qui</p>
                                <p className='uppercase text-white font-bold w-[10%] text-center'>Type</p>
                                <p className='uppercase text-white font-bold w-[40%] text-center'>Détails</p>
                            </div>
                            <div className='flex flex-col gap-3 overflow-y-scroll w-full h-[50vh]'>
                                {Historiques.map((historique) => (
                                    <div key={historique.id} className='flex justify-around text-warp h-[20vh] text-[2vh] w-full'>
                                        <p className='text-white opacity-50 w-[10%] text-center'>{historique.id}</p>
                                        <p className='text-white opacity-50 w-[10%] text-center'>{historique.date}</p>
                                        <p className='text-white opacity-50 w-[10%] text-center'>{historique.user}</p>
                                        <p className='text-white opacity-50 w-[10%] text-center'>{historique.type}</p>
                                        <p className='text-white opacity-50 w-[40%] h-auto text-center'>{historique.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </ConfigContent>
            </div>
        </div>
    );
}
