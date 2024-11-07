import ConfigMenu from '@/Layouts/ConfigMenu';
import { Head } from '@inertiajs/react';
import React, {useState} from 'react';
import ConfigHeader from '@/Layouts/ConfigHeader';
import ConfigContent from '@/Layouts/ConfigContent';
import dayjs from 'dayjs';
import { now } from '@internationalized/date';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { Inertia } from '@inertiajs/inertia';
import NotificationPopup from '@/Components/NotificationPopup';
import NonAffiliee from '@/Components/NonAffiliee';



export default function AbsenceAdmin({ auth, absences, users, SpectreData, header, photos }) {

    
    let absenceData = [];
    let today = dayjs(now()).format('YYYY-MM-DD');
    let Userphoto = null;

    absences.map((absence) => {
        users.map((user) => {
            if (user.id !== 1) {
                SpectreData.map((spectre) => {
                    if (user.id === parseInt(absence.user_id) && user.id === parseInt(spectre.user_id)) {
                        

                        photos.map((photo) => {
                            user.roles.map((role) => {
                                if (role.name == photo.role_accept){
                                    Userphoto = photo.lien;
                                }
                            });
                        });
            
                        if (Userphoto == null) {
                            Userphoto = photos[0].lien;
                        }

                        absenceData.push({
                            ...user,
                            'abs_id': absence.id,
                            ...absence,
                            ...spectre,
                            'Userphoto': Userphoto
                        });
                    }
                });
            }
        });
    });
    
    absenceData = absenceData.reverse();

    console.log(absenceData);

    const [selectedUser, setSelectedUser] = useState(null);
    const [antecedents, setAntecedents] = useState(null);
    const [eventcalendar, setEventCalendar] = useState(null);

    const handleUserSelection = (absence) => {
        setSelectedUser(absence);

        console.log(selectedUser);
    
        const filteredAntecedents = absences.filter((antecedent) => parseInt(antecedent.user_id) === parseInt(absence.user_id)).reverse();
        
        setAntecedents(filteredAntecedents);
        
        const events = filteredAntecedents.map((antecedent) => ({
            title: antecedent.raison,
            start: antecedent.date_debut,
            end: dayjs(antecedent.date_fin).add(1, 'day').format('YYYY-MM-DD'),
            allDay: true
        }));
    
        setEventCalendar(events);
    };
    

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [isAbsOpen, setIsAbsOpen] = useState(false);

    const handleAbsModalOpen = () => setIsAbsOpen(true);
    const handleAbsModalClose = () => setIsAbsOpen(false);


    const [absToDelete, setAbsToDelete] = useState(null);

    const handleDelete = () => {
        if (absToDelete) {
            Inertia.delete(route('deleteAbsence', absToDelete.abs_id));
            handleAbsModalClose();
            setSelectedUser(null);
        }
    }


    return (
        <div className='h-[100vh] w-[100vw] overflow-hidden flex relative z-20'>
            <Head title="Configuration" />
            <ConfigMenu auth={auth} />
            <NotificationPopup />
            <NonAffiliee />
            <div className='py-[3vh] px-[2vw] w-full h-[100%]'>
                <ConfigHeader data={header} title={"Absences"}/>
                <div className='bg-[rgba(255,255,255,0.5)] w-[100%] h-[2px]'></div>
                <ConfigContent>
                    <div className='h-full w-full flex'>
                        <div className='min-w-max border-r-1 border-opacity-80 overflow-y-auto'>
                            {absenceData.map((absence, index) => (
                                <div className={`background-abs py-[1vh] px-[1vw] flex flex-col items-center justify-center cursor-pointer ${selectedUser && selectedUser.id === absence.id && selectedUser.date_debut === absence.date_debut ? 'background-abs-active' : ''} ${dayjs(absence.date_fin).isBefore(dayjs()) ? 'text-gray-500' : ''}`}
                                onClick={() => handleUserSelection(absence)}
                                key={`${absence.id}-${index}`}
                            >
                                <p className={`font-bold text-[2vh] ${dayjs(absence.date_fin).isBefore(dayjs()) ? 'opacity-50' : 'text-white'}`}>
                                    {absence.roles[0].name}-{absence.matricule} {absence.roles[1].name}
                                </p>
                                <p className={`font-tiny text-[2vh] ${dayjs(absence.date_fin).isBefore(dayjs()) ? 'opacity-50' : 'opacity-80 text-white'}`}>
                                    {dayjs(absence.date_debut).format('DD/MM/YYYY')} - {dayjs(absence.date_fin).format('DD/MM/YYYY')}
                                </p>
                            </div>
                            
                            
                            ))}
                        </div>
                        <div className='w-full py-[5vh] px-[2vw] flex items-center justify-around'>
                            {selectedUser ? (
                                <>
                                    <div className='flex flex-col items-center'>
                                    <p className="text-white font-light text-[2.5vh]">ID: {selectedUser.STEAM_ID}</p>
                                    <div className="relative background-mountain w-[35vh] h-[35vh] overflow-hidden">
                                        <img src={selectedUser.Userphoto} alt="" className="w-full pt-[5vh] px-[1vw] object-cover rounded-[20px]"/>
                                        <div className="absolute top-0 background-filter w-full h-full"></div>
                                    </div>
                                </div>
                                    <div className='flex flex-col gap-[2vh] w-[25%]'>
                                        <div className='background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[20px] px-[2vw] py-[3vh] flex flex-col items-center justify-center gap-[2vh] w-full'>
                                            <div className='flex justify-between w-full border-b-1 border-[#71FFFF] border-opacity-40'>
                                                <p className='text-white font-bold text-[2vh]'>Matricule</p>
                                                <p className='text-white font-light text-[2vh]'>{selectedUser.matricule}</p>
                                            </div>
                                            <div className='flex justify-between w-full border-b-1 border-[#71FFFF] border-opacity-40'>
                                                <p className='text-white font-bold text-[2vh]'>Grade</p>
                                                <p className='text-white font-light text-[2vh]'>{selectedUser.roles[0].name}</p>
                                            </div>
                                            <div className='flex justify-between w-full border-b-1 border-[#71FFFF] border-opacity-40'>
                                                <p className='text-white font-bold text-[2vh]'>Spécialité</p>
                                                <p className='text-white font-light text-[2vh]'>{selectedUser.roles[1].name}</p>
                                            </div>
                                            <div className='flex justify-between w-full border-b-1 border-[#71FFFF] border-opacity-40'>
                                                <p className='text-white font-bold text-[2vh]'>Loyauté</p>
                                                <p className='text-white font-light text-[2vh]'>{selectedUser.loyauté}</p>
                                            </div>
                                        </div>
                                        <div className='background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[20px] px-[2vw] py-[3vh] flex flex-col items-center justify-center gap-[2vh]'>
                                            <h3 className="text-white font-bold text-[2.5vh]">Absence en cours</h3>
                                            <div className=''>
                                                {!dayjs(selectedUser.date_fin).isBefore(dayjs()) ? (
                                                    <>
                                                        <div className='flex w-full gap-[0.5vw] justify-center'>
                                                            <p className='text-white font-bold text-[2vh]'>Début :</p>
                                                            <p className='text-white font-light text-[2vh]'>{dayjs(selectedUser.date_debut).format('DD/MM/YYYY')}</p>
                                                        </div>
                                                        <div className='flex w-full gap-[0.5vw] justify-center'>
                                                            <p className='text-white font-bold text-[2vh]'>Fin :</p>
                                                            <p className='text-white font-light text-[2vh]'>{dayjs(selectedUser.date_fin).format('DD/MM/YYYY')}</p>
                                                            
                                                        </div>
                                                        <div className='flex w-full gap-[0.5vw] justify-center'>
                                                            <p className='text-white font-bold text-[2vh]'>Raison :</p>
                                                            <p className='text-white font-light text-[2vh]'>{selectedUser.raison}</p>
                                                        </div>
                                                    </>
                                                ):(
                                                    <p className='text-white font-bold text-[2vh]'>Aucune absence en cours</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-[40%] h-full flex flex-col gap-[2vh] relative'>
                                        <div className='background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[20px] px-[2vw] py-[3vh] flex flex-col items-center justify-center gap-[2vh] w-full h-[70%]'>
                                            <h3 className="text-white font-bold text-[2.5vh]">Précédentes absences</h3>
                                            <div className='flex justify-around border-white border-b-1 w-full'>
                                                <p className='text-white font-bold w-[25%] text-center'>Début</p>
                                                <p className='text-white font-bold w-[25%] text-center'>Fin</p>
                                                <p className='text-white font-bold w-[50%] text-center'>Raison</p>
                                            </div>
                                            <div className='flex flex-col gap-3 overflow-y-scroll w-full'>
                                                {antecedents.map((antecedent) => (
                                                    <div key={antecedent.id} className='flex text-warp'>
                                                        <p className='text-white opacity-50 w-[25%] text-center text-[2vh]'>{dayjs(antecedent.date_debut).format('DD/MM/YYYY')}</p>
                                                        <p className='text-white opacity-50 w-[25%] text-center text-[2vh]'>{dayjs(antecedent.date_fin).format('DD/MM/YYYY')}</p>
                                                        <p className='text-white opacity-50 w-[50%] h-auto text-center text-[2vh]'>{antecedent.raison}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='flex flex-col items-center justify-center gap-[2vh] w-full h-[30%]'>
                                        <Button onPress={onOpen} className='ms-4 bg-gradient-to-br from-[#5E7F8C] to-[#314E59] text-white font-bold rounded-[50px] w-[15vw] h-[7vh] text-[3vh]'>Calendrier</Button>
                                        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='lg'>
                                            <ModalContent className='background-calendar shadow-[0_4px_4px_0_#5E7F8C] rounded-[20px] px-[2vw] py-[3vh] flex flex-col items-center justify-center gap-[2vh] w-full'>
                                            {(onClose) => (
                                                <>
                                                <ModalHeader className="flex flex-col gap-1 text-white">Calendrier d'Absences</ModalHeader>
                                                <ModalBody className='w-full'>
                                                    <FullCalendar
                                                        
                                                        plugins={[dayGridPlugin]}
                                                        initialView="dayGridMonth"
                                                        events={eventcalendar}
                                                    />
                                                </ModalBody>
                                                </>
                                            )}
                                            </ModalContent>
                                        </Modal>
                                        </div>
                                        <Button onPress={() => { setAbsToDelete(selectedUser); handleAbsModalOpen() }} className='text-red-600 text-[4vh] cursor-pointer p-0 min-w-0 h-auto bg-transparent rounded-none align-middle hover:!opacity-100 absolute right-0 bottom-0 z-20'><i class="fa-solid fa-trash"></i></Button>
                                    </div>
                                </>
                            ) : (
                                <div className='flex flex-col items-center justify-center gap-[2vh]'>
                                    <p className='text-white font-bold text-[3vh]'>Sélectionner une absence</p>
                                </div>
                            )}
                        </div>
                    </div>
                </ConfigContent>
            </div>
            <Modal
                isOpen={isAbsOpen}
                onOpenChange={handleAbsModalClose}
                classNames={{
                    base: 'bg-[#00010F]',
                    body: 'text-white',
                    header: 'text-white',
                }}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Suppression de l'absence</ModalHeader>
                            <ModalBody>
                                <p>Êtes-vous sûr de vouloir supprimer <span className='text-[#71FFFF] font-bold'>l'absence</span> ?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={handleAbsModalClose}>
                                    Non
                                </Button>
                                <Button color="primary" onPress={handleDelete}>
                                    Oui
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
