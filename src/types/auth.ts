export interface JwtPayload {
  user_id: string;
  name: string;
  email: string;
  roles: string[];
  exp: number;
  iat: number;
  nbf: number;
  iss: string;
}
