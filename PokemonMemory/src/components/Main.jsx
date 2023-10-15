import { useEffect, useState } from "react"
import Card from "./Card";

export default function Main(){
    
    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState(0);
    const [pokemon, setPokemon] = useState([]);
    
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokedex/2").then(res => res.json())
        .then(data => {
            setPokemon(data.pokemon_entries.slice(0,8));
        });    
    }, []);

    function handleCardClick(){
        let newScore = score + 1;
        setScore(newScore);
    }

    return(
        <main>
            <section id="cards-section">
                {
                    pokemon.map(poke => <Card handleClick={handleCardClick} pokemon={poke.pokemon_species} key={poke.entry_number}></Card>)
                }
            </section>
            <section id="score-section">
                <h2>Score: {score}</h2>
                <h2>Max score: {maxScore}</h2>
            </section>
        </main>
    )
}