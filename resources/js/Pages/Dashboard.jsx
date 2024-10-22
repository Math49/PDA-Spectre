import ConfigMenu from '@/Layouts/ConfigMenu';
import { Head } from '@inertiajs/react';
import React from 'react';
import ConfigHeader from '@/Layouts/ConfigHeader';
import ConfigContent from '@/Layouts/ConfigContent';
import LogoSCP from '@/Components/LogoSCP';
import dayjs from 'dayjs';

export default function Dashboard({ auth, header }) {

    let abstab = [];

    console.log(header);

    let absenceslist = header.absences.slice(-5);
    absenceslist.map((absence) => {
        let user = header.spectre.find(spectre => parseInt(spectre.user_id) === parseInt(absence.user_id));
        abstab.push({
            id: absence.id,
            date: `${dayjs(absence.date_debut).format('DD/MM/YYYY')} au ${dayjs(absence.date_fin).format('DD/MM/YYYY')}`,
            agent: user ? user.matricule : 'Unknown',
        });
    });

    let userstab = [];

    let userslist = header.users.slice(-5);

    userslist.map((users) => {
        let user = header.spectre.find(spectre => parseInt(spectre.user_id) === parseInt(users.id));
        userstab.push({
            id: users.id,
            date: dayjs(users.created_at).format('DD/MM/YYYY'),
            agent: user ? user.matricule : 'Unknown',
        });
    });

    let bddtab = [];

    let bddlist = header.BDD.slice(-15);

    bddlist.map((bdd) => {
        bddtab.push({
            id: bdd.id,
            date: dayjs(bdd.created_at).format('DD/MM/YYYY'),
            type: `${bdd.GI == 0 ? 'Fondation' : 'G.I.'}`,
            nom: `${bdd.nom} ${bdd.prenom}`,
        });
    });

    return (
        <div className='h-[100vh] w-[100vw] overflow-hidden flex relative z-20'>
            <Head title="Configuration" />
            <ConfigMenu auth={auth} />
            <LogoSCP className="w-[22vw] opacity-20 absolute top-[35%] right-[10%] z-0" />
            
            <div className='py-[3vh] px-[2vw] w-full h-[100%]'>
                <ConfigHeader data={header} title={"Dashboard"}/>
                <div className='bg-[rgba(255,255,255,0.5)] w-[100%] h-[2px]'></div>
                <ConfigContent>
                    <div className='w-full h-full flex justify-start'>
                        <div className='flex py-[2vh] px-[2vw] h-full gap-[5vh] w-[80%] overflow-hidden'>
                            <div className="flex flex-col gap-[5vh] w-[50%] h-full justify-center">
                                <div className="background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[20px] px-[2vw] py-[3vh] flex flex-col items-center justify-center gap-[2vh] w-full">
                                    <h3 className="text-white font-bold text-[2vh]">Dernières absences</h3>
                                    <div className='w-[90%] overflow-y-hidden'>
                                        <div className='flex justify-around border-white border-b-1 mb-[2vh] text-[2vh]'>
                                            <p className='text-white font-bold w-[25%] text-center'>ID</p>
                                            <p className='uppercase text-white font-bold w-[50%] text-center'>Date</p>
                                            <p className='uppercase text-white font-bold w-[25%] text-center'>Agent</p>
                                        </div>
                                        <div className='flex flex-col gap-3 overflow-y-scroll w-full h-[10vh]'>
                                            {abstab.map((absence, index) => (
                                                <div key={index} className='flex justify-around text-warp h-[10vh] text-[1.8vh] w-full'>
                                                    <p className='text-white opacity-50 w-[25%] text-center'>{absence.id}</p>
                                                    <p className='text-white opacity-50 w-[50%] text-center'>{absence.date}</p>
                                                    <p className='text-white opacity-50 w-[25%] h-auto text-center'>{absence.agent}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[20px] px-[2vw] py-[3vh] flex flex-col items-center justify-center gap-[2vh] w-full">
                                    <h3 className="text-white font-bold text-[2vh]">Derniers Comptes créés</h3>
                                    <div className='w-[90%] overflow-y-hidden'>
                                        <div className='flex justify-around border-white border-b-1 mb-[2vh] text-[2vh]'>
                                            <p className='text-white font-bold w-[33%] text-center'>ID</p>
                                            <p className='uppercase text-white font-bold w-[33%] text-center'>Date</p>
                                            <p className='uppercase text-white font-bold w-[33%] text-center'>Agent</p>
                                        </div>
                                        <div className='flex flex-col gap-3 overflow-y-scroll w-full h-[10vh]'>
                                            {userstab.map((users, index) => (
                                            <div key={index} className='flex justify-around text-warp h-[10vh] text-[1.8vh] w-full'>
                                                <p className='text-white opacity-50 w-[33%] text-center'>{users.id}</p>
                                                <p className='text-white opacity-50 w-[33%] text-center'>{users.date}</p>
                                                <p className='text-white opacity-50 w-[33%] h-auto text-center'>{users.agent}</p>
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-[3vh] w-[50%] h-full justify-center'>
                                <div className="background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[20px] px-[2vw] py-[3vh] flex flex-col items-center justify-start gap-[2vh] w-full h-[80%]">
                                    <h3 className="text-white font-bold text-[2vh]">Dernières Fiche Personnel créées</h3>
                                    <div className='w-[90%] overflow-y-hidden'>
                                        <div className='flex justify-around border-white border-b-1 mb-[2vh] text-[2vh]'>
                                            <p className='text-white font-bold w-[10%] text-center'>ID</p>
                                            <p className='uppercase text-white font-bold w-[30%] text-center'>Date</p>
                                            <p className='uppercase text-white font-bold w-[30%] text-center'>Type</p>
                                            <p className='uppercase text-white font-bold w-[30%] text-center'>Nom</p>
                                        </div>
                                        <div className='flex flex-col gap-3 overflow-y-scroll w-full h-full'>
                                            {bddtab.map((bdd, index) => (
                                            <div key={index} className='flex justify-around text-warp h-[10vh] text-[1.8vh] w-full'>
                                                <p className='text-white opacity-50 w-[10%] text-center'>{bdd.id}</p>
                                                <p className='text-white opacity-50 w-[30%] text-center'>{bdd.date}</p>
                                                <p className='text-white opacity-50 w-[30%] text-center'>{bdd.type}</p>
                                                <p className='text-white opacity-50 w-[30%] h-auto text-center'>{bdd.nom}</p>
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ConfigContent>
            </div>

        </div>
    );
}
