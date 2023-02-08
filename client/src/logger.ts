import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore/lite';
const execSync = require('child_process').execSync;

        // I would also like to get the Forge lang version here.


import config from "./logging_config.json";

export class Logger {

    user; app; db; log_target; version;

    constructor(userid: string)
    {
        let v = null;
        try
        {
            v = execSync('raco pkg show --full-checksum forge');
        }
        catch {}

        this.version = (v != null && v.length > 0) ? 
                            new TextDecoder().decode(v) : "unknown";

        this.user = userid;
        this.app = initializeApp(config);
        this.db = getFirestore(this.app)
        this.log_target = collection(this.db, config.collectionName);
    }
 
    payload(payload: any, loglevel: string)
    {
        return {
            user: this.user,
            content: payload,
            timestamp: Date.now(),
            loglevel: loglevel
        }
    }

    async info(payload: any)
    {
        let p = this.payload(payload, "info");
        let log = doc(this.log_target);
        var res = await setDoc(log, p);
    }
  }
