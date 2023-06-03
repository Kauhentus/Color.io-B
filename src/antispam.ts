import config from './config.json';

const highValueCommands = [
    'palette',
    'view', 
];

const lowValueCommands = [
    'convert',
    'about',
    'help'
];

export class Antispam {
    userCooldowns: Map<string, number>

    constructor() {
        this.userCooldowns = new Map();
    }

    // Returns true if user is spamming, false if not
    test(userID : string, command : string){
        if(!this.userCooldowns.has(userID)) {
            this.reset(userID);
            return false;
        }

        const elapsedTime : number = new Date().getTime() - (this.userCooldowns.get(userID) || 0);

        if(highValueCommands.indexOf(command) != -1){
            if(elapsedTime > config.millisHighValueCommand){
                this.reset(userID);
                return false;
            } else {
                return true;
            }
        }
        
        else if(lowValueCommands.indexOf(command) != -1){
            if(elapsedTime > config.millisLowValueCommand){
                this.reset(userID);
            } else {
                return true;
            }
        } 

        return false;
    }

    // Resets cooldown of user spam timer
    reset(userID : string){
        this.userCooldowns.set(userID, new Date().getTime());
    }
}