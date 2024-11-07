import ConfigMenu from '@/Layouts/ConfigMenu';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect, useRef } from 'react';
import ConfigHeader from '@/Layouts/ConfigHeader';
import ConfigContent from '@/Layouts/ConfigContent';
import { Select, SelectItem, Input } from "@nextui-org/react";
import { Inertia } from '@inertiajs/inertia';
import NotificationPopup from '@/Components/NotificationPopup';
import NonAffiliee from '@/Components/NonAffiliee';

export default function LoyauteView({ auth, users, SpectreData, header }) {
    let userData = [];

    const listBonus = [
        {id:1, name:"Réussi une mission et s'extrait en toute sécurité", point:1},
        {id:2, name:"A provoqué une action causant la réussite de la mission", point:10},
        {id:3, name:"Obtient une médaille", point:1},
        {id:4, name:"Participe à une mission de longue durée", point:2},
        {id:5, name:"Utilisation majoritaire des codes SPECTRE", point:1},
        {id:6, name:"Comportement irréprochable sur la mission", point:1},
        {id:7, name:"3 mois passé dans la spectre", point:1},
        {id:8, name:"Participation à une Formation", point:3},
        {id:9, name:"Rédaction d'un rapport de mission", point:1},
        {id:10, name:"Bonus LEADER", point:0},
    ];
    const listMalus = [
        {id:1, name:"Retard ou absence non justifiée à une intervention", point:-1},
        {id:2, name:"Non présent sur la radio, oublie un équipement, n'a pas mis de matricule ou de tenue correcte après le départ", point:-1},
        {id:3, name:"Ne respecte pas un ordre ou n'est pas attentif à la mission", point:-3},
        {id:4, name:"Dévoile une information confidentiel", point:-10},
        {id:5, name:"A provoqué une action causant l'échec de la mission", point:-20},
        {id:6, name:"Attire inutilement l'attention sur l'escouade", point:-2},
        {id:7, name:"Non respect d'une règle ou protocole spectre", point:-5},
        {id:8, name:"Prendre une Sanction disciplinaire", point:-10},
        {id:9, name:"Inactif pendant plus d'un mois sans raison", point:-200},
        {id:10, name:"Parle sur discord inutilement", point:-1},
        {id:11, name:"Malus LEADER", point:0},
    ];

    if(auth.user.roles[0].name == "Leader"){
        listBonus.push({id:10, name:"Bonus LEADER", point:0})
        listMalus.push({id:11, name:"Malus LEADER", point:0})
    }

    

    users.map((user) => {
        if (user.id !== 1) {
            SpectreData.map((spectre) => {
                if (user.id === parseInt(spectre.user_id)) {
                    userData.push({
                        ...user,
                        ...spectre
                    });
                }
            });
        }
    });

    const [selectedUser, setSelectedUser] = useState(null);

    const handleSelectAgent = (e) => {
        setSelectedUser((userData.filter((user) => user.user_id == e.target.value))[0]);
    }   

    const [selectedBonus, setSelectedBonus] = useState(null);

    const handleSelectBonus = (e) => {
        setPoints(0);
        setSelectedBonus(e.target.value);
    }

    let loyaute = 0;

    const submitBonus = (e) => {
        e.preventDefault();
        if (selectedUser){
            
            loyaute = parseInt(selectedUser.loyauté) + parseInt(points);
            
            if (loyaute > 100) {
                loyaute = 100;
            }
            if (loyaute < -100) {
                loyaute = -100;
            }

            Inertia.post(route('updateLoyaute', selectedUser.user_id), {
                loyaute: loyaute,
                raison: selectedReason,
            });
        }
    };

    const [points, setPoints] = useState(0);
    const [selectedReason, setSelectedReason] = useState("");

    const handleReasonChange = (value) => {
        
        let selectedPoints = 0;
        if (selectedBonus === "Bonus") {
            const bonus = listBonus.find((item) => parseInt(item.id) === parseInt(value.target.value));
            selectedPoints = bonus ? bonus.point : 0;
            setSelectedReason(bonus.name);
        } else if (selectedBonus === "Malus") {
            const malus = listMalus.find((item) => parseInt(item.id) === parseInt(value.target.value));
            selectedPoints = malus ? malus.point : 0;
            setSelectedReason(malus.name);
        }
    
        setPoints(selectedPoints);
    };

    const getScrollingClass = (text) => {
        return text.length > 50 ? 'scrolling-text scroll-active' : 'scrolling-text';
    };

    return (
        <div className='h-[100vh] w-[100vw] overflow-hidden flex relative z-20'>
            <Head title="Configuration" />
            <ConfigMenu auth={auth} />
            <NonAffiliee/>
            <NotificationPopup />
            <div className='py-[3vh] px-[2vw] w-full h-[100%]'>
                <ConfigHeader data={header} title={"Loyauté"}/>
                <div className='bg-[rgba(255,255,255,0.5)] w-[100%] h-[2px]'></div>
                <ConfigContent>
                    <div className='flex flex-col justify-around py-[2vh] px-[1vw] gap-[2vh] h-full'>
                        <div className='flex flex-col items-center w-full'>
                        <Select
                                items={userData}
                                placeholder="Sélectionnez un agent"
                                aria-label='Sélectionnez un agent'
                                classNames={{
                                    base: "w-[20%]",
                                    trigger: "background-blue border-1 border-[#71FFFF] h-[7vh]",
                                    value: "text-white text-[2vh]",
                                    selectorIcon: "text-white",
                                    
                                }}
                                onChange={handleSelectAgent}
                                listboxProps={{
                                    itemClasses: {
                                        base: [
                                        "rounded-md",
                                        "text-default-500",
                                        "transition-opacity",
                                        "data-[hover=true]:background-black",
                                        "data-[focus=true]:background-black",
                                        "data-[selectable=true]:focus:!background-black",
                                        "data-[pressed=true]:opacity-70",
                                        "data-[focus-visible=true]:background-black",
                                        ],
                                        presentation: "text-white",
                                    },
                                }}
                                popoverProps={{
                                classNames: {
                                    base: "before:background-blue",
                                    content: "p-0 border-small border-divider background-blue",
                                },
                                }}
                                renderValue={(items) => {
                                    return items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-2">
                                        <div className="background-profile w-[5vh] h-[5vh] rounded-[20px]"></div>
                                        <div className="flex flex-col">
                                            <span className="text-white text-[2vh]">{item.data.roles[0].name}-{item.data.matricule}</span>
                                            <span className="text-white font-light opacity-70 text-[1.8vh]">{item.data.roles[1].name}</span>
                                        </div>
                                        <div>
                                        <span className={`text-[3vh] ml-[2vw] ${item.data.loyauté >= 0 ? "text-green-500" : "text-red-500"}`}>{item.data.loyauté}</span>
                                        </div>
                                    </div>
                                    ));
                                }}
                                >
                                {(userData) => (
                                    <SelectItem key={userData.id} textValue={userData.user_id}>
                                        <div className="flex gap-[0.5vw] items-center">
                                            <div className="background-profile w-[5vh] h-[5vh] rounded-[20px]"></div>
                                            <div className="flex flex-col">
                                                <span className="text-white text-[2vh]">{userData.roles[0].name}-{userData.matricule}</span>
                                                <span className="text-white font-light opacity-70 text-[1.8vh]">{userData.roles[1].name}</span>
                                            </div>
                                            <span className={`text-[3vh] ml-[2vw] ${userData.loyauté >= 0 ? "text-green-500" : "text-red-500"}`}>{userData.loyauté}</span>
                                        </div>
                                    </SelectItem>
                                )}
                            </Select>
                        </div>
                        <div className='flex flex-col items-center w-full h-[80%]'>
                            <div className='background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[20px] px-[2vw] py-[3vh] flex flex-col w-[80%] h-full'>
                                {selectedUser ? (
                                    <div key={selectedUser.id} className='flex flex-col justify-around items-center gap-[1vw] h-full w-full'>
                                        <div className='flex justify-around items-center gap-[1vw] w-full'>
                                            <div className='flex justify-around items-center gap-[1vw] h-full w-[40%]'>
                                                <div className="background-profile w-[25vh] h-[25vh] rounded-[1000px]"></div>
                                                <div className='flex flex-col justify-around h-[70%]'>
                                                    <div>
                                                        <p className='text-white text-[4vh] font-bold'>{selectedUser.roles[0].name}-{selectedUser.matricule}</p>
                                                        <p className='text-white text-[2.5vh] font-tiny opacity-80'>{selectedUser.roles[1].name}</p>
                                                    </div>
                                                    <div>
                                                        <p className='text-white text-[4vh] font-bold'>Point :</p>
                                                        <p className='text-[#71FFFF] text-[5vh] font-bold'>{selectedUser.loyauté}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='w-[20%] h-full flex flex-col items-center justify-center'>
                                                <Select
                                                    aria-label='Sélectionnez un bonus ou un malus'
                                                    onChange={handleSelectBonus}
                                                    classNames={{
                                                        base: "w-full",
                                                        trigger: "background-blue border-1 border-[#71FFFF]",
                                                        value: "!text-white text-[2vh]",
                                                        selectorIcon: "text-white",
                                                    }}
                                                    listboxProps={{
                                                        itemClasses: {
                                                            base: [
                                                            "rounded-md",
                                                            "text-default-500",
                                                            "transition-opacity",
                                                            "data-[hover=true]:background-black",
                                                            "data-[focus=true]:background-black",
                                                            "data-[selectable=true]:focus:!background-black",
                                                            "data-[pressed=true]:opacity-70",
                                                            "data-[focus-visible=true]:background-black",
                                                            ],
                                                            presentation: "text-white",
                                                        },
                                                    }}
                                                    popoverProps={{
                                                    classNames: {
                                                        base: "before:background-blue",
                                                        content: "p-0 border-small border-divider background-blue",
                                                    },
                                                    }}

                                                >
                                                    <SelectItem key={"Bonus"} textValue={"Bonus"}>Bonus</SelectItem>
                                                    <SelectItem key={"Malus"} textValue={"Malus"}>Malus</SelectItem>
                                                </Select>
                                            </div>
                                            <div className='w-[40%] h-full'>
                                                {selectedBonus == "Bonus" || selectedBonus == "Malus" ? (
                                                    <form onSubmit={submitBonus} className='flex flex-col items-center justify-around h-full w-full'>
                                                        <Select
                                                            aria-label='Sélectionnez un bonus ou un malus'
                                                            placeholder='Raisons'
                                                            classNames={{
                                                                base: "w-full",
                                                                trigger: "background-blue border-1 border-[#71FFFF]",
                                                                value: `!text-white text-[2vh]`,
                                                                selectorIcon: "text-white",
                                                            }}
                                                            listboxProps={{
                                                                itemClasses: {
                                                                    base: [
                                                                    "rounded-md",
                                                                    "text-default-500",
                                                                    "transition-opacity",
                                                                    "data-[hover=true]:background-black",
                                                                    "data-[focus=true]:background-black",
                                                                    "data-[selectable=true]:focus:!background-black",
                                                                    "data-[pressed=true]:opacity-70",
                                                                    "data-[focus-visible=true]:background-black",
                                                                    ],
                                                                    presentation: "text-white",
                                                                },
                                                            }}
                                                            popoverProps={{
                                                            classNames: {
                                                                base: "before:background-blue",
                                                                content: "p-0 border-small border-divider background-blue",
                                                            },
                                                            }}
                                                            onChange={handleReasonChange}
                                                            renderValue={(items) => {
                                                                return items.map((item) => (
                                                                <div key={item.key} textValue={item.textValue}>
                                                                    <span className={getScrollingClass(item.textValue)}>{item.textValue}</span>
                                                                </div>
                                                                ));
                                                            }}
                                                        >
                                                            {selectedBonus === "Bonus" ? (
                                                                listBonus.map((bonus) => (
                                                                    <SelectItem key={bonus.id} textValue={bonus.name}>
                                                                        <span className={getScrollingClass(bonus.name)}>{bonus.name}</span>
                                                                    </SelectItem>
                                                                ))
                                                            ) : null}
                                                            {selectedBonus === "Malus" ? (
                                                                listMalus.map((malus) => (
                                                                    <SelectItem key={malus.id} textValue={malus.name}>
                                                                        <span className={`${getScrollingClass(malus.name)} w-max`}>{malus.name}</span>
                                                                    </SelectItem>
                                                                ))
                                                            ) : null}
                                                        </Select>
                                                        <div className='flex flex-col items-center justify-around h-full gap-[2vh]'>
                                                            <p className='text-white text-[2.5vh]'>
                                                                {selectedBonus == "Bonus" ? (
                                                                    "Nombre de points à ajouter"
                                                                ) : (
                                                                    "Nombre de points à retirer"
                                                                )}
                                                            </p>
                                                            <Input
                                                                type="number"
                                                                labelPlacement="outside-left"
                                                                value={points}
                                                                onChange={(e) => setPoints(parseInt(e.target.value))}
                                                                classNames={{
                                                                    base: "w-[50%]",
                                                                    inputWrapper: "background-blue border-1 border-[#71FFFF]",
                                                                    input: "!text-white text-center text-[3vh]",
                                                                }}
                                                            >
                                                            </Input>

                                                            <button className="bg-gradient-to-br from-[#5E7F8C] to-[#314E59] text-white font-bold rounded-[20px] w-[15vw] h-[6.5vh] text-[3vh]">
                                                                
                                                                {selectedBonus == "Bonus" ? (
                                                                    "Ajouter"
                                                                ) : (
                                                                    "Retirer"
                                                                )}
                                                            </button>
                                                        </div>
                                                    </form>
                                                ) : (
                                                    <div className='h-full w-full flex flex-col items-center justify-center'>
                                                        <p className="text-white text-[2.5vh]">Sélectionnez "Bonus" ou "Malus"</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className='w-full flex flex-col justify-center items-center'>
                                            <p className='text-white font-medium text-[2.5vh]'>Barème</p>


                                            {selectedUser.loyauté >= 100 ? (
                                                <p className=' text-white font-light text-[2vh]'>Médaille de la Loyauté</p>
                                            ) : (
                                                <div></div>
                                            )}
                                            {selectedUser.loyauté >= 90 && selectedUser.loyauté <= 99 ? (
                                                <p className=' text-white font-light text-[2vh]'>Candidature LEADER autorisé</p>
                                            ) : (
                                                <div></div>
                                            )}
                                            {selectedUser.loyauté >= 80 && selectedUser.loyauté <= 89 ? (
                                                <p className=' text-white font-light text-[2vh]'>Autorisation d'avoir une CITADEL (ELITE+)</p>
                                            ) : (
                                                <div></div>
                                            )}
                                            {selectedUser.loyauté >= 70 && selectedUser.loyauté <= 79 ? (
                                                <p className=' text-white font-light text-[2vh]'>Autorisation d'avoir un PHANTOM (ELITE+)</p>
                                            ) : (
                                                <div></div>
                                            )}
                                            {selectedUser.loyauté >= 60 && selectedUser.loyauté <= 69 ? (
                                                <p className=' text-white font-light text-[2vh]'>Potentiel MAGE</p>
                                            ) : (
                                                <div></div>
                                            )}
                                            {selectedUser.loyauté >= 50 && selectedUser.loyauté <= 59 ? (
                                                <p className=' text-white font-light text-[2vh]'>Potentiel KING</p>
                                            ) : (
                                                <div></div>
                                            )}
                                            {selectedUser.loyauté >= 40 && selectedUser.loyauté <= 49 ? (
                                                <p className=' text-white font-light text-[2vh]'>Potentiel KNIGHT</p>
                                            ) : (
                                                <div></div>
                                            )}
                                            {selectedUser.loyauté >= 30 && selectedUser.loyauté <= 39 ? (
                                                <p className=' text-white font-light text-[2vh]'>Potentiel ELITE</p>
                                            ) : (
                                                <div></div>
                                            )}
                                            {selectedUser.loyauté >= 20 && selectedUser.loyauté <= 29 ? (
                                                <p className=' text-white font-light text-[2vh]'>Potentiel ECHO</p>
                                            ) : (
                                                <div></div>
                                            )}
                                            {selectedUser.loyauté >= 10 && selectedUser.loyauté <= 19 ? (
                                                <p className=' text-white font-light text-[2vh]'>Potentiel NOVA</p>
                                            ) : (
                                                <div></div>
                                            )}

                                            {selectedUser.loyauté <= -10 && selectedUser.loyauté >= -19 ? (
                                                <p className=' text-red-600 font-light text-[2vh]'>Classification en ERROR</p>
                                            ) : (
                                                <div></div>
                                            )}
                                            {selectedUser.loyauté <= -20 && selectedUser.loyauté >= -29 ? (
                                                <p className=' text-red-600 font-light text-[2vh]'>Sous surveillance EXECUTOR</p>
                                            ) : (
                                                <div></div>
                                            )}
                                            {selectedUser.loyauté <= -30 ? (
                                                <p className=' text-red-600 font-light text-[2vh]'>Agent renégat</p>
                                            ) : (
                                                <div></div>
                                            )}

                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex flex-col justify-center items-center w-full h-full'>
                                        <p className="text-white text-[3vh]">Sélectionnez un agent pour pouvoir changer la loyauté.</p>
                                    </div>
                                )}
                                
                            </div>
                        </div>
                    </div>
                </ConfigContent>
            </div>
        </div>
    );
}
