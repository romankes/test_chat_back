export namespace Auth {
  type BaseBody = {
    user: {
      email: string;
      password: string;
    };
  };

  export type SignInBody = BaseBody;
  export type SignUpBody = BaseBody;
}
