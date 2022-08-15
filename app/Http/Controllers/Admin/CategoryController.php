<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Models\Category;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;


class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::latest()->get();
        return Inertia::render('Admin/Category/Index', ['categories' => $categories]);
    }

    public function create()
    {
        return Inertia::render('Admin/Category/CreateCategory');
    }

    public function store(StoreCategoryRequest $request)
    {
        Category::create(
            $request->validated()
        );

        return Redirect::route('admin.categories.index')->with('success', 'Category created successfully');
    }

    public function edit(Category $category)
    {
        return Inertia::render('Admin/Category/Edit', [
            'category' => [
                'id' => $category->id,
                'title' => $category->title,
                'active' => $category->active,
            ]
        ]);
    }

    public function update(StoreCategoryRequest $request, Category $category)
    {
        $category->update($request->validated());

        return Redirect::route('admin.categories.index')->with('success', 'Category updated successfully');
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return Redirect::route('admin.categories.index')->with('success', 'Category deleted successfully');
    }
}
