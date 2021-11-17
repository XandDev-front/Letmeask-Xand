import { createContext, useState } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import {firebase, auth} from "./services/firebase"




// tipagem para evitar bugs
type UserType = {
  id:string;
  name:string;
  avatar:string;
}

type AuthContextType = {
  user: UserType | undefined;
  signInWIthGoogle: ()=> Promise<void>;
}

// const para pegar valor de createContext
// as AuthContextType para dizer que os dados são dessa tipagem
export const AuthContext = createContext({} as AuthContextType);


function App() {



  // useState para mudar o valor de user e <UserType> para especificar o tipo do user
  const [user, setUser] = useState<UserType>();




    //TODA FUNÇÃO ASYNCRONA RETORNA UMA PROMISE
  // função de autenticação de usuário
  async function signInWIthGoogle(){ // método async

    // const para pegar o dados de autenticação do usuário pelo google
    const provider = new firebase.auth.GoogleAuthProvider();

    // fazer autenticação com o google
    const result = await auth.signInWithPopup(provider); // método await

    
        if(result.user){ // se for retornado um usuário
          const {displayName, photoURL, uid} = result.user // pegar dados do usuário

          if(!displayName || !photoURL){ // se o usuário não tiver foto ou nome
            throw new Error('Missing Information from Google Account.') // dispare um erro
          }

          setUser({
            id: uid,
            name:displayName,
            avatar:photoURL
      })
    };
};

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user , signInWIthGoogle }}> 
        <Route path="/" exact component={Home}/>
        <Route path="/rooms/new" component={NewRoom}/>
      </AuthContext.Provider>
    </BrowserRouter>
    );
}

export default App;
