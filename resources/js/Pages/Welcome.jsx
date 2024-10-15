import { Link, Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import UserHeader from "@/Layouts/UserHeader";
import { Stage, Layer, Circle, Line } from "react-konva";
import dayjs from "dayjs";
import { Inertia } from "@inertiajs/inertia";

export default function Welcome({ data, auth }) {
    
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // Recalculer les positions des cercles sur redimensionnement
    const recalculateCircles = (width, height) => {
        return [
            { id: "circle1", x: width * 0.3, y: height * 0.5, radius: 8, color: "#71FFFF" },
            { id: "circle2", x: width * 0.3, y: height * 0.65, radius: 8, color: "#71FFFF" },
            { id: "circle3", x: width * 0.3, y: height * 0.8, radius: 8, color: "#71FFFF" },
            { id: "circle4", x: width * 0.45, y: height * 0.5, radius: 8, color: "#71FFFF" },
        ];
    };

    const [circles, setCircles] = useState(recalculateCircles(dimensions.width, dimensions.height));

    // Met à jour les dimensions et les positions des cercles lorsqu'on redimensionne la fenêtre
    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;
            setDimensions({ width: newWidth, height: newHeight });
            setCircles(recalculateCircles(newWidth, newHeight));
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const lines = [
        { points: [circles[0].x, circles[0].y, circles[3].x, circles[3].y] },
        { points: [circles[1].x, circles[1].y, circles[3].x, circles[3].y] },
        { points: [circles[2].x, circles[2].y, circles[3].x, circles[3].y] },
    ];

    let medals = [];

    data.medalsList.map((medal) => {
        let medalData = data.medals.find(
            (medalData) => parseInt(medalData.id) === parseInt(medal.medal_id)
        );
        medals.push({
            id: medalData.id,
            name: medalData.name,
            image: medalData.image,
            description: medalData.description,
        });
    });

    const [tooltip, setTooltip] = useState({
        visible: false,
        name: "",
        x: 0,
        y: 0,
    });

    const handleMouseOver = (event, medalName) => {
        setTooltip({
            visible: true,
            name: medalName,
            x: event.clientX,
            y: event.clientY,
        });
    };

    const handleMouseMove = (event) => {
        if (tooltip.visible) {
            setTooltip((prev) => ({
                ...prev,
                x: event.clientX,
                y: event.clientY,
            }));
        }
    };

    const handleMouseOut = () => {
        setTooltip({ visible: false, name: "", x: 0, y: 0 });
    };

    return (
        <div
            className="background-spectre z-10 relative"
            onMouseMove={handleMouseMove}
        >
            <Head title="Welcome" />
            <UserHeader auth={auth}/>
            <main className="w-full h-full overflow-hidden flex flex-col gap-[10vh]">
                <div className="background-mountain h-[80vh] overflow-hidden justify-center flex">
                    <div className="absolute w-[100%] h-[80vh] background-default "></div>
                    <div className="w-[40%] flex flex-col px-[2vw] py-[4vh]">
                        <div
                            className={`absolute top-[${dimensions.height * 0.5}px] right-[${
                                dimensions.width - dimensions.width * 0.305
                            }px]`}
                        >
                            <p className="px-[1vw] w-min bg-[#00010F] bg-opacity-30 rounded-[8px] text-white font-medium text-[3vh]">
                                Matricule
                            </p>
                            <p className="text-white font-bold text-[4vh] ml-[1vw]">
                                {data.spectre.matricule}
                            </p>
                        </div>
                        <div
                            className={`absolute top-[${dimensions.height * 0.65}px] right-[${
                                dimensions.width - dimensions.width * 0.355
                            }px]`}
                        >
                            <p className="px-[1vw] w-min bg-[#00010F] bg-opacity-30 rounded-[8px] text-white font-medium text-[3vh]">
                                Grade
                            </p>
                            <p className="text-white font-bold text-[4vh] ml-[1vw]">
                                {data.auth.roles[0]}
                            </p>
                        </div>
                        <div
                            className={`absolute top-[${dimensions.height * 0.8}px] right-[${
                                dimensions.width - dimensions.width * 0.325
                            }px]`}
                        >
                            <p className="px-[1vw] w-min bg-[#00010F] bg-opacity-30 rounded-[8px] text-white font-medium text-[3vh]">
                                Spécialité
                            </p>
                            <p className="text-white font-bold text-[4vh] ml-[1vw]">
                                {data.auth.roles[1]}
                            </p>
                        </div>
                    </div>
                    <div className="w-[20%] h-[80vh] overflow-hidden">
                        <img
                            src={auth.user.photo}
                            className=" object-cover h-[110vh] pt-[10vh]"
                            alt=""
                        />
                    </div>
                    <div className="w-[40%] flex flex-col gap-5 relative z-20 px-[2vw] py-[4vh]">
                        <div className="flex w-full justify-between gap-[2vw] items-end">
                            <div className="background-10 rounded-[40px] w-[40%] px-[2vw] py-[3vh] flex flex-col gap-5">
                                <p className=" font-bold text-white opacity-80 text-[2.5vh]">
                                    Nombre de vie
                                </p>
                                <div className="flex items-center justify-center gap-3">
                                    <div
                                        className={`text-[7vh] ${
                                            data.spectre.vie >= 3
                                                ? "vieActive"
                                                : "vieInactive"
                                        }`}
                                    >
                                        <i class="fa-solid fa-microchip"></i>
                                    </div>
                                    <div
                                        className={`text-[7vh] ${
                                            data.spectre.vie >= 2
                                                ? "vieActive"
                                                : "vieInactive"
                                        }`}
                                    >
                                        <i class="fa-solid fa-microchip"></i>
                                    </div>
                                    <div
                                        className={`text-[7vh] ${
                                            data.spectre.vie >= 1
                                                ? "vieActive"
                                                : "vieInactive"
                                        }`}
                                    >
                                        <i class="fa-solid fa-microchip"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="background-10 rounded-[40px] w-[60%] px-[2vw] py-[3vh] flex flex-col gap-[2vh]">
                                <p className=" font-bold text-white opacity-80 text-[2.5vh]">
                                    Points de Loyauté
                                </p>
                                <div className="flex flex-col">
                                    {data.spectre.loyauté >= 0 ? (
                                        <>
                                            <p className="text-[3vh] text-white font-bold">
                                                {data.spectre.loyauté}
                                            </p>
                                            <div className="h-[5vh] w-[100%] border-white border-1 overflow-hidden p-[3px] flex flex-col justify-end">
                                                <div
                                                    className={`bg-white h-full w-[${data.spectre.loyauté}%]`}
                                                ></div>
                                            </div>
                                            <div className="w-[100%] flex justify-between">
                                                <p className="text-white opacity-75">
                                                    0
                                                </p>
                                                <p className="text-white opacity-75">
                                                    100
                                                </p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-[3vh] text-red-600 font-bold">
                                                {data.spectre.loyauté}
                                            </p>
                                            <div className="h-[5vh] w-[100%] border-white border-1 overflow-hidden p-[3px] flex flex-col justify-end">
                                                <div
                                                    className={`bg-red-600 h-full w-[${-data
                                                        .spectre.loyauté}%]`}
                                                ></div>
                                            </div>
                                            <div className="w-[100%] flex justify-between">
                                                <p className="text-white opacity-75">
                                                    0
                                                </p>
                                                <p className="text-white opacity-75">
                                                    -100
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="background-10 rounded-[40px] px-[2vw] py-[3vh] flex flex-col gap-5 items-center">
                            <p className=" font-bold text-white opacity-80 text-[2.5vh]">
                                Médailles
                            </p>
                            <div className="flex flex-wrap gap-[2vh] justify-center">
                                {medals.map((medal) => (
                                    <div
                                        key={medal.id}
                                        className="flex flex-col items-center"
                                    >
                                        <div
                                            className={`medal-image active`}
                                            onMouseOver={(e) =>
                                                handleMouseOver(e, medal.name)
                                            }
                                            onMouseOut={handleMouseOut}
                                        >
                                            <img
                                                src={medal.image}
                                                alt={medal.name}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full overflow-hidden flex flex-col items-center px-[5vw] py-[5vh] gap-[5vh]">
                    <div className="w-[70%] h-[50vh]">
                        <div className="background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[20px] px-[2vw] py-[2vh] flex flex-col items-center gap-[1vh] justify-start relative w-full h-full">
                            <h3 className="text-white font-bold text-[2.5vh]">
                                Antécédents
                            </h3>
                            <div className="flex flex-col gap-[1.5vh] h-full w-full items-center">
                                <div className="w-full h-full">
                                    <div className="flex justify-around border-white border-b-1 mb-[2vh]">
                                        <p className="text-white font-bold w-[20%] text-center">
                                            ID
                                        </p>
                                        <p className="uppercase text-white font-bold w-[20%] text-center">
                                            Date
                                        </p>
                                        <p className="uppercase text-white font-bold w-[60%] text-center">
                                            Détails
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-3 overflow-y-scroll h-[35vh]">
                                        {data.antecedents.map(
                                            (antecedent, counter) => (
                                                <div
                                                    key={antecedent.id}
                                                    className="flex text-warp h-[20vh]"
                                                >
                                                    <p className="text-white opacity-50 w-[20%] text-center">
                                                        {counter + 1}
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
                            </div>
                        </div>
                    </div>
                    <div className="w-[70%] h-[40vh] flex justify-between">
                        <div className="w-[45%] background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[20px] px-[2vw] py-[4vh] flex flex-col items-center gap-[3vh] justify-around relative h-full">
                            <h3 className="text-white font-bold text-[2.5vh] opacity-80">Signaler une absence</h3>
                            <p className="text-white font-normal">Unité S.P.E.C.T.R.E. ! Vous avez l’obligation de signaler lorsque vous êtes absent ! Sachez qu’une absence non signalée entrainera des sanctions !</p>
                            <button className="ms-4 bg-gradient-to-br from-[#5E7F8C] to-[#314E59] text-white font-bold rounded-[15px] text-[3vh] h-[6vh] w-[50%]"
                            onClick={() => Inertia.visit(route('absenceView'))}
                            >
                                SIGNALER
                            </button>
                        </div>
                        <div className="w-[45%] background-blue shadow-[0_4px_4px_0_#5E7F8C] rounded-[20px] px-[2vw] py-[4vh] flex flex-col items-center gap-[3vh] justify-around relative h-full">
                            <h3 className="text-white font-bold text-[2.5vh] opacity-80">Base de donnée</h3>
                            <p className="text-white font-normal">Le personnel des installations n’est pas toujours exemplaire. De ce fait, des fiches sont faits sur ces personnels.</p>
                            <button className="ms-4 bg-gradient-to-br from-[#5E7F8C] to-[#314E59] text-white font-bold rounded-[15px] text-[3vh] h-[6vh] w-[50%]"
                            onClick={() => Inertia.visit(route('BDDList'))}
                            >
                                CONSULTER
                            </button>
                        </div>
                    </div>
                    <div className="h-[15vh]"></div>
                </div>

                <div className="flex absolute top-0 z-0 left-0 justify-center items-center h-screen">
                    <Stage width={dimensions.width} height={dimensions.height}>
                        <Layer>
                            {lines.map((line, index) => (
                                <Line
                                    key={index}
                                    points={line.points}
                                    stroke="#FFFFFF"
                                    strokeWidth={2}
                                    opacity={0.5}
                                    lineCap="round"
                                    lineJoin="round"
                                />
                            ))}
                            {circles.map((circle) => (
                                <>
                                    <Circle
                                        key={circle.id + "-a"}
                                        x={circle.x}
                                        y={circle.y}
                                        radius={circle.radius + 10}
                                        stroke={circle.color}
                                    />
                                    <Circle
                                        key={circle.id + "-b"}
                                        x={circle.x}
                                        y={circle.y}
                                        radius={circle.radius}
                                        fill={circle.color}
                                    />
                                </>
                            ))}
                        </Layer>
                    </Stage>
                </div>
            </main>
            {tooltip.visible && (
                <div
                    className="absolute background-tooltip text-white p-2 rounded-md pointer-events-none"
                    style={{
                        top: tooltip.y + 10,
                        left: tooltip.x + 10,
                        zIndex: 1000,
                    }}
                >
                    <p>{tooltip.name}</p>
                </div>
            )}
        </div>
    );
}
