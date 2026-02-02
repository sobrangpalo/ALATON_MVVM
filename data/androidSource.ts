import { FileContent } from '../types';

export const ANDROID_SOURCE_FILES: FileContent[] = [
  {
    path: "README.md",
    language: "markdown",
    content: `# ALATON Streetwear App (MVVM) 🚀
Hello! Since you are a student using an iPad, here is a quick guide on how this professional Android project works.

### 🛍️ Product Flow
This app follows a standard e-commerce flow:
1. **Authentication**: Users sign in or create a new account.
2. **Product Discovery**: View a curated list of streetwear from the ViewModel.
3. **Cart Management**: Add items to a reactive cart.
4. **Order Lifecycle**: Checkout to create an order, then manage its state (Pending → Received → Shipped).

### 🛠️ Language & Tech
- **Language**: **Kotlin** (The modern, safe, and preferred language for Android development).
- **Architecture**: **MVVM** (Model-View-ViewModel). This ensures the app is easy to test and maintain.
- **UI**: **XML** with ViewBinding for high-performance layouts.

### 💻 How to open in Android Studio
*Note: Android Studio requires a PC or Mac. Since you are on an iPad, you can use this web app to study the code, but to run it:*

1. Get to a computer with **Android Studio** installed.
2. Select **"New Project"** -> **"Empty Views Activity"**.
3. **Important**: Set the Package Name to \`com.alaton.mvvm\`.
4. Copy the files from the **"Android Source"** tab in this preview and paste them into your project folders:
   - Kotlin files go into \`app/src/main/java/com/alaton/mvvm/\`
   - XML files go into \`app/src/main/res/layout/\`
5. Click the green **Play (Run)** button to see it on a real phone or emulator!`
  },
  {
    path: "settings.gradle",
    language: "gradle",
    content: `pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        maven { url 'https://jitpack.io' }
    }
}
rootProject.name = "ALATON_MVVM"
include ':app'`
  },
  {
    path: "app/build.gradle",
    language: "gradle",
    content: `plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
}

android {
    namespace 'com.alaton.mvvm'
    compileSdk 34

    defaultConfig {
        applicationId "com.alaton.mvvm"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0"
    }

    buildFeatures {
        viewBinding true
    }
}

dependencies {
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.11.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    
    // Core MVVM & KTX
    implementation 'androidx.activity:activity-ktx:1.8.2'
    implementation 'androidx.lifecycle:lifecycle-viewmodel-ktx:2.7.0'
    implementation 'androidx.lifecycle:lifecycle-livedata-ktx:2.7.0'
    
    // Image Loading
    implementation 'com.github.bumptech.glide:glide:4.16.0'
    annotationProcessor 'com.github.bumptech.glide:compiler:4.16.0'
}`
  },
  {
    path: "app/src/main/res/values/themes.xml",
    language: "xml",
    content: `<resources>
    <style name="Theme.AlatonMVVM" parent="Theme.Material3.DayNight.NoActionBar">
        <item name="colorPrimary">#2196F3</item>
        <item name="android:statusBarColor">#FFFFFF</item>
        <item name="android:windowLightStatusBar">true</item>
    </style>
</resources>`
  },
  {
    path: "app/src/main/java/com/alaton/mvvm/viewmodel/ProductViewModel.kt",
    language: "kotlin",
    content: `package com.alaton.mvvm.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.alaton.mvvm.model.Product

class ProductViewModel : ViewModel() {
    private val _products = MutableLiveData<List<Product>>()
    val products: LiveData<List<Product>> get() = _products

    init {
        loadProducts()
    }

    private fun loadProducts() {
        _products.value = listOf(
            Product(1, "Oversized Hoodie", 2450.0, "Streetwear", "https://images.unsplash.com/photo-1556821840-3a63f95609a7", "Premium cotton."),
            Product(2, "Cargo Joggers", 1890.0, "Bottoms", "https://images.unsplash.com/photo-1552902865-b72c031ac5ea", "Tactical fit."),
            Product(3, "Graphic Tee", 850.0, "Streetwear", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", "Boxy fit.")
        )
    }
}`
  }
];`