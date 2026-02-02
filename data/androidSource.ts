
import { FileContent } from '../types';

export const ANDROID_SOURCE_FILES: FileContent[] = [
  {
    path: "app/build.gradle",
    language: "gradle",
    content: `plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
}

android {
    namespace 'com.clout.clothing'
    compileSdk 34

    defaultConfig {
        applicationId "com.clout.clothing"
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
    implementation 'github.com/bumptech/glide:glide:4.16.0'
}`
  },
  {
    path: "app/src/main/AndroidManifest.xml",
    language: "xml",
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />
    <application
        android:allowBackup="true"
        android:label="Clout Clothing"
        android:theme="@style/Theme.Material3.DayNight.NoActionBar">
        <activity
            android:name=".view.MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`
  },
  {
    path: "app/src/main/java/com/clout/clothing/model/Product.kt",
    language: "kotlin",
    content: `package com.clout.clothing.model

data class Product(
    val id: Int,
    val name: String,
    val price: Double,
    val category: String,
    val imageUrl: String
)`
  },
  {
    path: "app/src/main/java/com/clout/clothing/viewmodel/ProductViewModel.kt",
    language: "kotlin",
    content: `package com.clout.clothing.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.clout.clothing.model.Product

class ProductViewModel : ViewModel() {
    private val _products = MutableLiveData<List<Product>>()
    val products: LiveData<List<Product>> get() = _products

    init {
        _products.value = listOf(
            Product(1, "Oversized Hoodie", 2450.0, "Streetwear", "https://images.unsplash.com/photo-1556821840-3a63f95609a7"),
            Product(2, "Cargo Joggers", 1890.0, "Bottoms", "https://images.unsplash.com/photo-1552902865-b72c031ac5ea"),
            Product(3, "Graphic Tee", 850.0, "Streetwear", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab")
        )
    }
}`
  },
  {
    path: "app/src/main/java/com/clout/clothing/view/ClothingAdapter.kt",
    language: "kotlin",
    content: `package com.clout.clothing.view

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.clout.clothing.databinding.ItemProductBinding
import com.clout.clothing.model.Product

class ClothingAdapter : RecyclerView.Adapter<ClothingAdapter.ViewHolder>() {
    private var items = listOf<Product>()

    fun submitList(newItems: List<Product>) {
        items = newItems
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding = ItemProductBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) = holder.bind(items[position])
    override fun getItemCount() = items.size

    class ViewHolder(private val binding: ItemProductBinding) : RecyclerView.ViewHolder(binding.root) {
        fun bind(product: Product) {
            binding.textName.text = product.name
            binding.textPrice.text = "₱\${product.price.toInt()}"
            Glide.with(binding.root).load(product.imageUrl).centerCrop().into(binding.imageProduct)
        }
    }
}`
  },
  {
    path: "app/src/main/java/com/clout/clothing/view/MainActivity.kt",
    language: "kotlin",
    content: `package com.clout.clothing.view

import android.os.Bundle
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.clout.clothing.databinding.ActivityMainBinding
import com.clout.clothing.viewmodel.ProductViewModel

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private val viewModel: ProductViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val adapter = ClothingAdapter()
        binding.recyclerView.layoutManager = LinearLayoutManager(this)
        binding.recyclerView.adapter = adapter

        viewModel.products.observe(this) { 
            adapter.submitList(it) 
        }
    }
}`
  },
  {
    path: "app/src/main/res/layout/activity_main.xml",
    language: "xml",
    content: `<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout 
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerView"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>`
  },
  {
    path: "app/src/main/res/layout/item_product.xml",
    language: "xml",
    content: `<?xml version="1.0" encoding="utf-8"?>
<com.google.android.material.card.MaterialCardView 
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_margin="8dp"
    app:cardCornerRadius="16dp">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:padding="12dp">
        <ImageView
            android:id="@+id/imageProduct"
            android:layout_width="80dp"
            android:layout_height="80dp"
            android:scaleType="centerCrop" />
        <LinearLayout
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:orientation="vertical"
            android:layout_marginStart="16dp"
            android:layout_gravity="center_vertical">
            <TextView 
                android:id="@+id/textName" 
                android:layout_width="wrap_content" 
                android:layout_height="wrap_content" 
                android:textSize="16sp"
                android:textStyle="bold" 
                android:textColor="#000000" />
            <TextView 
                android:id="@+id/textPrice" 
                android:layout_width="wrap_content" 
                android:layout_height="wrap_content"
                android:layout_marginTop="4dp"
                android:textColor="#4CAF50"
                android:textStyle="bold" />
        </LinearLayout>
    </LinearLayout>
</com.google.android.material.card.MaterialCardView>`
  }
];

export const README_CONTENT = `
# ⚡ CLOUT CLOTHING (Android Native)

**THIS CODE IS FOR ANDROID STUDIO ON WINDOWS/MACOS.**

### ⚠️ IMPORTANT:
The web page you are looking at is just a **Showcase/Repository Viewer**. 
To run the actual app, you must copy the files from the **"Code"** tab into a new Android Studio project.

---

### 🚀 STEPS TO RUN IN ANDROID STUDIO (WINDOWS):

1.  **Open Android Studio**: Start a new "Empty Views Activity" project.
2.  **Project Config**:
    - Project Name: \`Clout Clothing\`
    - Package Name: \`com.clout.clothing\` (Critical!)
    - Language: \`Kotlin\`
3.  **Setup build.gradle (Module: app)**:
    - Add \`viewBinding true\` inside the \`android { ... }\` block.
    - Copy the dependencies from the \`app/build.gradle\` file in the "Code" tab.
4.  **Create Package Folders**:
    - Right-click \`java/com.clout.clothing\` -> New -> Package.
    - Create \`model\`, \`view\`, and \`viewmodel\`.
5.  **Copy-Paste Source**:
    - Open the **"Code"** tab here.
    - Click **"Copy raw content"** for each file.
    - Paste it into the matching file in your Android Studio project.
6.  **Run**: Press Shift+F10 (or the Green Play button) to run on your Emulator or Windows Android Subsystem.

---

### 🏛 ARCHITECTURE: MVVM
- **Model**: Data structures for clothing products.
- **ViewModel**: ProductViewModel manages the list and logic.
- **View**: MainActivity & Adapter render the list using RecyclerView.
- **ViewBinding**: Clean UI interaction without findViewById.

*Created for technical submission.*
`;
