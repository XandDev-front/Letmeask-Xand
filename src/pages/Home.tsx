import { FormEvent, useState } from "react";

import { useHistory } from "react-router-dom";

import ilustrationImg from "../assets/images/illustration2.svg";
import logoImg from "../assets/images/logo2.svg";
import googleIconImg from "../assets/images/google-icon.svg"

import '../styles/auth.scss';

import { Button } from "../components/Button";

import { database } from "../services/firebase";

import {useAuth} from '../hooks/useAuth';




export function Home(){

    const history = useHistory(); // const para armazenar valor de useHistory e fazer ligamento das rotas
    const {user, signInWIthGoogle} = useAuth();
    const [roomCode , setRoomCode] = useState('');

    // Criação do botão de acesso com o google 
    async function handleCreateRoom (){
        if(!user){
            await signInWIthGoogle()
        }

            history.push('/rooms/new') // mandar as rotas para o botão
 
    };

    async function handleJoinRoom(event : FormEvent){
        event.preventDefault();

        if(roomCode.trim() === ''){
            return;
        };

        const roomRef = await database.ref(`rooms/${roomCode}`).get(); // procurar a sala que foi digitada no banco de dados

        if(!roomRef.exists()){
            alert('A sala não existe!')
            return;
        };

        if(roomRef.val().endedAt){
            alert('Essa sala foi fechada!')
            return;
        };

        history.push(`rooms/${roomCode}`);

    };

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
                    <form onSubmit={handleJoinRoom}>
                        <input
                        type="text" 
                        placeholder="Digite o código da sala"
                        onChange = {event => setRoomCode(event.target.value)}
                        value = {roomCode}
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