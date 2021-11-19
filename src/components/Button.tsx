import {ButtonHTMLAttributes} from 'react'; // importamos uma propriedade do próprio react
import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes <HTMLButtonElement> & {
    isOutlined?: boolean
}; // dizer que o tipo do botão é um elemento html

export function Button({isOutlined = false , ...props}: ButtonProps){
    return(
        <button
         className={`button ${isOutlined ? 'outlined' : ''}`}
         {...props}
          />

        

        
    );
};

