import { UserLoggedIn } from "./user-logged-in";


export class UserParams{
    gender: string;
    minAge = 18;
    maxAge = 99;
    CurrentPage = 1;
    PageSize = 8;
    orderBy = 'lastActive';

    constructor(user: UserLoggedIn) {
        if(user.gender == "female" || user.gender == "Female") this.gender = 'male';
        if(user.gender == 'male' || user.gender == "Male") this.gender = 'female';
    }
}