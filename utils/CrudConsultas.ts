import {Consulta} from "../types/Consulta";

export const getAllConsultas = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: any = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    const res = await fetch(
        "https://guarded-caverns-69109.herokuapp.com/api/consultas?include=consultorio.medico",
        requestOptions
    );

    if (res.ok) return res.json();
    else return {error: res.statusText};
}

export const changePrioridad = async ( id: string, prioridad: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: any = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify({prioridad: prioridad})
    };

    const res = await fetch(
        `https://guarded-caverns-69109.herokuapp.com/api/consultas/${id}/prioridad`,
        requestOptions
    );

    if (res.ok) return res.json();
    else return {error: res.statusText};
}

