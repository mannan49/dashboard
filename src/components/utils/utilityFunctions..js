export function formatPhoneNumber(phoneNumber) {
    if (!phoneNumber || phoneNumber.length !== 11) {
      return phoneNumber;
    }
    return `${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4)}`;
  }