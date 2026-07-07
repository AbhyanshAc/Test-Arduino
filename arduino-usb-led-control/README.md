# Arduino USB LED Control

A complete Expo development-build app for Android that communicates with an Arduino Uno over USB serial using an OTG cable.

## What it does
- Detects connected USB serial devices on Android.
- Requests USB permission when needed.
- Opens the first Arduino-compatible serial device at 9600 baud.
- Sends `ON\n` and `OFF\n` commands to toggle an LED on the Arduino.

## Arduino sketch
Use this sketch on the Arduino Uno:

```cpp
const int LED = 13;

void setup() {
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (Serial.available()) {
    String cmd = Serial.readStringUntil('\n');
    cmd.trim();

    if (cmd == "ON")
      digitalWrite(LED, HIGH);

    if (cmd == "OFF")
      digitalWrite(LED, LOW);
  }
}
```

## Prerequisites
- Node.js 20+
- Android Studio
- Android SDK with API 26+ installed
- A physical Android phone/tablet with USB OTG support
- An Arduino Uno and USB OTG cable

## Windows setup
1. Install Node.js from nodejs.org.
2. Install Android Studio and the Android SDK.
3. Set the Android SDK path in your environment:
   - `ANDROID_HOME=C:\Users\<you>\AppData\Local\Android\Sdk`
   - Add `%ANDROID_HOME%\platform-tools` and `%ANDROID_HOME%\emulator` to `PATH`.
4. Create an Android virtual device or connect a physical phone.
5. Open a terminal in the project folder and run:
   - `npm install`
   - `npx expo prebuild`
   - `npx expo run:android`

## Project setup
```bash
cd arduino-usb-led-control
npm install
npx expo prebuild
npx expo run:android
```

## Notes
- The app is designed for Android only and requires a Development Build, not Expo Go.
- USB Host support is enabled via the Android manifest and the native Expo config plugin.
