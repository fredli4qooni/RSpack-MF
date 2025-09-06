
    export type RemoteKeys = 'mfe1/CounterOne';
    type PackageType<T> = T extends 'mfe1/CounterOne' ? typeof import('mfe1/CounterOne') :any;