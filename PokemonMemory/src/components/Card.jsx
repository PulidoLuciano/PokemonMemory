import { useEffect, useState } from "react"

function getStyle(type){
    console.log(type);
    switch(type){
        case "normal":
            return {backgroundColor: "#A8A090aa", border: "#A8A090 5px solid"}
        case "grass":
            return {backgroundColor: "#78C850aa", border: "#78C850 5px solid"}
        case "fire":
            return {backgroundColor: "#F05030aa", border: "#F05030 5px solid"}
        case "water":
            return {backgroundColor: "#3899F8aa", border: "#3899F8 5px solid"}
        case "steel":
            return {backgroundColor: "#A8A8C0aa", border: "#A8A8C0 5px solid"}
        case "bug":
            return {backgroundColor: "#A8B820aa", border: "#A8B820 5px solid"}
        case "dragon":
            return {backgroundColor: "#7860E0aa", border: "#7860E0 5px solid"}
        case "electric":
            return {backgroundColor: "#F8D030aa", border: "#F8D030 5px solid"}
        case "ghost":
            return {backgroundColor: "#6060B0aa", border: "#6060B0 5px solid"}
        case "fairy":
            return {backgroundColor: "#E79FE7aa", border: "#E79FE7 5px solid"}
        case "ice":
            return {backgroundColor: "#58C8E0aa", border: "#58C8E0 5px solid"}
        case "fight":
            return {backgroundColor: "#A05038aa", border: "#A05038 5px solid"}
        case "psychic":
            return {backgroundColor: "#F870A0aa", border: "#F870A0 5px solid"}
        case "rock":
            return {backgroundColor: "#B8A058aa", border: "#B8A058 5px solid"}
        case "dark":
            return {backgroundColor: "#7A5848aa", border: "#7A5848 5px solid"}
        case "ground":
            return {backgroundColor: "#E9D6A4aa", border: "#E9D6A4 5px solid"}
        case "poison":
            return {backgroundColor: "#B058A0aa", border: "#B058A0 5px solid"}
        case "flight":
            return {backgroundColor: "#98A8F0aa", border: "#98A8F0 5px solid"}
        default:
            return {backgroundColor: "#A8A090aa", border: "#A8A090 5px solid"}
    }
}

export default function Card({pokemon, handleClick}){
    
    const [data, setData] = useState({sprites: {front_default: null}, types:[{type: {name:null}}]});

    const cardStyle = getStyle(data.types[0].type.name);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(res => res.json()).then(info => setData(info));
    }, [])

    return(
        <button className="pokemon-card" onClick={handleClick} style={cardStyle}>
            <img src={data.sprites.front_default} alt={pokemon.name}/>
            <h2>{pokemon.name.toUpperCase()}</h2>
        </button>
    )
}