import { Image } from "./image.model";
import { Modele } from "./modele.model";
export class Voiture {
    idVoiture! : number;
    nomVoiture! : string;
    prixVoiture! : number;
    dateCreation! : Date ;
    modele! : Modele;
    image !: Image;
    }