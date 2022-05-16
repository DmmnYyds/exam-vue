// 公共的方法
import { JSEncrypt } from "jsencrypt";

export const encrypt = function (val) {
  var encryptor = new JSEncrypt(); // 创建加密对象实例
  let publicKey = `-----BEGIN PUBLIC KEY-----
      MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCnZIdkAWLgkux1eMT1mSwyOb7V
      uTtfDYMepItVxy6IhZNT1mSLZ0Ab4b2FvJ7JQmkDEG38l9JcFYY9f61tNPaEZWfl
      FwoIC+vbjhQq8mvv6dYN1uWTpEeQ4L1JEj8Zm/kKLM2prOi5qnN5A1rVgQ5HmB5l
      /9AAyN2x4vdqegRNFQIDAQAB
      -----END PUBLIC KEY-----`; //服务端提供的
  encryptor.setPublicKey(publicKey); //设置公钥
  return encryptor.encrypt(val); // 对内容进行加密
};


