export namespace Chat {
  export type ReqCreateMessage = {
    message: {
      image?: string;
      text?: string;
      file: string;
    };
    id: string;
  };
}
