# ALATON_MVVM

Simple student Android app using MVVM.

About
-----
This is a student project (ALATON) built to learn Android development with the MVVM pattern. It shows a basic app structure, simple navigation, and local + network data handling.

Product flow (very simple)
- Open app → Splash screen.
- If not logged in → go to Login screen (or continue as guest).
- After login → Home screen with a list of items.
- Tap an item → open detail screen (view / edit / delete).
- Create new item → fill form → save to local and server (when online).

Architecture & tools (short)
- Pattern: MVVM (ViewModel + UI)
- Language: Kotlin
- Networking: Retrofit (or simple HTTP client)
- Local storage: Room or DataStore
- DI: Hilt (optional)
- Concurrency: Kotlin Coroutines + Flow
- UI: XML or Jetpack Compose

How to open the project
- Using Android Studio (GUI): File → Open... → choose this project folder.
- Quick terminal commands:
  - macOS: open -a "Android Studio" /path/to/ALATON_MVVM
  - Linux: /path/to/android-studio/bin/studio.sh /path/to/ALATON_MVVM &
  - Windows PowerShell:
    Start-Process "C:\Program Files\Android\Android Studio\bin\studio64.exe" -ArgumentList "C:\path\to\ALATON_MVVM"

Build & run (terminal)
- Build debug APK:
  ./gradlew assembleDebug
- Install on device (connected):
  ./gradlew installDebug

Notes for students
- Do not commit API keys. Put them in local.properties or environment variables.
- Keep code small and focused. Practice writing tests for ViewModels and repository logic.
- Add screenshots in /docs or /assets to show how the app works (optional).

If you want this even shorter or in another language, tell me which parts to remove or change.