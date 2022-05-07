import nacl from "tweetnacl";
import bs58 from "bs58";

export class PDLUError extends Error{
  constructor(message?: string){
    super(message)
  }
}

const textDecoder = new TextDecoder("utf-8");
export interface PhantomErrorResponse {
  errorCode: string
  errorMessage: string
}

export const buildProviderMethodUrl = (method: string, version: string = 'v1') =>
  `https://phantom.app/ul/${version}/${method}`

  
 export const decryptPayload = (data: string, nonce: string, sharedSecret?: Uint8Array) => {
  if (!sharedSecret) throw new Error("missing shared secret");

  const decryptedData = nacl.box.open.after(bs58.decode(data), bs58.decode(nonce), sharedSecret);
  if (!decryptedData) {
    throw new Error("Unable to decrypt data");
  }
  return JSON.parse(Buffer.from(decryptedData).toString("utf8"));
};

export const encryptPayload = (payload: any, sharedSecret?: Uint8Array) => {
  if (!sharedSecret) throw new Error("missing shared secret");

  const nonce = nacl.randomBytes(24);

  const encryptedPayload = nacl.box.after(
    Buffer.from(JSON.stringify(payload)),
    nonce,
    sharedSecret
  );

  return [nonce, encryptedPayload];
};