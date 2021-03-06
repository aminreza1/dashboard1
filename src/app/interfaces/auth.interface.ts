export interface LoginDto {
    username: string;
    password: string;
  }
  export interface VerifyDto {
    token: string;
  }
  export interface TokenDto {
    token: string;
    user:UserDto;
    lifeMinutes: number;
  }

  export interface UserDto {
    id:number;
    mobile:string;
    username:string;
    last_name:string;
    first_name:string;
    avatar:string;
  }

  export interface UserUpdateDto {
    last_name:string;
    first_name:string;
    avatar:File | null;
  }

  