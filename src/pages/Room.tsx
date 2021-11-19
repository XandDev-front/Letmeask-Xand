import {useParams} from 'react-router-dom';
import logoImg from '../assets/images/logo2.svg'
import { Button } from '../components/Button';
import '../styles/room.scss'
import '../styles/global.scss'
import { RoomCode } from '../components/RoomCode';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';


type RoomParams = {
    id:string;
}
type FirebaseQuestions = Record<string, {
    author:{
        name:string;
        avatar:string;
    }
    content:string;
    isAnswered:boolean;
    isHighlighted:boolean;
    
}>

type Question = {
    id:string;
    author:{
        name:string;
        avatar:string;
    }
    content:string;
    isAnswered:boolean;
    isHighlighted:boolean;
}

export function Room(){
    // parâmetro da página armazenado na var
    const {user} = useAuth()
    const params = useParams<RoomParams>();
    const roomId = params.id

    const [questions, setQuestions] = useState<Question[]>([]); 

    const [newQuestion,setnewQuestion ] = useState('')

    const [title,setTitle ] = useState('')

    useEffect(()=> {

      const roomRef = database.ref(`rooms/${roomId}`);
      
      roomRef.on('value', room => { // pegar o valor das perguntas e guardar
          const databaseRoom = room.val();
          const firebaseQuestions : FirebaseQuestions = databaseRoom.questions ?? {}; 
          const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) =>{
              return{
                  id:key,
                  content: value.content,
                  author: value.author,
                  isHighlighted: value.isHighlighted,
                  isAnswered: value.isAnswered,
              };
          })

          setTitle(databaseRoom.title);
          setQuestions(parsedQuestions);

      });
    }, [roomId]);


    async function handleSendQuestion(event: FormEvent){
        event.preventDefault()

        if(newQuestion.trim() === ''){
            return;
        };

        if(!user){
            throw new Error('you must be logged in')
        };

        const question = {
            content:newQuestion,
            author:{
                name:user?.name,
                avatar:user.avatar,
            },
            isHighLighted:false,
            isAnswered:false
        };

       await database.ref(`rooms/${roomId}/questions`).push(question);

       setnewQuestion('');
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <RoomCode code={roomId}/>
                </div>
            </header>
            <main >

                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {  questions.length > 0 && <span>{questions.length} Pergunta(s)</span>}
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea 
                      placeholder="O que você quer perguntar?"
                      onChange={event => setnewQuestion(event.target.value)}
                      value={newQuestion}
                    />
                    <div className="form-footer">
                    
                        {
                        user ? 
                            (<div className="user-info">
                                <img src={user.avatar} alt={user.name}/>
                                <span>{user.name}</span>
                            </div>)
                        :
                        
                        (<span>Para enviar uma pergunta, <button> faça seu login.</button></span>)
                        }
                    
                        <Button type="submit" disabled={!user}>Enviar Pergunta</Button>
                    </div>
                </form>
                {JSON.stringify(questions)}
            </main>
        </div>
        );
};