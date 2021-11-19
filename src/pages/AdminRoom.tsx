import {useParams, useHistory} from 'react-router-dom';



import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import {Question} from '../components/Question'

import {useRoom} from '../hooks/useRoom'

import {database} from '../services/firebase'

import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'
import deleteImg from '../assets/images/delete.svg'
import logoImg from '../assets/images/logo2.svg'

import '../styles/room.scss'
import '../styles/global.scss'
// import { FormEvent, useState } from 'react';
// import { useAuth } from '../hooks/useAuth';
// import { database } from '../services/firebase';

type RoomParams = {
    id:string;
}




export function AdminRoom(){

    // parâmetro da página armazenado na var
    // const {user} = useAuth()

    // const [newQuestion,setnewQuestion ] = useState('')

    const history = useHistory()

    const params = useParams<RoomParams>();

    const roomId = params.id
    
    const {title , questions} = useRoom(roomId)

    // deletar a sala
    async function handleEndRoom(){
        await database.ref(`/rooms/${roomId}`).update({
            endedAt: new Date(), // atual
        })

        history.push(`/`)
    };

    // deletar a questão
    async function handleDeleteQuestion(questionId: string){
        if(window.confirm("Você tem certeza que deseja deletar essa pergunta?")){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        };

    };

    async function handleCheckQuestionAsAnswered(questionId: string){
       await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });
    
    };
    
    async function handleHighLightQuestion(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        });
    };

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
                    </div>
                </div>
            </header>
            <main >

                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {  questions.length > 0 && <span>{questions.length} Pergunta(s)</span>}
                </div>

                <div className="question-list">
                {questions.map(question => {
                        return(
                            <Question
                            key={question.id}
                            content={question.content}                                
                            author={question.author}  
                            isAnswered={question.isAnswered}                              
                            isHighlighted={question.isHighlighted}                              
                            >
                                {/* conceito de fragment */}
                            {!question.isAnswered &&(
                                    <> 
                                        <button
                                            type="button"
                                            onClick={()=> handleCheckQuestionAsAnswered(question.id)}
                                        >
                                            <img src={checkImg} alt="Marcar pergunta como respondida." />
                                        </button>
                                
                                        <button
                                            type="button"
                                            onClick={()=> handleHighLightQuestion(question.id)}
                                        >
                                            <img src={answerImg} alt="Dar destaque a pergunta." />
                                
                                        </button>
                                    </>
                                )}

                                <button
                                 type="button"
                                 onClick={()=> handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>

                            </Question>                           
                        );
                    })}    
                </div>
            </main>
        </div>
        );
};