import {useContext} from 'react'
import {Link} from "react-router-dom"
import { useHistory } from "react-router-dom";
import ilustrationImg from "../assets/images/illustration2.svg";
import logoImg from "../assets/images/logo2.svg";
import googleIconImg from "../assets/images/google-icon.svg"
import '../styles/auth.scss';
import { Button } from "../components/Button";
import { AuthContext } from '../App';

export function Home(){

    const {user, signInWIthGoogle} = useContext(AuthContext)

    const history = useHistory() // const para armazenar valor de useHistory e fazer ligamento das rotas

    // Criação do botão de acesso com o google 
    async function handleCreateRoom (){
        if(!user){
            await signInWIthGoogle()
        }

            history.push('/rooms/new') // mandar as rotas para o botão
 
    }


    return(
        <div id="page-auth" >
            <aside>
                <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas e Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <Button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do google" />
                        Crie sua sala com o google  
                    </Button>
                    <div className="separator">Ou entre em uma sala</div>
                    <form action="">
                        <input
                        type="text" 
                        placeholder="Digite o código da sala"
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}