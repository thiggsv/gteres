
import { useState } from "react";
import Greetings from "../components/Greetings";

function Home() {
const [visitorName, setVisitorName] = useState('');
    return (
        <>
        <div className="name-form">
            <label htmlFor="name">Quem és tu?:</label>
            <input 
            type="text" 
            id="visitor-name"
            placeholder="Digite seu nome"
            onChange={(evento) => setVisitorName(evento.target.value)}
            />
        </div>
        <Greetings nome={visitorName || "Visitante"} />
        </>

);
}
 export default Home; 