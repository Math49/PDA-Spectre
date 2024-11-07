import { Link, Head } from "@inertiajs/react";
import React, { useState } from "react";
import UserHeader from "@/Layouts/UserHeader";
import { Input, Textarea } from "@nextui-org/react";
import { DateInput } from "@nextui-org/date-input";
import { Inertia } from "@inertiajs/inertia";
import dayjs from 'dayjs';
import { hasPermission } from '@/utils/hasPermission';
import NotificationPopup from "@/Components/NotificationPopup";
import NonAffiliee from "@/Components/NonAffiliee";


export default function BDDUserView({ auth, data, antecedents }) { 


    
    const submitAntecedents = (e) => {
        e.preventDefault();

        if (hasPermission(auth,'editAntecedentsBDD')) {
            Inertia.post(route('addBDDAntecedents', data.id), {
                description: e.target[0].value,
            });
        }
    };

    return (
        <div className="background-spectre z-10 relative flex flex-col gap-[5vh] h-[100vh]">
            <Head title="BDD View" />
            <UserHeader auth={auth} />
            <NonAffiliee />
            <NotificationPopup />

            <main className="w-full h-full overflow-hidden">
                <div className="flex flex-col py-[2vh] px-[2vw] h-full gap-[2vh]">
                    <div className="w-max">
                        <a
                            href={route("BDDList")}
                            className="flex text-white gap-[0.5vw] items-center hover:underline text-[2vh]"
                        >
                            <i class="fa-solid fa-arrow-left"></i>
                            <p className="font-normal">Retour à la Liste</p>
                        </a>
                    </div>
                    <div className="flex h-full w-full px-[10vh] gap-[5vh] items-center justify-center">
                        <div className="flex flex-col items-center">
                            <p className="text-white font-light text-[2.5vh]">
                                ID: {data.steam_id}
                            </p>
                            <div className="relative w-[50vh] h-[50vh]">
                                <img
                                    src={`/storage/${data.lien_photo}`}
                                    className="background-filter w-full h-full"
                                ></img>
                                <div className="absolute inset-0 background-filter"></div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[3vh] w-[25%] h-full justify-center">
                            <div className="background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[20px] px-[2vw] py-[5vh] flex flex-col items-center justify-center gap-[3vh] w-full">
                                <div className="flex justify-between w-full border-b-1 border-[#71FFFF] border-opacity-40">
                                    <p className="text-white font-bold text-[2vh]">
                                        Nom
                                    </p>
                                    <p className="text-white font-light text-[2vh]">
                                        {data.nom}
                                    </p>
                                </div>
                                <div className="flex justify-between w-full border-b-1 border-[#71FFFF] border-opacity-40">
                                    <p className="text-white font-bold text-[2vh]">
                                        Prénom
                                    </p>
                                    <p className="text-white font-light text-[2vh]">
                                        {data.prenom}
                                    </p>
                                </div>
                                <div className="flex justify-between w-full border-b-1 border-[#71FFFF] border-opacity-40">
                                    <p className="text-white font-bold text-[2vh]">
                                        Grade
                                    </p>
                                    <p className="text-white font-light text-[2vh]">
                                        {data.grade}
                                    </p>
                                </div>
                                <div className="flex justify-between w-full border-b-1 border-[#71FFFF] border-opacity-40">
                                    <p className="text-white font-bold text-[2vh]">
                                        Matricule
                                    </p>
                                    <p className="text-white font-light text-[2vh]">
                                        {data.matricule}
                                    </p>
                                </div>
                                <div className="flex justify-between w-full border-b-1 border-[#71FFFF] border-opacity-40">
                                    <p className="text-white font-bold text-[2vh]">
                                        {parseInt(data.GI) === 1 ? 'Groupe' : 'Branche'}
                                    </p>
                                    <p className="text-white font-light text-[2vh]">
                                        {data.branche}
                                    </p>
                                </div>
                            </div>
                            <div className="background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[20px] px-[2vw] py-[3vh] flex flex-col items-center justify-center gap-[2vh]">
                                <p className="text-white font-bold text-[4vh]">
                                    Statut
                                </p>
                                <p className="text-[#71FFFF] font-bold text-[3vh]">
                                    {data.status}
                                </p>
                            </div>
                        </div>
                        <div className="w-[40%] h-full flex flex-col justify-center gap-[2vh]">
                            <div className="background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[20px] px-[2vw] py-[3vh] flex flex-col items-center justify-start gap-[2vh] w-full h-[90%]">
                                <h3 className="text-white font-bold text-[2.5vh]">
                                    Antécédents
                                </h3>
                                {hasPermission(auth,'editAntecedentsBDD') ? (
                                <form
                                    onSubmit={submitAntecedents}
                                    className="flex gap-[1vw] items-center w-[80%]"
                                >
                                    <Textarea
                                        variant="bordered"
                                        placeholder="Description"
                                        disableAnimation
                                        disableAutosize
                                        classNames={{
                                            base: "justify-end h-[8vh]",
                                            inputWrapper: "!border-[#5E7F8C]",
                                            input: "font-tiny text-white border-none text-[2vh]",
                                        }}
                                    />
                                    <button className="ms-4 bg-gradient-to-br from-[#5E7F8C] to-[#314E59] text-white font-bold rounded-[20px] w-[10vw] h-[5vh] text-[2vh]">
                                        Ajouter
                                    </button>
                                </form>
                                ) : null}
                                <div className="flex justify-around border-white border-b-1 w-full">
                                    <p className="text-white font-bold w-[20%] text-center">
                                        ID
                                    </p>
                                    <p className="text-white font-bold w-[20%] text-center">
                                        Date
                                    </p>
                                    <p className="text-white font-bold w-[60%] text-center">
                                        Détails
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3 overflow-y-scroll w-full h-[30vh]">
                                    {antecedents.map((antecedent, counter) => (
                                        <div key={antecedent.id} className='flex text-warp h-[20vh] text-[2vh]'>
                                        <p className='text-white opacity-50 w-[20%] text-center'>{counter + 1}</p>
                                        <p className='text-white opacity-50 w-[20%] text-center'>{dayjs(antecedent.created_at).format('DD/MM/YYYY')}</p>
                                        <p className='text-white opacity-50 w-[60%] h-auto text-center'>{antecedent.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
