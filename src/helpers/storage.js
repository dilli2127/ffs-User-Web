import { encryptData, decryptData } from "@helpers/crypto";

const salt =
  process.env.REACT_APP_SALT || "6d090796-ecdf-11ea-adc1-234565112345";

export function useStorageItem(key) {
  let item = null;
  let storageValue = localStorage.getItem(key);
  try {
    item = JSON.parse(storageValue);
  } catch (e) {
    item = storageValue;
  }
  return item !== null ? item : {};
}

export function storeItem(key, data) {
  let value = JSON.stringify(data);
  let encryptedKey = window.btoa(key);
  let encryptedValue = encryptData(value, salt);
  window.localStorage.setItem(encryptedKey, encryptedValue);
  window.dispatchEvent(new Event(`${key}`));
}

export function retrieveItem(key) {
  try {
    let encryptedKey = window.btoa(key);
    let value = window.localStorage.getItem(encryptedKey);
    const decryptedValue = decryptData(value, salt);
    return JSON.parse(decryptedValue);
  } catch (e) {
    return null;
  }
}

export function clearLocalStorage() {
  try {
    window.localStorage.clear();
  } catch (e) {
    return;
  }
}
