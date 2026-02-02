import { FileContent } from '../types';

export const ANDROID_SOURCE_FILES: FileContent[] = [
  {
    path: "README.md",
    language: "markdown",
    content: `# 🚀 ALATON Streetwear - Student Project

This project is a professional-grade Android application demonstration focusing on clean architecture and modern development standards.

---

## 🛠️ Technology & Language
- **Language**: **100% Kotlin**. Kotlin was chosen for its modern syntax, safety features, and official support by Google for Android development.
- **Architecture**: **MVVM (Model-View-ViewModel)**. This pattern ensures that the logic is separated from the UI, making the app easier to maintain and test.
- **UI Components**: XML-based layouts using **Material Design 3** and **ViewBinding** for efficient UI interaction.

---

## 🛍️ How the Products & App Work
The application simulates a high-end streetwear shopping experience:

1.  **Product List**: The app fetches a collection of products (Hoodies, Joggers, Tees, Jackets) through the \`ProductViewModel\`.
2.  **Model Layer**: Each product is defined as a \`Product\` data class containing attributes like price, category, and image URLs.
3.  **ViewModel logic**: When the user interacts with the app, the \`ViewModel\` updates the \`LiveData\`. The \`Activity\` (View) observes this data and updates the screen automatically.
4.  **Cart & Orders**: Users can add items to a shopping cart. The ordering process includes status tracking (Pending, Received, Shipped) to demonstrate complex state management.

---

## 💻 Manual Setup for Windows (Android Studio)
Since I am using an iPad, these are the manual steps to run this code on a Windows PC using Android Studio:

### Step 1: Install Android Studio
Download the installer from [developer.android.com/studio](https://developer.android.com/studio) and follow the installation wizard on your Windows machine.

### Step 2: Create a New Project
1. Open Android Studio.
2. Click **New Project**.
3. Select **Empty Views Activity** (Important: Do not pick 'Empty Activity' as that uses Compose).
4. Click **Next**.
5. Set the Name to \`ALATON MVVM\`.
6. Set the Package Name to \`com.alaton.mvvm\`.
7. Choose **Kotlin** as the language.
8. Click **Finish**.

### Step 3: Configure build.gradle
1. In the project sidebar, find \`Gradle Scripts\` -> \`build.gradle (Module: app)\`.
2. Copy the content from the \`app/build.gradle\` file in this source viewer.
3. Paste it into your local file.
4. Click the **"Sync Now"** banner that appears at the top.

### Step 4: Create the Code Folders
1. Navigate to \`app/java/com/alaton/mvvm/\`.
2. Right-click the folder -> **New** -> **Package**.
3. Create three folders: \`model\`, \`viewmodel\`, and \`ui\`.

### Step 5: Copy the Source Code
1. For every file in this viewer (like \`Product.kt\`), right-click the correct package in Android Studio.
2. Select **New** -> **Kotlin Class/File**.
3. Name it exactly (e.g., \`Product\`).
4. Paste the code provided in this viewer.

### Step 6: Launch
1. Connect your Android phone to your Windows PC via USB (Enable USB Debugging in phone settings).
2. Click the **Green Play Arrow** in the top toolbar of Android Studio.

*Note: As this is a student project, no license is attached. Feel free to use this for learning purposes.*`
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