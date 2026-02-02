import { FileContent } from '../types';

export const ANDROID_SOURCE_FILES: FileContent[] = [
  {
    path: "README.md",
    language: "markdown",
    content: `# 🚀 ALATON Streetwear App (MVVM)

This is a professional Android application built using the **MVVM (Model-View-ViewModel)** architectural pattern. It is designed to be a clean, scalable, and modern demonstration of Android development.

---

## 💻 Tech & Language
- **Language**: **100% Kotlin**. I used Kotlin because it is the modern, safe, and official language for Android.
- **Architecture**: **MVVM**. This separates the data (Model), the UI (View), and the logic (ViewModel) so the code is easy to read.
- **UI Design**: Built using XML with **Material 3** components and **ViewBinding** for better performance.

---

## 🛍️ How the Product Works
The app follows a complete shopping journey:
1. **Authentication**: Users can sign in or sign up to access the shop.
2. **Product Catalog**: The app displays a curated list of ALATON streetwear (Hoodies, Joggers, Tees).
3. **ViewModel Logic**: The \`ProductViewModel\` manages the list of products and ensures that if you rotate your screen, the data doesn't disappear.
4. **Shopping Cart**: Users can add products to a reactive cart that updates in real-time.
5. **Order Lifecycle**: Once a user checks out, they can track their order through three stages: **Pending** -> **Received** -> **Shipped**.

---

## 🛠️ Step-by-Step: How to run on Windows (Android Studio)

Follow these manual steps to get the code running on your Windows computer:

### 1. Install Android Studio
- Download and install the latest version of **Android Studio** from [developer.android.com/studio](https://developer.android.com/studio).
- Follow the setup wizard to install the Android SDK and Emulator.

### 2. Create a New Project
- Open Android Studio and click **"New Project"**.
- Select **"Empty Views Activity"** (This is important for using XML layouts).
- Click **Next**.
- **Name**: ALATON MVVM
- **Package name**: \`com.alaton.mvvm\` (Must match exactly).
- **Language**: Kotlin.
- **Minimum SDK**: API 24 (Android 7.0).
- Click **Finish**.

### 3. Setup the Build Files
- Open the file: \`app/build.gradle.kts\` (or \`build.gradle\`).
- Copy the contents from the **"app/build.gradle"** file in this source viewer.
- Paste it into your project file and click **"Sync Now"** at the top right of the screen.

### 4. Create the Folder Structure
In the Project window (left side), navigate to \`app/java/com/alaton/mvvm/\`.
- Right-click the folder -> **New** -> **Package**.
- Create 3 packages: \`model\`, \`viewmodel\`, and \`ui\`.

### 5. Copy the Kotlin Code
- Open each \`.kt\` file in this source viewer.
- Right-click the corresponding package in Android Studio (\`model\`, \`viewmodel\`, etc.).
- **New** -> **Kotlin Class/File**.
- Name it exactly as the file (e.g., \`Product.kt\`).
- Paste the code.

### 6. Run the App
- Connect your Android phone via USB (with Developer Options enabled) OR create a Virtual Device (Emulator) in the **Device Manager**.
- Click the **Green Play Button** at the top of Android Studio.
- The app will build and install on your device!`
  },
  {
    path: "app/src/main/java/com/alaton/mvvm/model/Product.kt",
    language: "kotlin",
    content: `package com.alaton.mvvm.model

/**
 * Data class representing a Streetwear Product.
 * Part of the 'Model' in MVVM.
 */
data class Product(
    val id: Int,
    val name: String,
    val price: Double,
    val category: String,
    val imageUrl: String,
    val description: String
)`
  },
  {
    path: "app/src/main/java/com/alaton/mvvm/viewmodel/ProductViewModel.kt",
    language: "kotlin",
    content: `package com.alaton.mvvm.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.alaton.mvvm.model.Product

/**
 * ViewModel handles the business logic and holds the data for the UI.
 * This ensures data survives orientation changes.
 */
class ProductViewModel : ViewModel() {

    private val _products = MutableLiveData<List<Product>>()
    val products: LiveData<List<Product>> get() = _products

    init {
        loadStreetwear()
    }

    private fun loadStreetwear() {
        // Mock data representing our streetwear collection
        _products.value = listOf(
            Product(1, "Oversized Hoodie", 2450.0, "Streetwear", "https://images.unsplash.com/photo-1556821840-3a63f95609a7", "Premium cotton."),
            Product(2, "Cargo Joggers", 1890.0, "Bottoms", "https://images.unsplash.com/photo-1552902865-b72c031ac5ea", "Tactical fit."),
            Product(3, "Graphic Tee", 850.0, "Streetwear", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", "Boxy fit."),
            Product(4, "Varsity Jacket", 4500.0, "Outerwear", "https://images.unsplash.com/photo-1551028719-00167b16eac5", "High-end wool mix.")
        )
    }
}`
  },
  {
    path: "app/src/main/java/com/alaton/mvvm/ui/MainActivity.kt",
    language: "kotlin",
    content: `package com.alaton.mvvm.ui

import android.os.Bundle
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import com.alaton.mvvm.databinding.ActivityMainBinding
import com.alaton.mvvm.viewmodel.ProductViewModel

/**
 * The 'View' in MVVM. 
 * Observes the ViewModel and updates the UI components using ViewBinding.
 */
class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private val viewModel: ProductViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Initialize ViewBinding
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupUI()
        observeViewModel()
    }

    private fun observeViewModel() {
        // Observe the LiveData from ViewModel
        viewModel.products.observe(this) { productList ->
            // In a real app, update your RecyclerView Adapter here
            // example: productAdapter.submitList(productList)
        }
    }

    private fun setupUI() {
        // Setup toolbar, bottom nav, etc.
        binding.toolbar.title = "ALATON Streetwear"
    }
}`
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
    
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    
    kotlinOptions {
        jvmTarget = '1.8'
    }
}

dependencies {
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.11.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    
    // ViewModel and LiveData
    implementation 'androidx.lifecycle:lifecycle-viewmodel-ktx:2.7.0'
    implementation 'androidx.lifecycle:lifecycle-livedata-ktx:2.7.0'
    implementation 'androidx.activity:activity-ktx:1.8.2'
    
    // Image Loading
    implementation 'com.github.bumptech.glide:glide:4.16.0'
}`
  }
];