
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
# ⚡ CLOUT CLOTHING

> A high-performance Android catalog for premium streetwear.

### 🚀 Overview
This application implements a modern shopping experience using clean architecture principles. It serves as a visual showcase for the latest Clout drops.

### 🛠 Tech Stack
- **Architecture**: MVVM (Model-View-ViewModel)
- **Language**: Kotlin 1.9+
- **Framework**: Android Jetpack (LiveData, ViewModel, ViewBinding)
- **UI Design**: Material 3 / Streetwear Aesthetic

### 👕 Product Catalog
- **Oversized 'Clout' Hoodie** - ₱2,450
- **Urban Cargo Joggers** - ₱1,890
- **Essential Graphic Tee** - ₱850
- **Distressed Denim Jacket** - ₱3,200
- **Varsity Letterman Jacket** - ₱4,500

### 🔑 Key Features
- **MVVM Pattern**: Clean separation of concerns for better maintainability.
- **Dynamic Catalog**: Real-time product listing with high-res previews.
- **User Flow**: Integrated Sign-in and Profile management modules.

---
*Stay Clout.*
`;
