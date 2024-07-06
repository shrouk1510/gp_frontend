export function convertValues(data) {
    for (const key in data) {
      if (typeof data[key] === 'string') {
        const number = Number(data[key]);
        if (isNaN(number)) {
          console.error(`Error converting ${key}: "${data[key]}"`);
          // You can set a default value here if desired
        } else {
          data[key] = number;
        }
      }
    }
    return data;
  }
  