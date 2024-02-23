import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore/lite';
const execSync = require('child_process').execSync;



// Enum for log levels
export enum LogLevel {
    INFO = "info",
    DEBUG = "debug",
    WARNING = "warning",
    ERROR = "error"
}

// Add this to the logging
export enum Event {
    ASSISTANCE_REQUEST = "assistance_request",
    CONCEPTUAL_MUTANT = "conceptual_mutant",
    THOROUGHNESS_MUTANT = "thoroughness_mutant",
    HALP_RESULT = "halp_result",
    FORGE_RUN_RESULT = "forge_run_result",
    FORGE_RUN = "forge_run",
    FILE_DOWNLOAD = "file_download",
    AMBIGUOUS_TEST =   "ambiguous_test"
}

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
 
    payload(payload: any, loglevel: LogLevel, event: Event)
    {
        return {
            user: this.user,
            content: payload,
            timestamp: Date.now(),
            loglevel: loglevel,
            event : event
        }
    }


    async log_payload(payload: any, loglevel: LogLevel, event: Event) {
        let p = this.payload(payload, loglevel, event);
        let log = doc(this.log_target);
        try {
            // TODO: Uncomment
           // await setDoc(log, p);
        } catch (error) {
            console.error("Log failure ", error);
        }
    }
  }
