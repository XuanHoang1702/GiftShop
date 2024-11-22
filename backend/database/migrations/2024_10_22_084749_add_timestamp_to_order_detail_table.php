<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTimestampToOrderDetailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('order_details', function (Blueprint $table) {
            $table->timestamps(); // Thêm các cột created_at và updated_at
            // Hoặc thêm một cột timestamp cụ thể nếu cần:
            // $table->timestamp('your_column_name')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('order_detail', function (Blueprint $table) {
            $table->dropTimestamps(); // Xóa các cột created_at và updated_at
            // Hoặc xóa cột cụ thể nếu bạn đã thêm một cột timestamp cụ thể:
            // $table->dropColumn('your_column_name');
        });
    }
}
