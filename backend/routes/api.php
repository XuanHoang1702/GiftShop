<?php

use App\Http\Controllers\OrderDetailController;
use App\Http\Controllers\ProductStoreController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ConfigController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductImageController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductSaleController;
use App\Http\Controllers\OrderController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them willS
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//User
Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);
Route::get('user/profile/{id}', [UserController::class, 'getUserProfile']);
Route::put('user/{id}', [UserController::class, 'update']);
Route::get('user', [UserController::class, 'index']);
Route::post('user_create', [UserController::class, 'createUser']);
Route::put('user/{id}/put_trash', [UserController::class, 'putTrash']);
Route::get('user_trash', [UserController::class, 'getTrash']);
Route::put('user/{id}/restore', [UserController::class, 'restore']);
Route::delete('user/{id}/delete', [UserController::class, 'destroy']);
Route::post('user/forgot_password', [UserController::class, 'forgotPassword']);
Route::post('user/change_password', [UserController::class, 'changePassword']);



//Banner
Route::apiResource('banner',BannerController::class);
Route::get('banner/{id}/image', [BannerController::class, 'getImageBanner']);
Route::post('banner/{id}/update', [BannerController::class, 'update']);
Route::put('banner/{id}/put_trash', [BannerController::class, 'putTrash']);
Route::get('banner_trash', [BannerController::class, 'getTrash']);
Route::put('banner/{id}/restore', [BannerController::class, 'restore']);

//Brand
Route::apiResource('brand',BrandController::class);
Route::get('brand/{id}/image', [BrandController::class, 'getImageBrand']);
Route::post('brand/{id}/update', [BrandController::class, 'update']);
Route::put('brand/{id}/put_trash', [BrandController::class, 'putTrash']);
Route::get('brand_trash', [BrandController::class, 'getTrash']);
Route::put('brand/{id}/restore', [BrandController::class, 'restore']);

// Category
Route::apiResource('category',CategoryController::class);
Route::get('category/{id}/image', [CategoryController::class, 'getImageCategory']);
Route::post('category/{id}/update', [CategoryController::class, 'update']);
Route::put('category/{id}/put_trash', [CategoryController::class, 'putTrash']);
Route::get('category_trash', [CategoryController::class, 'getTrash']);
Route::put('category/{id}/restore', [CategoryController::class, 'restore']);

//Config
Route::apiResource('config',ConfigController::class);

//Menu
Route::apiResource('menu',MenuController::class);
Route::put('menu/{id}/put_trash', [MenuController::class, 'putTrash']);
Route::get('menu_trash', [MenuController::class, 'getTrash']);
Route::put('menu/{id}/restore', [MenuController::class, 'restore']);

//Topics
Route::apiResource('topic',TopicController::class);
Route::put('topic/{id}/put_trash', [TopicController::class, 'putTrash']);
Route::get('topic_trash', [TopicController::class, 'getTrash']);
Route::put('topic/{id}/restore', [TopicController::class, 'restore']);

//Contact
Route::apiResource('contact',ContactController::class);
Route::post('/email',[ContactController::class, 'email']);
Route::post('contact/{id}/reply', [ContactController::class, 'reply']);
Route::get('contact/replies/{userId}', [ContactController::class, 'getRepliesForUser']);
Route::post('contact/{id}/update',[ContactController::class, 'update']);
Route::put('contact/{id}/put_trash', [ContactController::class, 'putTrash']);
Route::get('contact_trash', [ContactController::class, 'getTrash']);
Route::put('contact/{id}/restore', [ContactController::class, 'restore']);

//Post
Route::apiResource('post',PostController::class);
Route::get('post/{id}/image', [PostController::class, 'getImagePost']);
Route::post('post/{id}/update', [PostController::class, 'update']);
Route::put('post/{id}/put_trash', [PostController::class, 'putTrash']);
Route::get('post_trash', [PostController::class, 'getTrash']);
Route::put('post/{id}/restore', [PostController::class, 'restore']);

//Product
Route::apiResource('product', ProductController::class);
Route::get('product_all', [ProductController::class, 'showAll']);
Route::get('search_product', [ProductController::class, 'search']);
Route::get('category/{id}/product', [ProductController::class, 'getProductByCategory']);
Route::post('product/price', [ProductController::class, 'getProductByPrice']);
Route::get('brand/{id}/product', [ProductController::class, 'getProductByBrand']);
Route::get('best_seller',[ProductController::class, 'getProductBestSaler']);
Route::get('relatedProduct/{id}', [ProductController::class, 'relatedProduct']);
Route::get('lastest', [ProductController::class, 'lastest']);
Route::get('pricebuy/{status}', [ProductController::class, 'sortByPrice']);
Route::get('product_sale', [ProductController::class, 'index']);
Route::put('product/{id}/put_trash', [ProductController::class, 'putTrash']);
Route::get('product_trash', [ProductController::class, 'getTrash']);
Route::put('product/{id}/restore', [ProductController::class, 'restore']);

//Product Image
Route::get('product/{id}/image', [ProductImageController::class, 'show']);
Route::apiResource('productImage', ProductImageController::class);

//Store Product
Route::apiResource('store_product', ProductStoreController::class);
Route::put('store_product/{id}/put_trash', [ProductStoreController::class, 'putTrash']);
Route::get('store_product_trash', [ProductStoreController::class, 'getTrash']);
Route::put('store_product/{id}/restore', [ProductStoreController::class, 'restore']);
//Cart
Route::middleware('auth:api')->apiResource('/cart', CartController::class);

//Product sale
Route::apiResource('product_sale', ProductSaleController::class);
Route::put('product_sale/{id}/put_trash', [ProductSaleController::class, 'putTrash']);
Route::get('product_sale_trash', [ProductSaleController::class, 'getTrash']);
Route::put('product_sale/{id}/restore', [ProductSaleController::class, 'restore']);

//Order
Route::middleware('auth:api')->apiResource('order', OrderController::class);
Route::get('order_all',[OrderController::class,'show']);
Route::put('order/{id}/put_trash', [OrderController::class, 'putTrash']);
Route::get('order_trash', [OrderController::class, 'getTrash']);
Route::put('order/{id}/restore', [OrderController::class, 'restore']);

//Order Detai;
Route::apiResource('order_detail', OrderDetailController::class);


// // Trang người dùng
// // UC1: Cấu hình web
// Route::get('config_web', [ConfigController::class, 'config_web']);

// // UC2: Menu (menu list, vị trí, cấp, giới hạn)
// Route::get('menu_list/{position}/{parentid?}/{limit?}', [MenuController::class, 'menu_list']);

// // UC3: Slideshow (slider list, vị trí, giới hạn)
// Route::get('slider_list/{position}/{limit?}', [BannerController::class, 'slider_list']);

// // UC4: Sản phẩm mới (giới hạn)
// Route::get('product_new/{limit}', [ProductController::class, 'product_new']);

// // UC5: Sản phẩm khuyến mãi (giới hạn)
// Route::get('order/{limit}', [ProductController::class, 'product_sale']);

// // UC6: Sản phẩm bán chạy (giới hạn)
// Route::get('product_bestseller/{limit}', [ProductController::class, 'product_bestseller']);

// // UC7-1: Danh mục (cấp)
// Route::get('category_list/{parentid?}', [CategoryController::class, 'category_list']);

// // UC7-2: Sản phẩm theo danh mục (mã danh mục, giới hạn)
// Route::get('product_category/{categoryid}/{limit}', [ProductController::class, 'product_category']);

// // UC8: Bài viết mới nhất (giới hạn)
// Route::get('post_new/{limit}', [PostController::class, 'post_new']);

// // UC9: Trang đơn (slug)
// Route::get('post_page/{slug}', [PostController::class, 'post_page']);

// // UC10: Sản phẩm (mã danh mục, giới hạn)
// Route::get('product_all/{categoryid}/{limit}', [ProductController::class, 'product_all']);


// // UC: Đăng nhập và quên mật khẩu
// Route::get("admin/login", [UserController::class, "login"]);
// Route::get("admin/forget", [UserController::class, "getforget"]);
// Route::post("admin/forget", [UserController::class, "postforget"]);

// // UC: Cập nhật cấu hình
// Route::get("config", [ConfigController::class, "index"]);
// Route::post("config/update/{id}", [ConfigController::class, "update"]);

// // UC: Quản lý banner
// Route::prefix("banner")->group(function() {
//     Route::get("/", [BannerController::class, "index"]);
//     Route::get("/trash", [BannerController::class, "trash"]);
//     Route::get("/show/{id}", [BannerController::class, "show"]);
//     Route::post("/store", [BannerController::class, "store"]);
//     Route::post("/update/{id}", [BannerController::class, "update"]);
//     Route::get("/status/{id}", [BannerController::class, "status"]);
//     Route::get("/delete/{id}", [BannerController::class, "delete"]);
//     Route::get("/restore/{id}", [BannerController::class, "restore"]);
//     Route::delete("/destroy/{id}", [BannerController::class, "destroy"]);
//     Route::delete("/trashdelete/{id}", [BannerController::class, "trashdelete"]);
// });

// // UC: Quản lý thương hiệu
// Route::prefix("brand")->group(function() {
//     Route::get("/", [BrandController::class, "index"]);
//     Route::get("/trash", [BrandController::class, "trash"]);
//     Route::get("/show/{id}", [BrandController::class, "show"]);
//     Route::post("/store", [BrandController::class, "store"]);
//     Route::post("/update/{id}", [BrandController::class, "update"]);
//     Route::get("/status/{id}", [BrandController::class, "status"]);
//     Route::get("/delete/{id}", [BrandController::class, "delete"]);
//     Route::get("/restore/{id}", [BrandController::class, "restore"]);
//     Route::delete("/destroy/{id}", [BrandController::class, "destroy"]);
//     Route::put("/status/{id}", [BrandController::class, "updatePStatus"]);
//     Route::delete("/trashdelete/{id}", [BrandController::class, "trashdelete"]);
// });

// // UC: Quản lý danh mục
// Route::prefix("category")->group(function() {
//     Route::get("/", [CategoryController::class, "index"]);
//     Route::get("/trash", [CategoryController::class, "trash"]);
//     Route::get("/show/{id}", [CategoryController::class, "show"]);
//     Route::post("/store", [CategoryController::class, "store"]);
//     Route::post("/update/{id}", [CategoryController::class, "update"]);
//     Route::get("/status/{id}", [CategoryController::class, "status"]);
//     Route::get("/delete/{id}", [CategoryController::class, "delete"]);
//     Route::get("/restore/{id}", [CategoryController::class, "restore"]);
//     Route::delete("/destroy/{id}", [CategoryController::class, "destroy"]);
//     Route::get('/{categoryId}/products', [CategoryController::class, 'filterProductsByCategory']);

// });

// // UC: Quản lý menu
// Route::prefix("menu")->group(function() {
//     Route::get("/", [MenuController::class, "index"]);
//     Route::get("/trash", [MenuController::class, "trash"]);
//     Route::get("/show/{id}", [MenuController::class, "show"]);
//     Route::post("/store", [MenuController::class, "store"]);
//     Route::post("/update/{id}", [MenuController::class, "update"]);
//     Route::get("/status/{id}", [MenuController::class, "status"]);
//     Route::get("/delete/{id}", [MenuController::class, "delete"]);
//     Route::get("/restore/{id}", [MenuController::class, "restore"]);
//     Route::delete("/destroy/{id}", [MenuController::class, "destroy"]);
// });

// // UC: Quản lý liên hệ
// Route::prefix("contact")->group(function() {
//     Route::get("/", [ContactController::class, "index"]);
//     Route::get("/trash", [ContactController::class, "trash"]);
//     Route::get("/show/{id}", [ContactController::class, "show"]);
//     Route::post("/reply/{id}", [ContactController::class, "reply"]);
//     Route::get("/status/{id}", [ContactController::class, "status"]);
//     Route::get("/delete/{id}", [ContactController::class, "delete"]);
//     Route::get("/restore/{id}", [ContactController::class, "restore"]);
//     Route::delete("/destroy/{id}", [ContactController::class, "destroy"]);
// });

// // UC: Quản lý bài viết
// Route::prefix("post")->group(function() {
//     Route::get("/", [PostController::class, "index"]);
//     Route::get("/trash", [PostController::class, "trash"]);
//     Route::get("/show/{id}", [PostController::class, "show"]);
//     Route::post("/store", [PostController::class, "store"]);
//     Route::post("/update/{id}", [PostController::class, "update"]);
//     Route::get("/status/{id}", [PostController::class, "status"]);
//     Route::get("/delete/{id}", [PostController::class, "delete"]);
//     Route::get("/restore/{id}", [PostController::class, "restore"]);
//     Route::delete("/destroy/{id}", [PostController::class, "destroy"]);
// });

// // UC: Quản lý chủ đề bài viết
// Route::prefix("topic")->group(function() {
//     Route::get("/", [TopicController::class, "index"]);
//     Route::get("/trash", [TopicController::class, "trash"]);
//     Route::get("/show/{id}", [TopicController::class, "show"]);
//     Route::post("/store", [TopicController::class, "store"]);
//     Route::post("/update/{id}", [TopicController::class, "update"]);
//     Route::get("/status/{id}", [TopicController::class, "status"]);
//     Route::get("/delete/{id}", [TopicController::class, "delete"]);
//     Route::get("/restore/{id}", [TopicController::class, "restore"]);
//     Route::delete("/destroy/{id}", [TopicController::class, "destroy"]);
// });
// // UC: Quản lý thành viên
// Route::prefix("user")->group(function() {
//     Route::controller(UserController::class)->group(function () {
//         Route::post("/login", [UserController::class, "login"]);
//         Route::post("/register", [UserController::class, "register"]);
//     });
//     Route::get("/", [UserController::class, "index"]);
//     Route::get("/trash", [UserController::class, "trash"]);
//     Route::get("/show/{id}", [UserController::class, "show"]);

//     Route::post("/update/{id}", [UserController::class, "update"]);
//     Route::get("/status/{id}", [UserController::class, "status"]);
//     Route::get("/delete/{id}", [UserController::class, "delete"]);
//     Route::get("/restore/{id}", [UserController::class, "restore"]);
//     Route::delete("/destroy/{id}", [UserController::class, "destroy"]);

//     // Routes cho xác thực

//     Route::middleware('auth:api')->group(function () {
//         Route::get("/profile", [UserController::class, "profile"]);
//         Route::post("/logout", [UserController::class, "logout"]);
//     });
// });

// Route::controller(UserController::class)->group(function () {
//     Route::post('login', 'login');
//     Route::post('register', 'register');
//     Route::post('logout', 'logout');
//     Route::post('refresh', 'refresh');
//     Route::get('me', 'me');
//     Route::get('show','show');
//     Route::post('loginAdmin', 'loginAdmin');

// });
// // UC: Quản lý đơn hàng
// Route::prefix("order")->group(function() {
//     Route::get("/", [OrderController::class, "index"]);
//     Route::get("/trash", [OrderController::class, "trash"]);
//     Route::post("/store", [OrderController::class, "store"]);

// Route::get("/show/{id}", [OderController::class, "show"]);
//     Route::get("/status/{id}", [OderController::class, "status"]);
//     Route::delete("/destroy/{id}", [OderController::class, "destroy"]);

// Route::post("/store", [OrderController::class, "createOrder"]);
// });

// // UC: Quản lý sản phẩm
// Route::prefix("product")->group(function() {
//     Route::get("/", [ProductController::class, "index"]);
//     Route::get("/trash", [ProductController::class, "trash"]);
//     Route::get("/show/{id}", [ProductController::class, "show"]);
//     Route::post("/store", [ProductController::class, "store"]);
//     Route::post("/update/{id}", [ProductController::class, "update"]);
//     Route::get("/status/{id}", [ProductController::class, "status"]);
//     Route::get("/delete", [ProductController::class, "getDelete"]);
//     Route::get("/restore/{id}", [ProductController::class, "restore"]);
//     Route::delete("/delete/{id}", [ProductController::class, "delete"]);
//     Route::get("/indexpro", [ProductController::class, "indexFrontend"]);
//     Route::delete("/destroy/{id}", [ProductController::class, "destroy"]);
//     Route::get("/getRelated/{categoryId}/{currentProductId}", [ProductController::class, "getRelatedProducts"]);


// });


// // UC: Quản lý sản phẩm khuyến mãi
// Route::prefix("productsale")->group(function() {
//     Route::get("/", [ProductSaleController::class, "index"]);
//     Route::get("/trash", [ProductSaleController::class, "trash"]);
//     Route::get("/show/{id}", [ProductSaleController::class, "show"]);
//     Route::post("/store", [ProductSaleController::class, "store"]);
//     Route::post("/update/{id}", [ProductSaleController::class, "update"]);
//     Route::get("/status/{id}", [ProductSaleController::class, "status"]);
//     Route::get("/delete/{id}", [ProductSaleController::class, "delete"]);
//     Route::get("/restore/{id}", [ProductSaleController::class, "restore"]);
//     Route::delete("/destroy/{id}", [ProductSaleController::class, "destroy"]);
// });

// // UC: Quản lý nhập kho
// Route::prefix("productstore")->group(function() {
//     Route::get("/", [ProductStoreController::class, "index"]);
//     Route::get("/trash", [ProductStoreController::class, "trash"]);
//     Route::get("/show/{id}", [ProductStoreController::class, "show"]);
//     Route::post("/store", [ProductStoreController::class, "store"]);
//     Route::post("/update/{id}", [ProductStoreController::class, "update"]);
//     Route::get("/status/{id}", [ProductStoreController::class, "status"]);
//     Route::get("/delete/{id}", [ProductStoreController::class, "delete"]);
//     Route::get("/restore/{id}", [ProductStoreController::class, "restore"]);
//     Route::delete("/destroy/{id}", [ProductStoreController::class, "destroy"]);
// });


// //ProductSale
// Route::prefix('productsales')->group(function () {
//     Route::get('/', [ProductSaleController::class, 'getAllProductSales']);
//     Route::get('/{id}', [ProductSaleController::class, 'getProductSale']);
//     Route::post('/{id}', [ProductSaleController::class, 'updateProductSale']);
//     Route::post('/{id}', [ProductSaleController::class, 'updatePsStatus']);
// });
