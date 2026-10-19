import { useEffect, useState } from "react";
import Greetings from "../components/Greetings";

const STORAGE_KEY = "gtres-user-name";

function Home() {
    const [user, setUser] = useState(() => {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        return saved || "Visitante";
    });

    useEffect(() => {
        const saved = sessionStorage.getItem(STORAGE_KEY);

        if (saved) {
            setUser(saved);
            return;
        }

        const nome = window.prompt("Qual o seu nome?");
        const name = nome && nome.trim() ? nome.trim() : "Visitante";

        sessionStorage.setItem(STORAGE_KEY, name);
        setUser(name);
    }, []);

    return (
        <Greetings nome={user} />
    );
}

export default Home;
