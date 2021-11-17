import {Link} from "react-router-dom"
import '../styles/auth.scss';
import { Button } from '../components/Button';
import ilustrationImg from "../assets/images/illustration2.svg";
import logoImg from "../assets/images/logo2.svg";
import { useContext } from "react";
import { AuthContext } from "../App";



export function NewRoom(){

    const {user} = useContext(AuthContext);

    return(
        <div id="page-auth" >
            <aside>
                <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas e Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <div className="main-title">
                        <h1>Olá, { user?.name}</h1>
                    </div>
                        <img src={logoImg} alt="Letmeask" />
                        <h2>Criar uma nova sala</h2>

                        <form action="">
                            <input
                            type="text" 
                            placeholder="Digite o código da sala"
                            />
                            <Button type="submit">
                            Criar sala
                            </Button>
                        </form>
                    <p>Quer entrar em uma sala existente?<Link to="/"> Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}