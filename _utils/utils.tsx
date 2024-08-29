import imageCompression from "browser-image-compression";
const modeOfWorkOptions = ["Work_From_Home", "Work_From_Office"];
const jobTypeOptions = [
  "Full_Time",
  "Part_Time",
  "InternShip",
  "Project_Work",
  "Volunteering",
];

export function generateRandomName(length = 20) {
  if (typeof window === "undefined") {
    // Node.js environment
    const crypto = require("crypto");
    return crypto.randomBytes(length).toString("hex").substring(0, length);
  } else {
    // Edge environment or browser
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => ("0" + byte.toString(16)).slice(-2))
      .join("")
      .substring(0, length);
  }
}
export function formatNumber(number: number): string {
  if (number < 100) {
    return number.toString(); // Return as is if less than 100
  } else if (number < 1000) {
    return number.toFixed(0); // Return as is if less than 1000
  } else if (number < 100000) {
    const thousands = number / 1000;
    return thousands.toFixed(1) + "K"; // Format to thousands (e.g., 1.5K)
  } else {
    const lakh = number / 100000; // Convert number to lakh
    if (Number.isInteger(lakh)) {
      return lakh.toFixed(0) + "LPA"; // Return as integer lakh
    } else {
      return lakh.toFixed(1) + "LPA"; // Return with one decimal place
    }
  }
}

export function formatTimeAgo(isoDateString?: string): string {
  if (!isoDateString) {
    return "Unknown";
  }

  const date = new Date(isoDateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  let secondsAgo = diffInSeconds;
  let unit = "";

  for (const [interval, seconds] of Object.entries(intervals)) {
    const count = Math.floor(secondsAgo / seconds);
    if (count > 0) {
      unit = interval;
      secondsAgo = count;
      break;
    }
  }

  if (unit === "minute") {
    return `${secondsAgo} ${unit}${secondsAgo !== 1 ? "s" : ""} ago`;
  } else {
    return `${secondsAgo} ${unit}${secondsAgo !== 1 ? "s" : ""} ago`;
  }
}

async function handleImageUpload(event: any) {
  const imageFile = event.target.files[0];

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1200,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);

    // await uploadToServer(compressedFile); // write your own logic
  } catch (error) {
    console.log(error);
  }
}
export default handleImageUpload;

export const convertTimestampToTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: userTimeZone,
  };
  const time = new Intl.DateTimeFormat([], options).format(date);

  return time;
};

export const pushNotification = (title: string, message: string) => {
  if (Notification.permission === "granted") {
    new Notification(title, { body: message });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(title, { body: message });
      }
    });
  }
};
