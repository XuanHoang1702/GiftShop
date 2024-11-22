<?php

namespace App\Http\Controllers;
use App\Models\Brand;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Productstore;
use Illuminate\Support\Facades\Validator;
use App\Models\Productimage;
use App\Models\Category;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Product::with(['brand', 'image', 'productstore'])
                    ->whereNotExists(function($query) {
                        $query->select(DB::raw(1))
                                ->from('product_sale')
                                ->whereColumn('product_sale.product_id', 'products.id');
                    })
                    ->orderBy('created_at', 'desc')
                    ->paginate(8);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'string|required',
            'slug'=>'string|required',
            'category_id'=>'integer|required|exists:categories,id',
            'brand_id'=>'integer|required|exists:brands,id',
            'content'=>'string|required',
            'description'=>'string|nullable',
            'pricebuy'=>'numeric|required',
            'status'=>'integer|required',

            'priceroot'=>'numeric|required',
            'qty'=>'integer|required',
            'dateimport'=>'date|nullable',

            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        try {
            $product = Product::create($request->only([
                'name',
                'slug',
                'category_id',
                'brand_id',
                'content',
                'description',
                'pricebuy',
                'status',
            ]));

            $productstore = Productstore::create([
                'product_id' => $product->id,
                'priceroot' => $request->input('priceroot'),
                'qty' => $request->input('qty'),
                'dateimport' => $request->input('dateimport'),
                'status' => $product->status,
            ]);
            $imageName = null;
            if ($request->hasFile('thumbnail')) {
                $imageName = $request->file('thumbnail')->getClientOriginalName();
                $request->file('thumbnail')->storeAs('images', $imageName, 'public');
            }
            $productimage = Productimage::create([
                'product_id' => $product->id,
                'thumbnail' => $imageName,
            ]);
            $productData = $product->only([
                'id', 'name', 'slug', 'category_id', 'brand_id', 'content', 'description', 'pricebuy', 'status'
            ],200);
            return response()->json(['data' => $productData, $productimage->thumbnail], 201);
        } catch (\Exception $e) {
            \Log::error('Error: '.$e->getMessage());
            return response()->json(['error' => $e], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $product = Product::with('productsale')->find($id);

        if(!$product){
            return response()->json(['error' => 'Product not found'], 422);
        }

        $response = [
            'data' => [
                'id' => $product->id,
                'name' => $product->name,
                'pricebuy' => $product->pricebuy,
                'pricesale' => $product->productsale->pricesale ?? null,
                'content' => $product->content,
            ]
        ];

        return response()->json($response, 200);
    }

    public function showAll(Request $request)
    {
        try {
            $perPage = 8;
            $products = Product::where('status', 1)->paginate($perPage);
            return response()->json([
                'success' => true,
                'data' => $products,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve products',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully'], 200);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
        $products = Product::where('name', 'LIKE', "%{$query}%")
                        ->orWhere('description', 'LIKE', "%{$query}%")
                        ->get();
        return response()->json($products);
    }

    public function getProductByCategory($id){
        $products = Product::where('category_id', $id)->with('category')->get();
        $category = Category::find($id);
        $categoryName = $category->name;
        if ($products->isEmpty()) {
            return response()->json(['error' => 'No products found in this category'], 422);
        }
        return response()
        ->json([
            'data' => $products,
            'category' => $categoryName]
        , 200);
    }

    public function getProductByPrice(Request $request)
    {
        $validate = Validator::make($request->all(),[
            'min_price' => 'required|numeric|min:0',
            'max_price' => 'required|numeric|gte:min_price',
        ]);
        if ($validate->fails()) {
            return response()->json(['error' => 'Invalid request'], 422);
        }
        else
        {
            $minPrice = $request->input('min_price');
            $maxPrice = $request->input('max_price');
            $products = Product::whereBetween('pricebuy', [$minPrice, $maxPrice])->get();
            return response()->json($products);
        }
    }

    public function getProductByBrand($id)
    {
        $products = Product::where('brand_id', $id)->with('brand')->get();
        $brand = Brand::find($id);
        $brandName = $brand->name;
        if ($products->isEmpty()) {
            return response()->json(['error' => 'No products found in this brand'], 422);
        }
        return response()
        ->json([
            'data' => $products,
            'brand' => $brandName]
        , 200);
    }

    public function getProductBestSaler()
    {
        $perPage = 8 ;
        $products = Product::select('products.*')
            ->join('order_details', 'products.id', '=', 'order_details.product_id')
            ->groupBy('products.id')
            ->orderByRaw('SUM(db_order_details.quantity) DESC')
            ->paginate($perPage);

        if ($products->isEmpty()) {
            return response()->json(['error' => 'No products found'], 404);
        }

        return response()->json($products);
    }


    public function relatedProduct($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('brand_id', $product->brand_id)
            ->where('id', '!=', $id)
            ->take(5)
            ->get();

        return response()->json($relatedProducts);
    }

    public function lastest()
    {
        $perPage = 8;
        return Product::orderBy('created_at', 'desc')->paginate($perPage);
    }

    public function sortByPrice($status)
    {
        $perPage = 8;
        $status = strtolower($status);
        if (!in_array($status, ['asc', 'desc'])) {
            abort(400, 'Invalid sort status');
        }
        return Product::orderBy('pricebuy', $status)->paginate($perPage);
    }

    public function getTrash()
    {
        $trash = Product::where('status', 2)->get();
        if($trash == null)
        {
            return response()->json(['Trash empty'], 200);
        }else{
            return response()->json($trash, 200);
        }
    }


    public function putTrash($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'product not found'], 404);
        }

        $product->status = 2;
        $product->save();
        return response()->json(['message' => 'Successfully'], 200);
    }
    public function restore($id)
    {
        $product = Product::find($id);
        if($product == null)
        {
            $result =[
                'status'=>false,
                'message'=>'product not found',
                'product'=>$product
            ];
        } elseif($product->status!=2) {
            $result =[
                'status'=>false,
                'message'=>'Data not found',
                'product'=>null
            ];
        }
        else
        {
            $product->status = 1;
            $product->updated_at =  date('Y-m-d H:i:s');
            $product->save();
            $result =[
                'status'=>true,
                'message'=>'Data restored',
                'product'=>$product
            ];
        }
        return response()->json($result);
    }

}
