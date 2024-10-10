import { useEffect } from 'react';
import React from "react";
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import {Input} from "@nextui-org/react";
import LogoSCP from "@/Components/LogoSCP";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <div className='relative z-10 flex flex-col items-center gap-[5vh] h-[100vh] w-[100vw] overflow-hidden'>
            <Head title="Connexion" />
            <LogoSCP className="h-[100vh] opacity-20 absolute top-10 z-0"/>
            <div className='flex justify-center'>
                <img className='h-[5vh]' src="/images/element/Compass.png"/>
            </div>

            <div className='background-black z-10 relative w-[30%] h-[85%]'>
                <div className='background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[35px] px-[15%] py-[10%] w-[100%] h-[100%] flex flex-col items-center justify-between gap-[8%]'>
                    <div className='flex flex-col items-center w-[100%] gap-[3vh] h-[40%] justify-around'>
                        <img src="/images/icon/spectre_phantom2.png" className='h-[20vh]'/>
                        <p className='text-white font-semibold text-[5vh]'>S.P.E.C.T.R.E</p>
                    </div>

                    <form onSubmit={submit} className="w-[100%] flex flex-col justify-between h-[60%]">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}"></input>
                        <div className='flex flex-col justify-around h-[70%]'>
                            <div>
                                <Input
                                    id="username"
                                    type="text"
                                    label="I.D."
                                    name="username"
                                    value={data.username}
                                    autoComplete="username"
                                    variant='bordered'
                                    classNames={{
                                        label:"text-white opacity-30 font-semibold text-[20px] group-data-[focus=true]:opacity-30 group-data-[focus=true]:text-white group-data-[focus=true]:scale-75",
                                        inputWrapper: "border-2 border-[#5E7F8C] group-data-[focus=true]:border-[#5E7F8C] rounded-[20px] h-[10vh]",
                                        input: " text-white opacity-80 text-[18px]"
                                    }}
                                    isFocused={true}
                                    onChange={(e) => setData('username', e.target.value)}
                                />

                                <InputError message={errors.username} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    label="Code d'activation"
                                    value={data.password}
                                    classNames={{
                                        label:"text-white opacity-30 font-semibold text-[20px] group-data-[focus=true]:opacity-30 group-data-[focus=true]:text-white group-data-[focus=true]:scale-75",
                                        inputWrapper: "border-2 border-[#5E7F8C] group-data-[focus=true]:border-[#5E7F8C] rounded-[20px] h-[10vh]",
                                        input: " text-white opacity-80 text-[18px]"
                                    }}
                                    autoComplete="current-password"
                                    variant='bordered'
                                    onChange={(e) => setData('password', e.target.value)}
                                />

                                <InputError message={errors.password} className="mt-2" />
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <button className="ms-4 bg-gradient-to-br from-[#5E7F8C] to-[#314E59] text-white font-bold rounded-[20px] text-[4vh] h-[8vh] w-[80%]" disabled={processing}>
                                CONNEXION
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
