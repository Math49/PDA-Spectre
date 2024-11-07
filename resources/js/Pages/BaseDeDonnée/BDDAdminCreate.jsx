import ConfigMenu from '@/Layouts/ConfigMenu';
import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import ConfigHeader from '@/Layouts/ConfigHeader';
import ConfigContent from '@/Layouts/ConfigContent';
import { Input, Textarea } from "@nextui-org/react";
import { Inertia } from '@inertiajs/inertia';


export default function BDDAdminCreate  ({ auth, header }) {

    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    
    const { data, setData, post, processing, errors, reset } = useForm({
        nom: '',
        prenom: '',
        grade: '',
        matricule: '',
        branche: '',
        GI: '',
        groupe: '',
        steamid: '',
        photo: '',
    });

    let [GI, setGI] = useState(false);
    let [sending, setSending] = useState(false);

    const handleGI = (value) => () => {
        setGI(value);
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData((prev) => ({
                ...prev,
                photo: file,
            }));
            // Générer un aperçu de l'image
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const [imagePreview, setImagePreview] = useState(null);
    const [showClearText, setShowClearText] = useState(false);

    const clearImage = () => {
        setImagePreview(null); // Réinitialise l'aperçu de l'image
    };

    const submit = (e) => {
        e.preventDefault();
        setSending(true);
        setData('GI', GI);
        Inertia.post(route('AddAdminBDDStore'),{
            'nom': data.nom,
            'prenom': data.prenom,
            'grade': data.grade,
            'matricule': data.matricule,
            'branche': data.branche,
            'GI': GI,
            'groupe': data.groupe,
            'steamid': data.steamid,
            'photo': data.photo,
        });
        
    };

    const isFormValid = () => {
        return(
            data.nom.trim() &&
            data.prenom.trim() &&
            data.grade.trim() &&
            data.matricule.trim() &&
            data.branche.trim() &&
            data.groupe.trim() &&
            data.steamid.trim() &&
            data.photo
        );
    }

    return (
        <div className='h-[100vh] w-[100vw] overflow-hidden flex relative z-20'>
            <Head title="BDD Create" />
            <ConfigMenu auth={auth} />
            <NonAffiliee />
            <div className='py-[3vh] px-[2vw] w-full h-[100%]'>
                <ConfigHeader data={header} title={"BDD Create"}/>
                <div className='bg-[rgba(255,255,255,0.5)] w-[100%] h-[2px]'></div>
                <ConfigContent>
                    <div className='flex flex-col py-[2vh] px-[2vw] h-full gap-[2vh]'>
                        <div className="w-max">
                            <a
                                href={route("BDDAdminList")}
                                className="flex text-white gap-[0.5vw] items-center hover:underline text-[2vh]"
                            >
                                <i class="fa-solid fa-arrow-left"></i>
                                <p className="font-normal">Retour à la Liste</p>
                            </a>
                        </div>
                        
                        <div className="flex h-full w-full gap-[5vh] items-center justify-center">
                            <div className='w-[20%] h-full flex flex-col gap-[5vh] justify-center items-center'>
                                <button className="ms-4 bg-gradient-to-br from-[#5E7F8C] to-[#314E59] text-white font-bold rounded-[20px] text-[3vh] h-[8vh] w-[80%] p-1"
                                onClick={handleGI(false)}
                                >
                                    <p className={`flex justify-center items-center h-full w-full p-0 m-0 rounded-[17px] ${GI ? "bg-[#00010F] hover:bg-transparent" : "bg-transparent"}`}>FONDATION</p>
                                </button>
                                <button className="ms-4 bg-gradient-to-br from-[#5E7F8C] to-[#314E59] text-white font-bold rounded-[20px] text-[4vh] h-[8vh] w-[80%] p-1"
                                onClick={handleGI(true)}
                                >
                                    <p className={`flex justify-center items-center h-full w-full p-0 m-0 rounded-[17px] ${GI ? "bg-transparent" : "bg-[#00010F] hover:bg-transparent"}`}>G.I.</p>
                                </button>
                            </div>
                            <form onSubmit={submit} className='w-[80%] flex justify-around items-center'>
                                <input
                                    type="hidden"
                                    name="_token"
                                    value={csrfToken}
                                />
                                <div>
                                    <div className='background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[20px] px-[2vw] py-[5vh] flex flex-col items-center justify-center gap-[2vh]'>
                                        <h3 className="text-white font-bold text-[2.5vh]">Informations agent</h3>
                                        <Input
                                            type="text"
                                            variant="underlined"
                                            label="Nom :"
                                            labelPlacement="outside-left"
                                            value={data.nom}
                                            classNames={{
                                                base: "justify-end",
                                                label: "text-white text-[2vh] font-bold group-data-[focus=true]:text-white group-data-[focus=true]:opacity-50 group-data-[filled=true]:text-white group-data-[filled=true]:opacity-100",
                                                input: "!text-white group-data-[focus=true]:text-white group-data-[filled=true]:text-white text-[2vh]",
                                                mainWrapper: "w-[12vw]",
                                            }}
                                            onChange={(e) => setData('nom', e.target.value)}
                                        />
                                        <Input
                                            type="text"
                                            variant="underlined"
                                            label="Prénom :"
                                            labelPlacement="outside-left"
                                            value={data.prenom}
                                            classNames={{
                                                base: "justify-end",
                                                label: "text-white text-[2vh] font-bold group-data-[focus=true]:text-white group-data-[focus=true]:opacity-50 group-data-[filled=true]:text-white group-data-[filled=true]:opacity-100",
                                                input: "!text-white group-data-[focus=true]:text-white group-data-[filled=true]:text-white text-[2vh]",
                                                mainWrapper: "w-[12vw]",
                                            }}
                                            onChange={(e) => setData('prenom', e.target.value)}
                                        />
                                        <Input
                                            type="text"
                                            variant="underlined"
                                            label="Grade :"
                                            labelPlacement="outside-left"
                                            value={data.grade}
                                            classNames={{
                                                base: "justify-end",
                                                label: "text-white text-[2vh] font-bold group-data-[focus=true]:text-white group-data-[focus=true]:opacity-50 group-data-[filled=true]:text-white group-data-[filled=true]:opacity-100",
                                                input: "!text-white group-data-[focus=true]:text-white group-data-[filled=true]:text-white text-[2vh]",
                                                mainWrapper: "w-[12vw]",
                                            }}
                                            onChange={(e) => setData('grade', e.target.value)}
                                        />
                                        <Input
                                            type="number"
                                            variant="underlined"
                                            label="Matricule :"
                                            labelPlacement="outside-left"
                                            maxLength={17}
                                            minLength={1}
                                            value={data.matricule}
                                            classNames={{
                                                base: "justify-end",
                                                label: "text-white text-[2vh] font-bold group-data-[focus=true]:text-white group-data-[focus=true]:opacity-50 group-data-[filled=true]:text-white group-data-[filled=true]:opacity-100",
                                                input: "!text-white group-data-[focus=true]:text-white group-data-[filled=true]:text-white text-[2vh]",
                                                mainWrapper: "w-[12vw]",
                                            }}
                                            onChange={(e) => setData('matricule', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className='background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[20px] px-[2vw] py-[5vh] flex flex-col items-center justify-center gap-[2vh]'>
                                        <h3 className="text-white font-bold text-[2.5vh]">Informations structure</h3>
                                        
                                        <Input
                                            type="text"
                                            variant="underlined"
                                            label="Branche :"
                                            labelPlacement="outside-left"
                                            value={data.branche}
                                            classNames={{
                                                base: "justify-end",
                                                label: "text-white text-[2vh] font-bold group-data-[focus=true]:text-white group-data-[focus=true]:opacity-50 group-data-[filled=true]:text-white group-data-[filled=true]:opacity-100",
                                                input: "!text-white group-data-[focus=true]:text-white group-data-[filled=true]:text-white text-[2vh]",
                                                mainWrapper: "w-[12vw]",
                                            }}
                                            onChange={(e) => setData('branche', e.target.value)}
                                        />
                                        <Input
                                            type="text"
                                            variant="underlined"
                                            label={`${GI ? "Groupe" : "Zone"} :`}
                                            labelPlacement="outside-left"
                                            value={data.groupe}
                                            classNames={{
                                                base: "justify-end",
                                                label: "text-white text-[2vh] font-bold group-data-[focus=true]:text-white group-data-[focus=true]:opacity-50 group-data-[filled=true]:text-white group-data-[filled=true]:opacity-100",
                                                input: "!text-white group-data-[focus=true]:text-white group-data-[filled=true]:text-white text-[2vh]",
                                                mainWrapper: "w-[12vw]",
                                            }}
                                            onChange={(e) => setData('groupe', e.target.value)}
                                        />
                                        <Input
                                            type="text"
                                            variant="underlined"
                                            label="Steam_ID :"
                                            labelPlacement="outside-left"
                                            value={data.steamid}
                                            maxLength={17}
                                            minLength={17}
                                            classNames={{
                                                base: "justify-end",
                                                label: "text-white text-[2vh] font-bold group-data-[focus=true]:text-white group-data-[focus=true]:opacity-50 group-data-[filled=true]:text-white group-data-[filled=true]:opacity-100",
                                                input: "!text-white group-data-[focus=true]:text-white group-data-[filled=true]:text-white text-[2vh]",
                                                mainWrapper: "w-[12vw]",
                                            }}
                                            onChange={(e) => setData('steamid', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='w-[25%] flex flex-col justify-center items-center'>
                                    <div className='h-[30vh]'>
                                    {imagePreview ? (
                                        <div
                                            className="mt-4 relative w-[25vh] h-[25vh]"
                                            onMouseEnter={() => setShowClearText(true)}  // Affiche "Vider"
                                            onMouseLeave={() => setShowClearText(false)} // Masque "Vider"
                                            onClick={clearImage}  // Vide l'aperçu de l'image
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <img
                                                src={imagePreview}
                                                alt="Aperçu de la photo de profil"
                                                className="w-[25vh] h-[25vh] object-cover rounded-[20px]"
                                            />
                                            {showClearText && (
                                                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-[20px]">
                                                    <p className="text-white font-bold">Vider</p>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        
                                        <label htmlFor="images" className="flex flex-col justify-center items-center gap-[10px] p-[2vh] border-dashed border-[2px] border-[#71FFFF] border-opacity-50 text-[#71FFFF] text-opacity-50 hover:bg-[#314E59] hover:bg-opacity-30 cursor-pointer" id="dropcontainer">
                                        <span className='text-[#71FFFF] font-bold opacity-80'>Importer la photo</span>
                                        ou
                                        <input
                                        type="file"
                                        id="images"
                                        className='block w-full text-sm text-slate-500
                                            file:cursor-pointer
                                            cursor-pointer
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-[#71FFFF] file:bg-opacity-50 hover:file:bg-opacity-20 file:text-white'
                                        accept='image/jpeg, image/png, image/jpg'
                                        onChange={handleImageUpload}
                                    />
                                    </label>
                                    )}
                                    </div>
                                    <button className={`ms-4 bg-gradient-to-br from-[#5E7F8C] to-[#314E59] text-white font-bold rounded-[20px] text-[3vh] h-[6.5vh] w-[80%] ${isFormValid() || sending ? '' : 'opacity-50'}`} disabled=     {!isFormValid() || processing || sending}
                                    >
                                        {sending ? 'Envoi...' : 
                                            isFormValid() ? 'Création' : 'Disabled'
                                        }   
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </ConfigContent>
            </div>

        </div>
    );
}
