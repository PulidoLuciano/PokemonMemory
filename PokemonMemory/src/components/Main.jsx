import { useState } from "react"
import Card from "./Card";

export default function Main(){
    
    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState(0);
    
    return(
        <main>
            <section id="cards-section">
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
            </section>
            <section id="score-section">
                <h2>Score: {score}</h2>
                <h2>Max score: {maxScore}</h2>
            </section>
        </main>
    )
}