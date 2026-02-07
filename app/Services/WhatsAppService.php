<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;

class WhatsAppService
{
    /**
     * Send WhatsApp notification using deep link
     * 
     * @param string $phone Phone number (with country code, e.g., +94771234567)
     * @param string $message Message to send
     * @return string WhatsApp deep link URL
     */
    public static function sendNotification(string $phone, string $message): string
    {
        // Remove any non-numeric characters except +
        $phone = preg_replace('/[^0-9+]/', '', $phone);

        // Ensure phone starts with country code (default to +94 for Sri Lanka if no +)
        if (!str_starts_with($phone, '+')) {
            // If it starts with 0, replace with +94
            if (str_starts_with($phone, '0')) {
                $phone = '+94' . substr($phone, 1);
            } else {
                // Assume it's already without leading 0, add +94
                $phone = '+94' . $phone;
            }
        }

        // Encode the message for URL
        $encodedMessage = urlencode($message);

        // Create WhatsApp deep link
        $whatsappUrl = "https://wa.me/{$phone}?text={$encodedMessage}";

        Log::info('WhatsApp notification prepared', [
            'phone' => $phone,
            'message' => $message,
            'url' => $whatsappUrl,
        ]);

        return $whatsappUrl;
    }

    /**
     * Send order notification to supplier
     * 
     * @param string $supplierPhone Supplier's phone number
     * @param int $orderId Order ID
     * @param string $buyerName Buyer's name
     * @param array $products Array of product names
     * @return string WhatsApp deep link URL
     */
    public static function sendOrderNotificationToSupplier(
        string $supplierPhone,
        int $orderId,
        string $buyerName,
        array $products = []
    ): string {
        $productList = !empty($products)
            ? "\n\nProducts:\n" . implode("\n", array_map(fn($p) => "• {$p}", $products))
            : '';

        $message = "🛒 New Order Received!\n\n"
            . "Order ID: #{$orderId}\n"
            . "Buyer: {$buyerName}"
            . $productList
            . "\n\nPlease check your supplier dashboard to view order details and update the status.";

        return self::sendNotification($supplierPhone, $message);
    }

    /**
     * Send order status update notification to buyer
     * 
     * @param string $buyerPhone Buyer's phone number
     * @param int $orderId Order ID
     * @param string $status New order status
     * @return string WhatsApp deep link URL
     */
    public static function sendStatusUpdateToBuyer(
        string $buyerPhone,
        int $orderId,
        string $status
    ): string {
        $statusLabel = match ($status) {
            'pending' => 'Pending',
            'accepted' => 'Accepted',
            'packed' => 'Packed',
            'dispatched' => 'Dispatched',
            'out_for_delivery' => 'Out for Delivery',
            'delivered' => 'Delivered',
            'cancelled' => 'Cancelled',
            default => ucfirst(str_replace('_', ' ', $status)),
        };

        $message = "📦 Order Status Update\n\n"
            . "Order ID: #{$orderId}\n"
            . "Status: {$statusLabel}\n\n"
            . "Track your order in the app for more details.";

        return self::sendNotification($buyerPhone, $message);
    }
}
