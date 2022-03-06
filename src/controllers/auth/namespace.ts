export namespace Auth {
  export type SignInBody = {
    email: string;
    password: string;
  };
  export type SignInRes = {
    token: string;
  };

  export type SignUpBody = {
    email: string;
    password: string;
  };
  export type SignUpRes = {
    token: string;
  };
}
