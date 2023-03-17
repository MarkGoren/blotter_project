import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class CryptoService {
  private key = CryptoJS.enc.Hex.parse(process.env.AES_KEY);
  private iv = CryptoJS.enc.Hex.parse(process.env.AES_IV);

  async encryptUserId(userId: number): Promise<string> {
    const cypherText = await CryptoJS.AES.encrypt(userId.toString(), this.key, {
      iv: this.iv,
    });
    return cypherText.toString();
  }

  async decryptUserId(cypherText: string): Promise<number> {
    const bytes = await CryptoJS.AES.decrypt(cypherText, this.key, {
      iv: this.iv,
    });
    return parseInt(bytes.toString(CryptoJS.enc.Utf8));
  }
}
