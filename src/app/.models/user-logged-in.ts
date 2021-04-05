import {Photo} from '../.models/photo';
export interface UserLoggedIn {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    phoneNumber: string;
    photoUrl: string;
    token: string;
    tokenExpires: string;
    doB: Date;
    age: number;
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
