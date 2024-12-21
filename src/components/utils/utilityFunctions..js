export function formatPhoneNumber(phoneNumber) {
    if (!phoneNumber || phoneNumber.length !== 11) {
      return phoneNumber;
    }
    return `${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4)}`;
  }

export function getOrdinal(number) {
    const suffixes = ["th", "st", "nd", "rd"];
    const value = number % 100;
    return number + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
}