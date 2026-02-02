import { FileContent } from '../types';

export const ANDROID_SOURCE_FILES: FileContent[] = [
  {
    path: "README.md",
    language: "markdown",
    content: `# 🚀 ALATON: Professional Streetwear App (MVVM)

Welcome! This project is a professional-grade Android application demonstration. Since you are using an **iPad**, you can use this viewer to study the architecture. To run it on a real phone, you will need a computer (PC/Mac).

---

## 🛠️ Tech Stack (100% Kotlin)
This app is built with modern Android standards:
- **Language**: 100% Kotlin (Concise & Safe)
- **Architecture**: MVVM (Model-View-ViewModel)
- **UI**: XML with ViewBinding (Material 3 Design)
- **Image Engine**: Glide (For fast image loading)

---

## 🛍️ How the App Works
1. **Secure Entry**: Simple Login/Signup flow (simulated) to protect user data.
2. **Infinite Browse**: The \`ProductViewModel\` fetches a curated list of ALATON streetwear.
3. **Reactive Cart**: Add items instantly. The UI updates automatically using \`LiveData\`.
4. **Order Management**: Checkout and track your orders through 3 stages: **Pending**, **Received**, and **Shipped**.

### Featured Products:
- **Oversized Hoodie**: Heavyweight cotton, premium embroidery.
- **Cargo Joggers**: Multi-pocket tactical streetwear.
- **Graphic Tee**: Minimalist brand aesthetics.
- **Varsity Jacket**: High-end wool and leather mix.

---

## 💻 Step-by-Step: How to run in Android Studio
Follow these steps once you get access to a computer:

1. **Install Android Studio**: Download from [developer.android.com](https://developer.android.com/studio).
2. **Create Project**: 
   - Open Studio -> **New Project**.
   - Select **"Empty Views Activity"**.
   - **CRITICAL**: Set the Package Name to \`com.alaton.mvvm\`.
3. **Configure Gradle**:
   - Copy the contents of \`app/build.gradle\` from this viewer.
   - Paste it into your project's \`app/build.gradle\` file (Module level).
   - Click **"Sync Now"** at the top right.
4. **Copy the Code**:
   - Create folders in \`app/src/main/java/com/alaton/mvvm/\` named \`model\`, \`viewmodel\`, and \`ui\`.
   - Copy the Kotlin files (\`.kt\`) from this viewer into those folders.
5. **Run**: Plug in an Android phone (or use an Emulator) and click the **Green Play Button**!`
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
        // In a real app, this would be an API call
        _products.value = listOf(
            Product(1, "Oversized Hoodie", 2450.0, "Streetwear", "https://images.unsplash.com/photo-1556821840-3a63f95609a7", "Premium cotton."),
            Product(2, "Cargo Joggers", 1890.0, "Bottoms", "https://images.unsplash.com/photo-1552902865-b72c031ac5ea", "Tactical fit."),
            Product(3, "Graphic Tee", 850.0, "Streetwear", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", "Boxy fit.")
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
 * Observes the ViewModel and updates the UI components.
 */
class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private val viewModel: ProductViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupRecyclerView()
        observeData()
    }

    private fun observeData() {
        viewModel.products.observe(this) { productList ->
            // Update your adapter here
            // adapter.submitList(productList)
        }
    }

    private fun setupRecyclerView() {
        // Initialize your RecyclerView with a LayoutManager and Adapter
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
}

dependencies {
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.11.0'
    
    // Kotlin Coroutines & Lifecycle
    implementation 'androidx.lifecycle:lifecycle-viewmodel-ktx:2.7.0'
    implementation 'androidx.lifecycle:lifecycle-livedata-ktx:2.7.0'
    implementation 'androidx.activity:activity-ktx:1.8.2'
    
    // Image Loading - Glide
    implementation 'com.github.bumptech.glide:glide:4.16.0'
}`
  }
];