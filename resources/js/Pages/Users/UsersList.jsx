import ConfigMenu from '@/Layouts/ConfigMenu';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import ConfigHeader from '@/Layouts/ConfigHeader';
import ConfigContent from '@/Layouts/ConfigContent';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { Inertia } from '@inertiajs/inertia';
import NotificationPopup from '@/Components/NotificationPopup';
import { hasPermission } from '@/utils/hasPermission';

export default function UsersList({ users, auth, SpectreData, header, photos }) {

    let userData = [];
    let Userphoto = null;

    users.map((user) => {
        if (user.id !== 1) {
            SpectreData.map((spectre) => {
                if (user.id === parseInt(spectre.user_id)) {
                    
                    
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

                    userData.push({
                        ...user,
                        ...spectre,
                        'Userphoto': Userphoto
                    });

                }
            });
        }
    });

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [userToDelete, setUserToDelete] = useState(null);

    const handleDelete = () => {
        if (userToDelete) {
            Inertia.delete(route('deleteUser', userToDelete.user_id));
            onOpenChange();
        }
    };

    return(
        <div className='h-[100vh] overflow-hidden flex relative z-20'>
            <Head title="Configuration" />
            <ConfigMenu auth={auth} />
            <NotificationPopup />
            <div className='py-[3vh] px-[2vw] w-full h-[100%]'>
                <ConfigHeader data={header} title={"Gestion des agents"}/>
                <div className='bg-[rgba(255,255,255,0.5)] w-[100%] h-[2px]'></div>
                <ConfigContent>
                    <div className='flex flex-col py-[2vh] px-[1vw] h-full gap-[2vh]'>
                        {hasPermission(auth, 'createUser') ? (
                        <div className='h-min'>
                            <a href={route("userscreate")} className='text-white font-semibold text-[4vh] flex gap-[1vw] items-center shadow-[0_4px_4px_0_#5E7F8C] w-min px-[1.5vw] py-[1vh] rounded-[50px] bg-[rgba(49,78,89,0.3)]'>
                                <p>Add</p> 
                                <i class="fa-solid fa-user-plus"></i>
                            </a>
                        </div>
                        ) : null}
                        <div className='flex flex-wrap gap-[2vh] justify-center overflow-y-scroll h-full w-full'>
                            {userData.map((user) => (
                                <div className='bg-[#71FFFF] rounded-[50px] flex items-center justify-between p-[0.5vh] w-[24%] h-min min-w-min'>
                                    <div className='flex items-center gap-[0.2vw]'>
                                        <div>
                                            <div className="background-mountain w-[11vh] h-[11vh] rounded-[500px] overflow-hidden">
                                                <img src={user.Userphoto} className="w-full pt-[2vh] object-cover rounded-[20px]" alt=""/>
                                            </div>
                                        </div>
                                        <div>
                                            <p className='text-[#00010F] font-bold text-[3vh] uppercase'>{user.roles[0].name}-{user.matricule}</p>
                                            <p className='text-[#314E59] font-semibold text-[2.5vh] uppercase'>{user.roles[1].name}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-center gap-[0.8vw] mr-[1vw]'>
                                        <a href={route("editUser", user.user_id)} className=' text-[#00010F] text-[4vh]'><i class="fa-solid fa-user-pen"></i></a>
                                        {hasPermission(auth, 'deleteUser') ? (
                                        <Button onPress={() => { setUserToDelete(user); onOpenChange(); }} className='text-red-600 text-[4vh] cursor-pointer p-0 min-w-0 h-auto bg-transparent rounded-none hover:!opacity-100'><i class="fa-solid fa-user-minus"></i></Button>
                                        ) : null}
                                    </div>
                                </div>
                                
                            ))}
                        </div>
                    </div>
                </ConfigContent>
            </div>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    base: 'bg-[#00010F]',
                    body: 'text-white',
                    header: 'text-white',
                }}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Suppression de {userToDelete.roles[0].name}-{userToDelete.matricule}</ModalHeader>
                            <ModalBody>
                                <p>Êtes-vous sûr de vouloir supprimer <span className='text-[#71FFFF] font-bold'>{userToDelete.roles[0].name}-{userToDelete.matricule}</span> ?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onOpenChange}>
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
    )
}