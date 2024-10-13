import React from "react";

export default function ConfigHeader({title, data}){

    let grade = data.auth.roles[0];
    let user = data.spectre.find(spectre => parseInt(spectre.user_id) === data.auth.id);
    let matricule = user ? user.matricule : 'Unknown';
    let specialite = data.auth.roles[1];

    let nmb_agents = data.spectre.length;
    let nmb_absences = data.absences.length;
    let nmb_bdd = data.BDD.length;

    let avr_loyalty = 0;

    data.spectre.map((spectre) => {
        avr_loyalty += spectre.loyauté;
    });

    avr_loyalty = avr_loyalty / data.spectre.length;
    

    return (
        <div className="bg-[rgba(49,78,89,0.3)] rounded-t-[20px] h-[30%] flex items-center justify-around px-[2vw] py-[2vh]">
            <div className="flex items-center gap-[1vw] w-[25%] h-[100%]">
                <div className="background-mountain w-[20vh] h-[20vh] rounded-[20px] overflow-hidden">
                    <img src={data.auth.photo} alt="" className="w-full pt-[5vh] object-cover rounded-[20px]"/>
                </div>
                <div>
                    <p className="text-white font-bold text-[4vh]">{grade}-{matricule}</p>
                    <p className="text-white font-medium text-[3.5vh] opacity-80">{specialite}</p>
                </div>
            </div>
            <div className="w-[25%]">
                <h2 className="text-white font-semibold text-[4vh] text-center">{title}</h2>
            </div>
            <div className="w-[50%]">
                <div className='flex items-center justify-around h-full'>
                    <div className='flex flex-col items-center justify-between h-full gap-[1vh]'>
                        <p className='text-white font-normal text-[2.5vh] opacity-80 text-center'>Nombre<br></br>d'agents</p>
                        <p className='text-[#71FFFF] font-bold text-[2vh] text-center'>{nmb_agents}</p>
                        <div className='h-[10vh] w-[2vw] border-white border-1 p-[3px] flex flex-col justify-end'>
                            <div className='bg-white h-[55%]'></div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-between h-full gap-[1vh]'>
                        <p className='text-white font-normal text-[2.5vh] opacity-80 text-center'>Nombre<br></br>abscences</p>
                        <p className='text-[#71FFFF] font-bold text-[2vh] text-center'>{nmb_absences}</p>
                        <div className='h-[10vh] w-[2vw] border-white border-1 p-[3px] flex flex-col justify-end'>
                            <div className='bg-white h-[40%]'></div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-between h-full gap-[1vh]'>
                        <p className='text-white font-normal text-[2.5vh] opacity-80 text-center'>Nombre de <br></br>base de donnée</p>
                        <p className='text-[#71FFFF] font-bold text-[2vh] text-center'>{nmb_bdd}</p>
                        <div className='h-[10vh] w-[2vw] border-white border-1 p-[3px] flex flex-col justify-end'>
                            <div className='bg-white h-[15%]'></div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className='text-white font-normal text-[3vh] opacity-80 text-center'>Loyauté<br></br>moyenne</p>
                        <p className='text-[#71FFFF] font-bold text-[4vh] text-center'>{avr_loyalty}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}