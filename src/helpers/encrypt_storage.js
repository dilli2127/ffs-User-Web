import SecureLS from 'secure-ls';

const secretKey = 'P@ssKey!@#$';

export function setItem(key, data) {
  try {
    new SecureLS({encodingType: 'aes', encryptionSecret: secretKey}).set(
      key,
      data,
    );
  } catch (e) {
    return e;
  }
}

export function getItem(key) {
  try {
    return new SecureLS({encodingType: 'aes', encryptionSecret: secretKey}).get(
      key,
    );
  } catch (e) {
    return e;
  }
}
