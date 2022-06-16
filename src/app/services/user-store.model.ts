import { UserDto } from "../interfaces/auth.interface";

export class UserStoreModel {
    constructor(
      public user: UserDto,
      private _token: string,
      private _tokenExpirationDate: Date
    ) {}
  
    get token() {
      if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate)
        return null;
      return this._token;
    }
  
    get isAuth() : boolean{
      return !!this._token;
    }
  }
  