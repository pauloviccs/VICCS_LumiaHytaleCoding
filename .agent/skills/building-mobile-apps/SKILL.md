---
name: building-mobile-apps
description: Builds native mobile applications for iOS and Android using Expo (React Native). Use when the user wants to target mobile devices, publish to App Store/Play Store, or use native device features (Camera, GPS, Haptics).
---

# Building Mobile Apps (Expo & React Native)

## When to use this skill

- When the user asks for an "iOS app", "Android app", or "Mobile version".
- When using **React Native** or **Expo**.
- When accessing device features like Camera, Notifications, or Gyroscope.

## Workflow

1. **Initialization**:
    - `npx create-expo-app@latest my-app`
    - `cd my-app && npx expo start`
    - Scan QR code with Expo Go app on phone.
2. **Navigation**:
    - Use `expo-router` (file-based routing similar to Next.js).
    - Create files in `app/index.tsx`, `app/profile.tsx`.
3. **Native Features**:
    - Install packages: `npx expo install expo-camera` (auto-configures native code).
4. **Build/Deploy**:
    - Use **EAS Build**: `eas build --profile production`.
    - Submit: `eas submit`.

## Instructions

### Project Structure (Expo Router)

```
/app
  _layout.tsx  # Global provider/navigation stack
  index.tsx    # Home screen
  settings.tsx # /settings screen
/assets        # Images/Fonts
package.json
```

### Core Components

Use React Native primitives, *not* HTML/CSS tags.

- `<div>` -> `<View>`
- `<span>` -> `<Text>`
- `<button>` -> `<Pressable>` or `<TouchableOpacity>`
- `<img>` -> `<Image>`
- **Styling**: Use `StyleSheet.create` or `NativeWind` (Tailwind for RN).

### Code Sharing (Monorepo)

If building a website + mobile app:

- Keep business logic (hooks, state, API calls) in a shared folder.
- Keep UI code separate (React DOM vs React Native) OR use a universal library like `Tamagui` or `NativeBase`.

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
