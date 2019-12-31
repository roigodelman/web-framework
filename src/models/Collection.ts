
import {Eventing} from './Eventing'
import axios, {AxiosResponse} from 'axios';



export class Collection<T,K>{
    models: T[] = []
    events: Eventing = new Eventing();

    constructor(
        private rootUrl:string,
        private deserialize: (json: K) => T
        ){}

    get on(){
        return this.events.on;
    }
    get trigger(){
        return this.events.trigger;
    }

    fetch() : void {
        axios.get(this.rootUrl)
            .then((respones : AxiosResponse) =>{
                respones.data.forEach((value : K) => {
                    this.models.push(this.deserialize(value));
                });   
                
                this.trigger('change');
            });
    }
    
}