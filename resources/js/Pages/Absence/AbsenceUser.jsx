import { Link, Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import UserHeader from '@/Layouts/UserHeader';
import { Textarea } from "@nextui-org/react";
import { DateInput } from "@nextui-org/date-input";
import { Inertia } from '@inertiajs/inertia';
import NotificationPopup from '@/Components/NotificationPopup';

export default function AbsenceUser({ auth }) {

    let user = auth.user;

    const [dateStart, setDateStart] = useState(null);
    const [dateEnd, setDateEnd] = useState(null);
    const [reason, setReason] = useState(null);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [isEndDateDisabled, setIsEndDateDisabled] = useState(true);

    useEffect(() => {
        if (dateStart && dateEnd && reason) {
            setSubmitDisabled(false);
        } else {
            setSubmitDisabled(true);
        }
    }, [dateStart, dateEnd, reason]);

    const handleDateStart = (e) => {
        if (e.year && e.month && e.day) {
            const localDate = new Date(e.year, e.month - 1, e.day);
            const formattedDate = new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            setDateStart(formattedDate);
            setIsEndDateDisabled(false); 

            if (dateEnd && formattedDate > dateEnd) {
            setDateEnd(null);
            }
        }
    };
    
    const handleDateEnd = (e) => {
        if (e.year && e.month && e.day) {
            const localDate = new Date(e.year, e.month - 1, e.day);
            const formattedDate = new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            if (formattedDate >= dateStart) {
                setDateEnd(formattedDate);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (dateStart && dateEnd && reason) {
            Inertia.post(route('absenceStore', user.id ),{
                'dateStart': dateStart,
                'dateEnd': dateEnd,
                'raison': reason
            });
        } else {
            
            alert("Veuillez remplir tous les champs.");
            
        }
    };

    return (
        <div className='background-spectre z-10 relative flex flex-col gap-[5vh] h-[100vh]'>
            <Head title="Absences" />
            <UserHeader auth={auth} />
            <NotificationPopup />

            <main className='w-full h-full'>
                <div className='h-full w-full pt-[5vh] flex flex-col items-center gap-[5vh]'>
                    <h3 className='text-white font-bold text-[4vh]'>Absences</h3>
                    <div className='w-[80%] h-[60%] flex justify-around gap-[3vw]'>
                        <div className='background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[20px] px-[2vw] py-[3vh] flex flex-col w-[80%]'>
                            <form onSubmit={handleSubmit} className='w-full h-full flex gap-[2vh]'>
                                <div className='w-[50%] h-full flex flex-col justify-center gap-[10vh]'>
                                    <div className='w-full flex items-center justify-around'>
                                        <p className='text-white'>Du...</p>
                                        <DateInput
                                            type="date"
                                            aria-label='dateStart'
                                            labelPlacement="outside-left"
                                            onChange={handleDateStart}
                                            classNames={{
                                                base: "w-[30%] min-w-min",
                                                inputWrapper: "background-blue",
                                                input: "!text-white text-center text-[2vh]",
                                            }}
                                        />
                                        <p className='text-white'>au...</p>
                                        <DateInput
                                            type="date"
                                            aria-label='dateEnd'
                                            labelPlacement="outside-left"
                                            onChange={handleDateEnd}
                                            disabled={isEndDateDisabled}
                                            classNames={{
                                                base: "w-[30%] min-w-min",
                                                inputWrapper: "background-blue",
                                                input: "!text-white text-center text-[2vh]",
                                            }}
                                        />
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <button className={`ms-4 bg-[#71FFFF] text-[#292929] font-bold rounded-[20px] w-[10vw] h-[5vh] text-[3vh] ${submitDisabled ? "opacity-50" : ""} `} disabled={submitDisabled}>
                                            {submitDisabled ? 'Disabled' : 'Création'}
                                        </button>
                                    </div>
                                </div>
                                <div className='w-[50%] h-full'>
                                    <p className='text-white'>Pour</p>
                                    <Textarea
                                        variant="flat"
                                        aria-label='reason'
                                        placeholder="Raison de l'absence"
                                        onChange={(e) => setReason(e.target.value)}
                                        disableAnimation
                                        disableAutosize
                                        classNames={{
                                            base: "justify-end h-[80%]",
                                            inputWrapper: "!border-none background-blue !h-full ",
                                            input: "font-tiny !text-white border-none text-[2vh] h-full",
                                        }}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className='background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[20px] px-[2vw] py-[3vh] flex flex-col w-[20%] gap-[1vh] justify-around'>
                            <p className='text-white'>Absence du... </p>
                            {dateStart ? <p className='text-[#5E7F8C] font-bold'>{new Date(dateStart).toLocaleDateString()}</p> : null}
                            <p className='text-white'>au...</p>
                            {dateEnd ? <p className='text-[#5E7F8C] font-bold'>{new Date(dateEnd).toLocaleDateString()}</p> : null}
                            <p className='text-white'>pour...</p>
                            {reason ? <p className='text-[#5E7F8C] font-bold'>{reason}</p> : null}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
