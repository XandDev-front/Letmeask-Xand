import {ButtonHTMLAttributes} from 'react'; // importamos uma propriedade do próprio react
import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes <HTMLButtonElement>; // dizer que o tipo do botão é um elemento html

export function Button(props: ButtonProps){
    return(
        <button className="button" {...props}>

        </button>

        
    );
};

