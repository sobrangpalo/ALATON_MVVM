
import { FileContent } from '../types';

export const ANDROID_SOURCE_FILES: FileContent[] = [
  {
    path: "app/src/main/java/com/clout/clothing/model/Product.kt",
    language: "kotlin",
    content: `package com.clout.clothing.model

data class Product(
    val id: Int,
    val name: String,
    val description: String,
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
        loadCloutProducts()
    }

    private fun loadCloutProducts() {
        val clothes = listOf(
            Product(1, "Oversized 'Clout' Hoodie", "Heavyweight cotton...", 2450.0, "Streetwear", "https://images.unsplash.com/photo-1556821840-3a63f95609a7"),
            Product(2, "Urban Cargo Joggers", "Tactical design...", 1890.0, "Bottoms", "https://images.unsplash.com/photo-1552902865-b72c031ac5ea"),
            Product(3, "Essential Graphic Tee", "Boxy fit...", 850.0, "Streetwear", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"),
            Product(4, "Distressed Denim Jacket", "Vintage wash...", 3200.0, "Outerwear", "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5"),
            Product(7, "Varsity Letterman Jacket", "Wool body...", 4500.0, "Outerwear", "https://images.unsplash.com/photo-1551028719-00167b16eac5")
        )
        _products.value = clothes
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
        binding.recyclerView.adapter = adapter

        viewModel.products.observe(this) { productList ->
            adapter.submitList(productList)
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
    android:layout_height="match_parent"
    android:background="#FAFAFA">

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:padding="16dp"
        android:clipToPadding="false"
        app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager" />

</androidx.constraintlayout.widget.ConstraintLayout>`
  }
];

export const README_CONTENT = `
<div align="center">
  <img width="1200" height="400" alt="CLOUT Header" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" style="border-radius: 20px; object-fit: cover;" />
</div>

# ⚡ CLOUT CLOTHING 

> **Premium Streetwear Catalog for Android**  
> A high-performance, aesthetically driven mobile application built for modern fashion retail.

---

### 📱 Project Overview
**Clout Clothing** is an Android application engineered to deliver a seamless shopping experience for premium streetwear. It focuses on clean typography, high-resolution imagery, and a robust architecture to handle growing product catalogs.

### 🛠 Tech Stack & Core Tools
*   **Language:** Kotlin (1.9+) - Ensuring concise and safe code.
*   **Architecture:** MVVM (Model-View-ViewModel) - Promoting a clean separation of concerns.
*   **UI Framework:** XML with ViewBinding - For efficient and type-safe layout management.
*   **Jetpack Components:** LiveData, ViewModel, Lifecycle-aware components.
*   **Design System:** Material 3 implementation with custom streetwear styling.

### ⚙️ How It Works
1.  **Model**: Defines the core data structure for apparel items (ID, Name, Price, Category).
2.  **ViewModel**: Manages UI state and business logic, exposing lifecycle-aware observables.
3.  **View**: Listens for data updates and renders the product catalog via a highly optimized RecyclerView.

### 👕 Featured Collection
| Item | Price | Category |
| :--- | :--- | :--- |
| **Oversized 'Clout' Hoodie** | ₱2,450 | Streetwear |
| **Urban Cargo Joggers** | ₱1,890 | Bottoms |
| **Essential Graphic Tee** | ₱850 | Streetwear |
| **Distressed Denim Jacket** | ₱3,200 | Outerwear |
| **Varsity Letterman Jacket** | ₱4,500 | Outerwear |

### 🔑 Key Features
*   🚀 **Reactive UI**: Data changes automatically reflect in the view via LiveData.
*   📦 **Modular Code**: Decoupled components for easier scalability and testing.
*   🎨 **Custom Theming**: Deep black and minimalist white accents for a premium look.

---
*Stay Fresh. Stay Clout.*
`;
