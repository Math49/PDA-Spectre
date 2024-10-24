import ConfigMenu from "@/Layouts/ConfigMenu";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import ConfigHeader from "@/Layouts/ConfigHeader";
import ConfigContent from "@/Layouts/ConfigContent";
import { Inertia } from "@inertiajs/inertia";
import dayjs from "dayjs";
import { hasPermission } from "@/utils/hasPermission";
import { Input, Select, SelectItem, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure  } from "@nextui-org/react";
import NotificationPopup from "@/Components/NotificationPopup";
import { usePage } from "@inertiajs/react";


export default function BDDAdminView({ auth, data, antecedents, header }) {
    const [formData, setFormData] = useState({
        nom: data.nom || "",
        prenom: data.prenom || "",
        grade: data.grade || "",
        matricule: data.matricule || "",
        branche: data.branche || "",
        GI: data.GI || "",
        groupe: data.groupe || "",
        status: data.status || "",
    });
    
    const [isDirty, setIsDirty] = useState(false);
    const status = ["N/A", "Vivant", "Surveillance", "Recherché", "Capturé", "VIP", "HVT", "Mort"];

    
    const handleChange = (field, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
        }));
        setIsDirty(true);
    };

    useEffect(() => {
        if (isDirty) {
            const timeout = setTimeout(() => {
                Inertia.put(route('BDDAdminUpdate', data.id), { data: formData });
                setIsDirty(false);
            }, 1000);
            
            return () => clearTimeout(timeout);
        }
    }, [formData, isDirty]);

    const submitAntecedents = (e) => {
        e.preventDefault();

        Inertia.post(route("addBDDAdminAntecedents", data.id), {
            description: e.target[0].value,
        });
    };

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [AntToDelete, setAntToDelete] = useState(null);
    
    const handleAntDelete = () => {
        if (AntToDelete) {
            Inertia.delete(route('deleteBDDAdminAntecedents', [data.id, AntToDelete]));
            onOpenChange();
        }
    };

    const [isBDDOpen, setIsBDDOpen] = useState(false);

    const handleBDDModalOpen = () => setIsBDDOpen(true);
    const handleBDDModalClose = () => setIsBDDOpen(false);


    const [BDDToDelete, setBDDToDelete] = useState(null);

    const handleBDDDelete = () => {
        if (BDDToDelete) {
            Inertia.delete(route('deleteBDD', BDDToDelete.id));
            handleBDDModalClose();
        }
    }

    return (
        <div className="h-[100vh] w-[100vw] overflow-hidden flex relative z-20">
            <Head title="BDD View" />
            <NotificationPopup />
            <ConfigMenu auth={auth} />
            <div className="py-[3vh] px-[2vw] w-full h-[100%]">
                <ConfigHeader data={header} title={"BDD View"}/>
                <div className="bg-[rgba(255,255,255,0.5)] w-[100%] h-[2px]"></div>
                <ConfigContent>
                    <div className="py-[2vh] px-[1vw] h-[100%] overflow-y-auto">
                        <div className="flex items-center gap-[1vw] h-[100%] w-full">
                            <div className="flex flex-col items-stretch h-full justify-around w-[30%]">
                                <div className="w-max">
                                    <a
                                        href={route("BDDAdminList")}
                                        className="flex text-white gap-[0.5vw] items-center hover:underline text-[2vh]"
                                    >
                                        <i className="fa-solid fa-arrow-left"></i>
                                        <p className="font-normal">
                                            Retour à la Liste
                                        </p>
                                    </a>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-white font-light text-[2.5vh]">
                                        ID: {data.steam_id}
                                    </p>
                                    <div className="relative w-[40vh] h-[40vh]">
                                        <img
                                            src={`/storage/${data.lien_photo}`}
                                            className="background-filter w-full h-full"
                                        ></img>
                                        <div className="absolute inset-0 background-filter"></div>
                                    </div>
                                </div>
                            </div>
                            <div className='h-full flex justify-around w-[30%] gap-[1vw]'>
                                <form className='w-full flex flex-col justify-between'>
                                    <div className='flex flex-col justify-around items-center h-full w-full gap-[2vh]'>
                                        <div className="background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[20px] px-[2vw] py-[4vh] flex flex-col items-center justify-center gap-[2vh] w-[20vw]">
                                            <Input
                                                type="text"
                                                variant="underlined"
                                                label="Nom :"
                                                labelPlacement="outside-left"
                                                value={formData.nom}
                                                classNames={{
                                                    base: "justify-between h-[5vh]",
                                                    mainWrapper: "w-[60%]",
                                                    label: "text-white font-bold group-data-[focus=true]:text-white group-data-[focus=true]:opacity-50 group-data-[filled=true]:text-white group-data-[filled=true]:opacity-100 text-[1.8vh]",
                                                    input: "!text-white group-data-[focus=true]:text-white group-data-[filled=true]:text-white text-right text-[1.8vh]",
                                                }}
                                                onChange={(e) => handleChange('nom', e.target.value)}
                                            />
                                            <Input
                                                type="text"
                                                variant="underlined"
                                                label="Prénom :"
                                                labelPlacement="outside-left"
                                                value={formData.prenom}
                                                classNames={{
                                                    base: "justify-between h-[5vh]",
                                                    mainWrapper: "w-[60%]",
                                                    label: "text-white font-bold group-data-[focus=true]:text-white group-data-[focus=true]:opacity-50 group-data-[filled=true]:text-white group-data-[filled=true]:opacity-100 text-[1.8vh]",
                                                    input: "!text-white group-data-[focus=true]:text-white group-data-[filled=true]:text-white text-right text-[1.8vh]",
                                                }}
                                                onChange={(e) => handleChange('prenom', e.target.value)}
                                            />
                                            <Input
                                                type="text"
                                                variant="underlined"
                                                label="Grade :"
                                                labelPlacement="outside-left"
                                                value={formData.grade}
                                                classNames={{
                                                    base: "justify-between h-[5vh]",
                                                    mainWrapper: "w-[60%]",
                                                    label: "text-white font-bold group-data-[focus=true]:text-white group-data-[focus=true]:opacity-50 group-data-[filled=true]:text-white group-data-[filled=true]:opacity-100 text-[1.8vh]",
                                                    input: "!text-white group-data-[focus=true]:text-white group-data-[filled=true]:text-white text-right text-[1.8vh]",
                                                }}
                                                onChange={(e) => handleChange('grade', e.target.value)}
                                            />
                                            <Input
                                                type="number"
                                                variant="underlined"
                                                label="Matricule :"
                                                labelPlacement="outside-left"
                                                value={formData.matricule}
                                                classNames={{
                                                    base: "justify-between h-[5vh]",
                                                    mainWrapper: "w-[60%]",
                                                    label: "text-white font-bold group-data-[focus=true]:text-white group-data-[focus=true]:opacity-50 group-data-[filled=true]:text-white group-data-[filled=true]:opacity-100 text-[1.8vh]",
                                                    input: "!text-white group-data-[focus=true]:text-white group-data-[filled=true]:text-white text-right text-[1.8vh]",
                                                }}
                                                onChange={(e) => handleChange('matricule', e.target.value)}
                                            />
                                            <Input
                                                type="text"
                                                variant="underlined"
                                                label={parseInt(data.GI) === 1 ? 'Groupe :' : 'Branche :'}
                                                labelPlacement="outside-left"
                                                value={parseInt(data.GI) === 1 ? formData.groupe : formData.branche}
                                                classNames={{
                                                    base: "justify-between h-[5vh]",
                                                    mainWrapper: "w-[60%]",
                                                    label: "text-white font-bold group-data-[focus=true]:text-white group-data-[focus=true]:opacity-50 group-data-[filled=true]:text-white group-data-[filled=true]:opacity-100 text-[1.8vh]",
                                                    input: "!text-white group-data-[focus=true]:text-white group-data-[filled=true]:text-white text-right text-[1.8vh]",
                                                }}
                                                onChange={(e) => handleChange(parseInt(data.GI) === 1 ? 'groupe' : 'branche', e.target.value)}
                                            />
                                            

                                        </div>
                                        <div className="background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[20px] px-[2vw] py-[3vh] flex flex-col items-center justify-center w-[20vw] gap-[2vh]">
                                        <Select
                                                variant="underlined"
                                                label="Statut :"
                                                labelPlacement="outside-left"
                                                fullWidth={true}
                                                value={formData.status}
                                                defaultSelectedKeys={[formData.status]}
                                                classNames={{
                                                    base: "justify-between h-[5vh]",
                                                    label: "text-white font-bold group-data-[focus=true]:text-white group-data-[focus=true]:opacity-50 group-data-[filled=true]:text-white group-data-[filled=true]:opacity-100 text-[1.8vh]",
                                                    value: "!text-white group-data-[focus=true]:text-white group-data-[filled=true]:text-white text-right text-[1.8vh]",
                                                    mainWrapper: "w-[70%]",
                                                    trigger: "text-[#71FFFF]",
                                                    selectorIcon: "text-white",
                                                }}
                                                onChange={(e) => handleChange('status', e.target.value)}
                                            >
                                                {status.map((sat) => (
                                                    <SelectItem key={sat} value={sat}>
                                                        {sat}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="relative w-[40%] h-full flex flex-col justify-center gap-[2vh]">
                                <div className="background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[20px] px-[2vw] py-[3vh] flex flex-col items-center justify-start gap-[2vh] w-full h-[90%]">
                                    <h3 className="text-white font-bold text-[2.5vh]">
                                        Antécédents
                                    </h3>
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
                                                inputWrapper:
                                                    "!border-[#5E7F8C]",
                                                input: "font-tiny text-white border-none text-[2vh]",
                                            }}
                                        />
                                        <button className="ms-4 bg-gradient-to-br from-[#5E7F8C] to-[#314E59] text-white font-bold rounded-[20px] w-[10vw] h-[5vh] text-[2vh]">
                                            Ajouter
                                        </button>
                                    </form>
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
                                        {antecedents.map(
                                            (antecedent) => (
                                                <div
                                                    key={antecedent.id}
                                                    className="relative flex text-warp h-[20vh] text-[2vh]"
                                                >   
                                                    <Button onPress={() => { setAntToDelete(antecedent.id); onOpenChange(); }} className='text-red-600 text-[2vh] cursor-pointer p-0 min-w-0 h-auto bg-transparent rounded-none align-middle hover:!opacity-100 absolute top-1 z-20'><i class="fa-solid fa-trash"></i></Button>
                                                    <p className="text-white opacity-50 w-[20%] text-center">
                                                        {antecedent.id}
                                                    </p>
                                                    <p className="text-white opacity-50 w-[20%] text-center">
                                                        {dayjs(
                                                            antecedent.created_at
                                                        ).format("DD/MM/YYYY")}
                                                    </p>
                                                    <p className="text-white opacity-50 w-[60%] h-auto text-center">
                                                        {antecedent.description}
                                                    </p>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                                {hasPermission(auth, "deleteBDD") ? (
                                <Button onPress={() => { setBDDToDelete(data); handleBDDModalOpen() }} className='text-red-600 text-[4vh] cursor-pointer p-0 min-w-0 h-auto bg-transparent rounded-none align-middle hover:!opacity-100 absolute right-0 top-0 z-20'><i class="fa-solid fa-trash"></i></Button>
                                ) : null}
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
                                <Button color="primary" onPress={handleAntDelete}>
                                    Oui
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal
                isOpen={isBDDOpen}
                onOpenChange={handleBDDModalClose}
                classNames={{
                    base: 'bg-[#00010F]',
                    body: 'text-white',
                    header: 'text-white',
                }}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Suppression de {BDDToDelete.nom} {BDDToDelete.prenom}</ModalHeader>
                            <ModalBody>
                                <p>Êtes-vous sûr de vouloir supprimer <span className='text-[#71FFFF] font-bold'>{BDDToDelete.nom} {BDDToDelete.prenom}</span> ?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={handleBDDModalClose}>
                                    Non
                                </Button>
                                <Button color="primary" onPress={handleBDDDelete}>
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
