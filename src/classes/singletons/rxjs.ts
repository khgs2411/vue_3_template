import {Subject, AsyncSubject, BehaviorSubject, ReplaySubject, Subscription} from "rxjs";
import {IRxjsPayload} from "@/interfaces/IRxjsPayload";

class RxjsInstance {
    subscriptions = new Subscription();
    subject: any;

    constructor(subjectType: string) {
        switch (subjectType) {
            case 'subject':
                this.subject = new Subject();
                break;
            case 'asyncSubject':
                this.subject = new AsyncSubject();
                break;
            case 'behaviorSubject':
                this.subject = new BehaviorSubject(null);
                break;
            case 'replaySubject':
                this.subject = new ReplaySubject();
                break;
        }
    }

    next(data: never): void {
        this.subject.next(data);
    }

    asObservable() {
        return this.subject.asObservable();
    }

    set add(subscription: Subscription) {
        this.subscriptions.add(subscription);
    }

    subscribe(callback: Function): Subscription {
        if (typeof callback !== 'function') {
            throw 'Failed to subscribe. Please provide a callback function'
        }
        let subscriber = this.asObservable().subscribe((payload: IRxjsPayload) => {
            if (payload === null || payload === undefined || !payload.hasOwnProperty('cta')) return;
            callback(payload)
        });
        this.subscriptions.add(subscriber)
        return subscriber;
    }

    unsubscribe() {
        this.subscriptions.unsubscribe();
    }
}

export class Rxjs {
    private static _instance: Rxjs

    public static getInstance = (): Rxjs => {
        if (!Rxjs._instance) Rxjs._instance = new Rxjs();
        return Rxjs._instance;
    }
    create = (subjectType: string, key: string) => {
        // @ts-ignore //
        this[key] = new RxjsInstance(subjectType)
    }

    registerGlobalNamespaces(): void {
        // register global namespaces here
    }
}