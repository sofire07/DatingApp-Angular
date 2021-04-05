import { Photo } from '../.models/photo';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    photoUrl: string;
    email: string;
    phoneNumber: string;
    age: number;
    doB: Date;
    knownAs: string;
    created: Date;
    lastActive: Date;
    gender: string;
    introduction: string;
    lookingFor: string;
    interests: string;
    city: string;
    state: string;
    photos: Photo[];
    roles: string[];
}
