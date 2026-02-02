import { FileContent } from '../types';

export const ANDROID_SOURCE_FILES: FileContent[] = [
  {
    path: "README.md",
    language: "markdown",
    // Escaping the backticks around the package name to prevent them from closing the template literal.
    content: `# ALATON MVVM Streetwear App 🚀

## 🛒 Product Flow
1. **Browse**: Look through the streetwear collection.
2. **Cart**: Add items you like to your shopping bag.
3. **Checkout**: Finalize your purchase to create an order.
4. **Manage**: Track your order from 'Pending' to 'Received' to 'Shipped'.

## 🛠 Tech Stack
- **Language**: Kotlin (Modern Android standard).
- **UI**: XML with ViewBinding.
- **Architecture**: MVVM (Model-View-ViewModel) for clean, professional code.
- **Libraries**: Glide (Image Loading), Lifecycle KTX (Data handling).

## 💻 How to open in Android Studio (PC/Mac)
Since you are on an iPad, you can't run Android Studio here, but if you get to a computer:
1. Open Android Studio and select **"New Project"**.
2. Choose **"Empty Views Activity"**.
3. **CRITICAL**: Use package name \`com.alaton.mvvm\`.
4. Create the files exactly as named in the "Source Code" tab and paste the code.
5. Click the green **Run** button!`
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
];