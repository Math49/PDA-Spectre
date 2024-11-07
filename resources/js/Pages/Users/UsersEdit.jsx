import ConfigMenu from '@/Layouts/ConfigMenu';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import ConfigHeader from '@/Layouts/ConfigHeader';
import ConfigContent from '@/Layouts/ConfigContent';
import { Input, Select, SelectItem, DateInput, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, cn } from '@nextui-org/react';
import { Inertia } from '@inertiajs/inertia';
import { hasPermission } from '@/utils/hasPermission';
import {now} from "@internationalized/date";
import dayjs from 'dayjs';
import NotificationPopup from '@/Components/NotificationPopup';
import NonAffiliee from '@/Components/NonAffiliee';


export default function UsersEdit({ user, auth, data, medals, userMedals, antecedents, header, photo }) {
    const [formData, setFormData] = useState({
        matricule: data.matricule || '',
        grade: user.roles[0]?.name || '',
        specialisation: user.roles[1]?.name || '',
    });

    const [medalStatuses, setMedalStatuses] = useState(
        userMedals.reduce((acc, um) => {
            acc[um.medal_id] = um.is_active;
            return acc;
        }, {})
    );

    const [tooltip, setTooltip] = useState({ visible: false, name: '', x: 0, y: 0 });

    const medalsList = [];
    let grades = ['King','Knight','Mage','Elite','Echo','Nova','Whisper'];
    const specialisations = ['Executor','Guardian','Ghost','Spirits','Sector','N/A'];



    if (auth.user.roles[0] == 'Leader' || auth.user.roles[0] == 'Hockwood') {
        grades = ['Leader','King','Knight','Mage','Elite','Echo','Nova','Whisper','Etat Major'];
    }

    medals.map((medal) => {
        if(medal.role == user.roles[1].id || medal.role == 0) {
            medalsList.push(medal);
        }
    });

    const handleChange = (field, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
        }));
    };

    const handleLifeEdit = () => {

        let newVie = data.vie;
        
        if(data.vie === 0) {
            newVie = 3;
        } else {
            newVie = data.vie - 1;
        }

        Inertia.post(route('updateUserLife', user.id),{
            vie: newVie,
        });
    };

    useEffect(() => {
        if (formData.grade !== user.roles[0]?.name || formData.specialisation !== user.roles[1]?.name || formData.matricule !== data.matricule) {
            Inertia.put(route('updateUser', user.id), {
                'data': formData,
            });
        }
    }, [formData]);

    const handleMedalToggle = (medalId) => {
        const updatedStatuses = { ...medalStatuses, [medalId]: !medalStatuses[medalId] };
        setMedalStatuses(updatedStatuses);
        Inertia.post(route('updateUserMedal', { id: user.id, medal_id: medalId }), {
            is_active: updatedStatuses[medalId]
        });
    };

    const handleMouseOver = (event, medalName) => {
        setTooltip({ visible: true, name: medalName, x: event.clientX, y: event.clientY });
    };

    const handleMouseMove = (event) => {
        if (tooltip.visible) {
            setTooltip((prev) => ({ ...prev, x: event.clientX, y: event.clientY }));
        }
    };

    const handleMouseOut = () => {
        setTooltip({ visible: false, name: '', x: 0, y: 0 });
    };


    const submitAntecedents = (e) => {
        e.preventDefault();

        Inertia.post(route('addUserAntecedents', user.id), {
            description: e.target[0].value,
        });

    };

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [AntToDelete, setAntToDelete] = useState(null);
    
    const handleDelete = () => {
        if (AntToDelete) {
            Inertia.delete(route('deleteUserAntecedents', [user.id, AntToDelete]));
            onOpenChange();
        }
    };


    return (
        <div className="h-[100vh] overflow-hidden flex relative z-20" onMouseMove={handleMouseMove}>
            <Head title="Configuration" />
            <ConfigMenu auth={auth} />
            <NonAffiliee />
            <NotificationPopup />
            <div className="py-[3vh] px-[2vw] w-full h-[100%]">
                <ConfigHeader data={header} title={"Gestion des agents"}/>
                <div className="bg-[rgba(255,255,255,0.5)] w-[100%] h-[2px]"></div>
                <ConfigContent>
                    <div className="py-[2vh] px-[1vw] h-[100%] overflow-y-auto">
                        <div className="flex items-center gap-[1vw] h-[100%] w-full">
                            <div className="flex flex-col items-stretch h-full justify-around w-[20%]">
                                <div className="w-max">
                                    <a
                                        href={route("usersList")}
                                        className="flex text-white gap-[0.5vw] items-center hover:underline text-[2vh]"
                                    >
                                        <i className="fa-solid fa-arrow-left"></i>
                                        <p className="font-normal">Retour à la Liste</p>
                                    </a>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <p className="text-white font-light text-[2.5vh]">ID: {data.STEAM_ID}</p>
                                    <div className="relative background-mountain w-[35vh] h-[35vh] overflow-hidden">
                                        <img src={photo} alt="" className="w-full pt-[5vh] px-[1vw] object-cover rounded-[20px]"/>
                                        <div className="absolute top-0 background-filter w-full h-full"></div>
                                    </div>
                                </div>
                            </div>
                            <div className='h-full flex justify-around w-[80%] gap-[1vw]'>
                                <form className='w-[35%] flex flex-col justify-between'>
                                    <div className='flex flex-col justify-around items-center h-full w-full gap-[2vh]'>
                                        <div className="background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[20px] px-[2vw] py-[3vh] flex flex-col items-center justify-center gap-[2vh] w-[20vw] h-[60%]">
                                            <Input
                                                type="number"
                                                variant="underlined"
                                                label="Matricule :"
                                                labelPlacement="outside-left"
                                                {...hasPermission(auth,'editUser') ? {} : { disabled: true }}
                                                value={formData.matricule}
                                                classNames={{
                                                    base: "justify-between h-[5vh]",
                                                    mainWrapper: "w-[60%]",
                                                    label: "text-white font-bold group-data-[focus=true]:text-white group-data-[focus=true]:opacity-50 group-data-[filled=true]:text-white group-data-[filled=true]:opacity-100 text-[1.8vh]",
                                                    input: "!text-white group-data-[focus=true]:text-white group-data-[filled=true]:text-white text-right text-[1.8vh]",
                                                }}
                                                onChange={(e) => handleChange('matricule', e.target.value)}
                                            />
                                            <Select
                                                variant="underlined"
                                                label="Grade :"
                                                labelPlacement="outside-left"
                                                fullWidth={true}
                                                value={grades.includes(formData.grade) ? formData.grade : grades[0]} // Assure que la valeur est valide
                                                defaultSelectedKeys={[formData.grade]}
                                                disallowEmptySelection={true}
                                                classNames={{
                                                    base: "justify-between h-[5vh]",
                                                    label: "text-white font-bold group-data-[focus=true]:text-white group-data-[focus=true]:opacity-50 group-data-[filled=true]:text-white group-data-[filled=true]:opacity-100 text-[1.8vh]",
                                                    value: "!text-white group-data-[focus=true]:text-white group-data-[filled=true]:text-white text-right text-[1.8vh]",
                                                    mainWrapper: "w-[70%]",
                                                    trigger: "text-[#71FFFF]",
                                                }}
                                                onChange={(e) => handleChange('grade', e.target.value)}
                                            >
                                                {grades.map((grade) => (
                                                    <SelectItem key={grade} value={grade}>
                                                        {grade}
                                                    </SelectItem>
                                                ))}
                                            </Select>

                                            <Select
                                                variant="underlined"
                                                label="Spécialité :"
                                                labelPlacement="outside-left"
                                                fullWidth={true}
                                                value={specialisations.includes(formData.specialisation) ? formData.specialisation : specialisations[0]} // Assure que la valeur est valide
                                                defaultSelectedKeys={[formData.specialisation]}
                                                disallowEmptySelection={true}
                                                classNames={{
                                                    base: "justify-between h-[5vh]",
                                                    label: "text-white font-bold group-data-[focus=true]:text-white group-data-[focus=true]:opacity-50 group-data-[filled=true]:text-white group-data-[filled=true]:opacity-100 text-[1.8vh]",
                                                    value: "!text-white group-data-[focus=true]:text-white group-data-[filled=true]:text-white text-right text-[1.8vh]",
                                                    mainWrapper: "w-[60%]",
                                                    trigger: "text-[#71FFFF]",
                                                }}
                                                onChange={(e) => handleChange('specialisation', e.target.value)}
                                            >
                                                {specialisations.map((specialisation) => (
                                                    <SelectItem key={specialisation} value={specialisation}>
                                                        {specialisation}
                                                    </SelectItem>
                                                ))}
                                            </Select>

                                            <Input
                                                type="number"
                                                variant="underlined"
                                                label="Loyauté :"
                                                labelPlacement="outside-left"
                                                disabled={true}
                                                value={data.loyauté}
                                                classNames={{
                                                    base: "justify-between h-[5vh]",
                                                    mainWrapper: "w-[65%]",
                                                    label: "text-white font-bold group-data-[focus=true]:text-white group-data-[focus=true]:opacity-50 group-data-[filled=true]:text-white group-data-[filled=true]:opacity-100 text-[1.8vh]",
                                                    input: "!text-white group-data-[focus=true]:text-white group-data-[filled=true]:text-white text-right text-[1.8vh]",
                                                }}
                                                
                                            />
                                        </div>
                                        <div className="background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[20px] px-[2vw] py-[2vh] flex flex-col items-center justify-center gap-[2vh] w-[20vw] h-[40%]">
                                            <h3 className="text-white font-bold text-[2.5vh]">Médailles</h3>
                                            <div className="flex flex-wrap gap-[2vh] justify-center">
                                                {medalsList.map((medal) => (
                                                    <div key={medal.id} className="flex flex-col items-center">
                                                        <div
                                                            className={`medal-image ${medalStatuses[medal.id] ? 'active' : 'inactive'}`}
                                                            {...(hasPermission(auth, 'editMedailles') ? { onClick: () => handleMedalToggle(medal.id) } : {})}
                                                            
                                                            onMouseOver={(e) => handleMouseOver(e, medal.name)}
                                                            onMouseOut={handleMouseOut}
                                                        >
                                                            <img
                                                                src={medal.image}
                                                                alt={medal.name}
                                                                className={`transition duration-300 ${medalStatuses[medal.id] ? '' : 'grayscale'}`}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className='w-[65%] flex flex-col gap-[2vh] justify-between'>
                                    <div className="background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[20px] px-[2vw] py-[2vh] flex flex-col items-center gap-[1vh] justify-around relative w-full h-[60%]">
                                        <h3 className="text-white font-bold text-[2.5vh]">Antécédents</h3>
                                        <div className='flex flex-col gap-[1.5vh] w-full items-center'>
                                            <form onSubmit={submitAntecedents} className='flex gap-[1vw] items-center w-[80%]'>
                                                <Textarea
                                                    variant="bordered"
                                                    placeholder='Description'
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
                                            <div className='w-full'>
                                                <div className='flex justify-around border-white border-b-1 mb-[2vh]'>
                                                    <p className='text-white font-bold w-[20%] text-center'>ID</p>
                                                    <p className='uppercase text-white font-bold w-[20%] text-center'>Date</p>
                                                    <p className='uppercase text-white font-bold w-[60%] text-center'>Détails</p>
                                                </div>
                                                <div className='flex flex-col gap-3 overflow-y-scroll h-[15vh]'>
                                                    {antecedents.map((antecedent) => (
                                                        <div key={antecedent.id} className='relative flex text-warp h-[20vh]'>
                                                            {hasPermission(auth, 'editAntecedentsUser') ? (
                                                            <Button onPress={() => { setAntToDelete(antecedent.id); onOpenChange(); }} className='text-red-600 text-[2vh] cursor-pointer p-0 min-w-0 h-auto bg-transparent rounded-none align-middle hover:!opacity-100 absolute top-1 z-20'><i class="fa-solid fa-trash"></i></Button>
                                                            ) : null}
                                                            <p className='text-white opacity-50 w-[20%] text-center'>{antecedent.id}</p>
                                                            <p className='text-white opacity-50 w-[20%] text-center'>{dayjs(antecedent.created_at).format('DD/MM/YYYY')}</p>
                                                            <p className='text-white opacity-50 w-[60%] h-auto text-center'>{antecedent.description}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex gap-[20px] w-full h-[40%]'>
                                        <div className="background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[20px] px-[2vw] py-[2vh] flex flex-col items-center justify-center gap-[1vh] relative w-full">
                                            <h3 className='text-white font-bold text-[2.5vh]'>Vies</h3>
                                            <div 
                                                className='flex justify-around gap-[1vw] cursor-pointer'
                                                {...(hasPermission(auth, 'editLife') ? { onClick: () => handleLifeEdit() } : {})}
                                            >
                                                <div className={`text-[7vh] ${data.vie >= 3 ? 'vieActive' : 'vieInactive'}`} >
                                                    <i class="fa-solid fa-microchip"></i>
                                                </div>
                                                <div className={`text-[7vh] ${data.vie >= 2 ? 'vieActive' : 'vieInactive'}`}>
                                                    <i class="fa-solid fa-microchip"></i> 
                                                </div>
                                                <div className={`text-[7vh] ${data.vie >= 1 ? 'vieActive' : 'vieInactive'}`}>
                                                    <i class="fa-solid fa-microchip"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[20px] px-[2vw] py-[2vh] flex flex-col items-center justify-center gap-[2vh] relative w-full">
                                            <h3 className='text-white font-bold text-[2.5vh]'>Dernière modification</h3>
                                            <p className="text-white font-normal text-[2.5vh] opacity-50">{dayjs(data.updated_at).format('DD/MM/YYYY')}</p>
                                        </div>
                                    </div>
                                </div>

                                {tooltip.visible && (
                                    <div
                                        className="absolute background-tooltip text-white p-2 rounded-md pointer-events-none"
                                        style={{ top: tooltip.y + 10, left: tooltip.x + 10, zIndex: 1000}}
                                    >
                                        <p>{tooltip.name}</p>
                                        
                                    </div>
                                )}
                            </div>
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
                            <ModalHeader className="flex flex-col gap-1">Suppression de l'antécédent</ModalHeader>
                            <ModalBody>
                                <p>Êtes-vous sûr de vouloir supprimer <span className='text-[#71FFFF] font-bold'>l'antécédent</span> ?</p>
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
    );
}
