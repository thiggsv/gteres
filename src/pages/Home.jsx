import Greetings from "../components/Greetings";

const user = window.prompt("Qual o seu nome?") || "Visitante";

function Home() {
    return (
        <Greetings nome={user} />
    );
}
export default Home;
