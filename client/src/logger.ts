import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore/lite';

import config from "./logging_config.json";

export class Logger {



    user; app; db; log_target;

    constructor(userid: string)
    {
        this.user = userid;

        this.app = initializeApp(config);
        this.db = getFirestore(this.app)
        this.log_target = collection(this.db, config.collectionName);
    }
 
    payload(payload: any, fn : string, loglevel: string)
    {
        return {
            user: this.user,
            filename: fn,
            content: payload,
            timestamp: Date.now(),
            loglevel: loglevel
        }
    }

    async info(payload: any, fn : string)
    {
        let p = this.payload(payload, fn, "info");

        let log = doc(this.log_target);
        await setDoc(log, p);
    }
  }
