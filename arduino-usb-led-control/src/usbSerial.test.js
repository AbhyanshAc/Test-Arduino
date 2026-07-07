const { stringToHex } = require('./usbSerial');

describe('stringToHex', () => {
  it('converts Arduino commands to the expected hex payload', () => {
    expect(stringToHex('ON\n')).toBe('4f4e0a');
    expect(stringToHex('OFF\n')).toBe('4f46460a');
  });
});
