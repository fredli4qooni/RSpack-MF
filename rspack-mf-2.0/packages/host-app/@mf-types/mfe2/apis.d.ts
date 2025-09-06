
    export type RemoteKeys = 'mfe2/CounterTwo';
    type PackageType<T> = T extends 'mfe2/CounterTwo' ? typeof import('mfe2/CounterTwo') :any;