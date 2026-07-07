// Convert the text command into the hex payload expected by the native Android USB bridge.
export function stringToHex(value) {
  return Array.from(value)
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('')
    .toLowerCase();
}
