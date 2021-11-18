import {createContext , ReactNode , useState, useEffect} from 'react';
import {auth, firebase} from "../services/firebase"


// tipagem para evitar bugs
type UserType = {
    id:string;
    name:string;
    avatar:string;
  };
  
  type AuthContextType = {
    user: UserType | undefined;
    signInWIthGoogle: ()=> Promise<void>;
  };
  
  type AuthContextProviderProps = {
    children:ReactNode;
  };

// const para pegar valor de createContext
// as AuthContextType para dizer que os dados são dessa tipagem
export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps){
// useState para mudar o valor de user e <UserType> para especificar o tipo do user
const [user, setUser] = useState<UserType>();



// função vai ficar procurando lá no firebase se já existia algum login por aquele user
useEffect(()=>{
  // procurando mudanças
  const unSubscribe = auth.onAuthStateChanged(user =>{

    if(user){
        const {displayName, photoURL, uid} = user 

        if(!displayName || !photoURL){ 
          throw new Error('Missing Information from Google Account.') 
        };

        setUser({
          id: uid,
          name:displayName,
          avatar:photoURL
        });
   
    };  
});

return ()=> unSubscribe();

}, []);


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

  // retorno do authcontext 
    return(
        <AuthContext.Provider value={{ user , signInWIthGoogle }}> 
            {props.children}
        </AuthContext.Provider>

    );
}