export interface UserLoginResponse{
    Status:boolean,
    accessToken?:string,
    refreshToken?:string,
    korisnikID?:number,
    tipKorisnika?:string
}