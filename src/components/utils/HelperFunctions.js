export function extractSeatNumber(seatString) {
  const parts = seatString.split("-");
  return parts[1];
}

export function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function getCityShortForm(cityName) {
  const cityShortForms = {
    Lahore: "LHR",
    Islamabad: "ISB",
    Karachi: "KHI",
    Faisalabad: "FSD",
    Multan: "MUX",
    Peshawar: "PEW",
    Quetta: "UET",
    Rawalpindi: "RWP",
    Sialkot: "SKT",
    Abbottabad: "ATD",
    Bahawalpur: "BWP",
    Sargodha: "SGD",
    Sukkur: "SKR",
    Hyderabad: "HDD",
    Jhelum: "JLM",
    Gujranwala: "GWL",
    Gujrat: "GRT",
    Mirpur: "MPR",
    Muzaffarabad: "MZD",
    Mardan: "MDN",
    Chitral: "CTR",
    Chiniot: "CHT",
    "Dera Ghazi Khan": "DGK",
    "Dera Ismail Khan": "DIK",
    Khushab: "KSB",
    Kohat: "KHT",
    Mansehra: "MNS",
    Mingora: "MNG",
    Nawabshah: "NWS",
    Okara: "OKR",
    Pakpattan: "PPT",
    "Rahim Yar Khan": "RYK",
    Sahiwal: "SWL",
    Sheikhupura: "SKP",
    Swat: "SWT",
    "Toba Tek Singh": "TTS",
    Vehari: "VHR",
    Attock: "ATK",
    Chakwal: "CKW",
    Jhang: "JHG",
    Kasur: "KSR",
    Larkana: "LRK",
    Thatta: "THT",
    Ziarat: "ZRT",
    Gilgit: "GLT",
    Skardu: "SKD",
    Turbat: "TBT",
    Gwadar: "GWD",
    Hangu: "HNG",
    Haripur: "HRP",
  };

  return cityShortForms[cityName] || cityName;
}

export function getDayShortName(dateString) {
  const date = new Date(dateString);
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[date.getUTCDay()];
}

export function formatDateToDayMonth(date) {
  // Convert input to a Date object if it's a string
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj)) {
    throw new Error("Invalid date provided");
  }

  // Extract the day and month
  const day = dateObj.getDate();
  const monthShort = dateObj.toLocaleString("en-US", { month: "short" });

  // Determine ordinal suffix for the day
  const suffix = ["th", "st", "nd", "rd"];
  const value = day % 100;
  const ordinal = suffix[(value - 20) % 10] || suffix[value] || suffix[0];

  // Return formatted string
  return `${day}${ordinal} ${monthShort}`;
}

export function formatTime(inputTime) {
  if (typeof inputTime === "string") {
    return inputTime;
  }
  const date = new Date(inputTime);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formattedTime = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedTime;
}
