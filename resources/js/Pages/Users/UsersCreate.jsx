import ConfigMenu from "@/Layouts/ConfigMenu";
import { Head, useForm } from "@inertiajs/react";
import {React, useEffect} from "react";
import ConfigHeader from "@/Layouts/ConfigHeader";
import ConfigContent from "@/Layouts/ConfigContent";
import LogoSCP from "@/Components/LogoSCP";
import { Input } from "@nextui-org/react";
import {Select, SelectSection, SelectItem} from "@nextui-org/select";


export default function UsersList({ users, auth, header }) {
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    const grades = ['Leader','King','Knight','Mage','Elite','Echo','Nova','Whisper', 'Etat Major'];
    const specialisations = ['Executor','Guardian','Ghost','Spirits','Sector', 'N/A'];

    // modifier la liste ci-dessous pour l'adapter au form
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        password_confirmation: '',
        matricule: '',
        grade: '',
        specialisation: '',
        loyaute: '',
        STEAM_ID: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    const isFormValid = () => {
        return (
            data.username.trim() &&
            data.password.trim() &&
            data.password_confirmation.trim() &&
            data.matricule.trim() &&
            data.grade.trim() &&
            data.specialisation.trim() &&
            data.loyaute.trim() &&
            data.STEAM_ID.trim()
        );
    }

    return (
        
        <div className="h-[100vh] overflow-hidden flex">

            <Head title="Configuration" />
            <ConfigMenu auth={auth} />

            <LogoSCP className="w-[22vw] opacity-20 absolute top-[35%] right-[10%] z-0" />
            <div className="py-[3vh] px-[2vw] w-full h-[100%] relative z-20">
                <ConfigHeader data={header} title={"Création d’un compte agent"}/>
                <div className="bg-[rgba(255,255,255,0.5)] w-[100%] h-[2px]"></div>
                <ConfigContent>
                    <div className="py-[2vh] px-[1vw] flex flex-col justify-around gap-[2vh] h-[100%]">
                        <div className="w-max">
                            <a
                                href={route("usersList")}
                                className="flex text-white gap-[0.5vw] items-center hover:underline text-[2vh]"
                            >
                                <i class="fa-solid fa-arrow-left"></i>
                                <p className="font-normal">Retour à la Liste</p>
                            </a>
                        </div>
                        <div className="flex h-[100%] w-full items-start">
                            <div className="w-[100%]">
                                <form onSubmit={submit}>
                                    <input
                                        type="hidden"
                                        name="_token"
                                        value={csrfToken}
                                    />

                                    <div className="flex justify-evenly">
                                        <div className="flex flex-col items-center justify-between gap-[3vh] w-[50%]">
                                            <div className="background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[35px] px-[2vw] py-[3vh] flex flex-col items-center justify-center gap-[3vh] w-[30vw]">
                                                <h3 className="text-white font-bold text-[2.5vh]">
                                                    Informations compte
                                                </h3>
                                                <Input
                                                    type="text"
                                                    variant="underlined"
                                                    label="I.D :"
                                                    labelPlacement="outside-left"
                                                    value={data.username}
                                                    classNames={{
                                                        base: "justify-end",
                                                        label: "text-white text-[2vh] font-bold group-data-[focus=true]:text-white group-data-[focus=true]:opacity-50 group-data-[filled=true]:text-white group-data-[filled=true]:opacity-100",
                                                        input: "!text-white group-data-[focus=true]:text-white group-data-[filled=true]:text-white text-[2vh]",
                                                        mainWrapper: "w-[15vw]",
                                                    }}
                                                    onChange={(e) => setData('username', e.target.value)}
                                                />
                                                <Input
                                                    type="password"
                                                    variant="underlined"
                                                    label="Mot de passe :"
                                                    labelPlacement="outside-left"
                                                    value={data.password}
                                                    classNames={{
                                                        base: "justify-end",
                                                        label: "text-white text-[2vh] font-bold group-data-[focus=true]:text-white group-data-[focus=true]:opacity-50 group-data-[filled=true]:text-white group-data-[filled=true]:opacity-100",
                                                        input: "!text-white group-data-[focus=true]:text-white group-data-[filled=true]:text-white text-[2vh]",
                                                        mainWrapper: "w-[15vw]",
                                                    }}
                                                    onChange={(e) => setData('password', e.target.value)}
                                                />
                                                <Input
                                                    type="password"
                                                    variant="underlined"
                                                    label="Confirmer le MDP :"
                                                    labelPlacement="outside-left"
                                                    value={data.password_confirmation}
                                                    classNames={{
                                                        base: "justify-end",
                                                        label: "text-white text-[2vh] font-bold group-data-[focus=true]:text-white group-data-[focus=true]:opacity-50 group-data-[filled=true]:text-white group-data-[filled=true]:opacity-100",
                                                        input: "!text-white group-data-[focus=true]:text-white group-data-[filled=true]:text-white text-[2vh]",
                                                        mainWrapper: "w-[15vw]",
                                                    }}
                                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                                />
                                            </div>
                                            <div className="background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[35px] px-[2vw] py-[3vh] flex flex-col items-center justify-center w-[30vw]">
                                                <Input
                                                    type="text"
                                                    variant="underlined"
                                                    label="Steam_ID 64 :"
                                                    labelPlacement="outside-left"
                                                    value={data.STEAM_ID}
                                                    classNames={{
                                                        base: "justify-end",
                                                        label: "text-white text-[2vh] font-bold group-data-[focus=true]:text-white group-data-[focus=true]:opacity-50 group-data-[filled=true]:text-white group-data-[filled=true]:opacity-100",
                                                        input: "!text-white group-data-[focus=true]:text-white group-data-[filled=true]:text-white text-[2vh]",
                                                        mainWrapper: "w-[15vw]",
                                                    }}
                                                    onChange={(e) => setData('STEAM_ID', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-[2vw] w-[50%]">
                                            <div className="background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[35px] px-[2vw] py-[3vh] flex flex-col items-center justify-center gap-[3vh] h-[100%]">
                                                <h3 className="text-white font-bold text-[2.5vh]">
                                                    Informations Agent
                                                </h3>
                                                <Input
                                                    type="number"
                                                    variant="underlined"
                                                    label="Matricule :"
                                                    labelPlacement="outside-left"
                                                    value={data.matricule}
                                                    classNames={{
                                                        base: "justify-end",
                                                        label: "text-white text-[2vh] font-bold group-data-[focus=true]:text-white group-data-[focus=true]:opacity-50 group-data-[filled=true]:text-white group-data-[filled=true]:opacity-100",
                                                        input: "!text-white group-data-[focus=true]:text-white group-data-[filled=true]:text-white text-[2vh]",
                                                        mainWrapper: "w-[12vw]",
                                                    }}
                                                    onChange={(e) => setData('matricule', e.target.value)}
                                                />
                                                <Select
                                                    variant='underlined'
                                                    label="Grade :"
                                                    labelPlacement="outside-left"
                                                    fullWidth={true}
                                                    value={data.grade}
                                                    classNames={{
                                                        base: "justify-end",
                                                        label: "text-white text-[2vh] font-bold group-data-[focus=true]:text-white group-data-[focus=true]:opacity-50 group-data-[filled=true]:text-white group-data-[filled=true]:opacity-100",
                                                        value: "!text-white group-data-[focus=true]:text-white group-data-[filled=true]:text-white text-[2vh]",
                                                        mainWrapper: "w-[12vw]",
                                                        selectorIcon: "text-white",
                                                    }}
                                                    onChange={(e) => setData('grade', e.target.value)}
                                                >
                                                    {grades.map((grade) => (
                                                    <SelectItem key={grade}>
                                                        {grade}
                                                    </SelectItem>
                                                    ))}
                                                </Select>
                                                <Select
                                                    variant='underlined'
                                                    label="Spécialité :"
                                                    labelPlacement="outside-left"
                                                    fullWidth={true}
                                                    value={data.specialisation}
                                                    classNames={{
                                                        base: "justify-end",
                                                        label: "text-white text-[2vh] font-bold group-data-[focus=true]:text-white group-data-[focus=true]:opacity-50 group-data-[filled=true]:text-white group-data-[filled=true]:opacity-100",
                                                        value: "!text-white group-data-[focus=true]:text-white group-data-[filled=true]:text-white text-[2vh]",
                                                        mainWrapper: "w-[12vw]",
                                                        selectorIcon: "text-white",
                                                    }}
                                                    onChange={(e) => setData('specialisation', e.target.value)}
                                                >
                                                    {specialisations.map((specialisation) => (
                                                    <SelectItem key={specialisation}>
                                                        {specialisation}
                                                    </SelectItem>
                                                    ))}
                                                </Select>
                                                <Input
                                                    type="number"
                                                    variant="underlined"
                                                    label="Loyauté :"
                                                    labelPlacement="outside-left"
                                                    value={data.loyaute}
                                                    classNames={{
                                                        base: "justify-end",
                                                        label: "text-white text-[2vh] font-bold group-data-[focus=true]:text-white group-data-[focus=true]:opacity-50 group-data-[filled=true]:text-white group-data-[filled=true]:opacity-100",
                                                        input: "!text-white group-data-[focus=true]:text-white group-data-[filled=true]:text-white text-[2vh]",
                                                        mainWrapper: "w-[12vw]",
                                                    }}
                                                    onChange={(e) => setData('loyaute', e.target.value)}
                                                />
                                                
                                            </div>
                                            <button className={`ms-4 bg-gradient-to-br from-[#5E7F8C] to-[#314E59] text-white font-bold rounded-[20px] text-[4vh] h-[8vh] w-[30%] ${isFormValid() ? '' : 'opacity-50'}`} disabled={!isFormValid() || processing}>
                                                {isFormValid() ? 'Création' : 'Disabled'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </ConfigContent>
            </div>
        </div>
    );
}
