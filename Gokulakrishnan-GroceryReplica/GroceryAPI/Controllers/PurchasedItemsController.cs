using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GroceryAPI.Models;

namespace GroceryAPI.Controllers
{
    [ApiController]
    [Route("api/grocerystore/purchasecontroller/")]
    public class PurchasedItemsController:ControllerBase
    {
         [HttpPost("add/purchases")]
        public IActionResult AddNewPurchasesOfCustomer([FromBody] string customerID)
        {
            double totalPrice = 0;
            var customer = ApplicationDBContext.customers.FirstOrDefault(user => user.CustomerID == customerID);

            if (customer == null)
            {
                return NotFound();
            }

            List<CartDetails> tempCartsForPurchase = new List<CartDetails>();
            string purchaseStatus = "";
            foreach (var cart in ApplicationDBContext.cartItems)
            {
                //Check if the cart is customer's cart
                if (cart.CustomerID == customerID)
                {
                    // Find the product in the products list by ProductID
                    var product = ApplicationDBContext.products.FirstOrDefault(p => p.ProductID == cart.ProductID);

                    // Check if product is found and if stock is available
                    if (product != null)
                    {
                        if (product.QuantityAvailable >= cart.PurchaseCount)
                        {

                            // Add the item price to the total price
                            totalPrice += cart.PriceOfCart;
                            tempCartsForPurchase.Add(cart);
                        }
                    }
                }
            }

            if (totalPrice == 0)
            {
                purchaseStatus = "Sorry all products are out of stock to purchase.";
            }
            else if (customer.WalletBalance < totalPrice)
            {
                purchaseStatus = "Insufficient balance to make your purchase. Please recharge";
            }
            else
            {
                //Create new booking
                BookingDetails booking = new BookingDetails();
                booking.BookingID = "BID" + (ApplicationDBContext.bookings.Count + 3001);
                booking.CustomerID = customerID;
                booking.TotalPrice = totalPrice;
                booking.DateOfBooking = DateTime.Now.ToString("dd/MM/yyyy");
                booking.BookingStatus = "Booked";
                ApplicationDBContext.bookings.Add(booking);
                //Decrease customers wallet balance
                customer.WalletBalance -= totalPrice;

                foreach (CartDetails cart in tempCartsForPurchase)
                {
                    //Create purchase ID
                    string purchaseID = "PRID" + (ApplicationDBContext.purchasedItems.Count + 5001);
                    //Add purchase to purchase list
                    ApplicationDBContext.purchasedItems.Add(new PurchasedItems { PurchaseID = purchaseID, CartID = cart.CartID, BookingID = booking.BookingID, ProductID = cart.ProductID, PurchaseCount = cart.PurchaseCount, PriceOfPurchase = cart.PriceOfCart });
                    // Find the product in the products list by ProductID
                    var product = ApplicationDBContext.products.FirstOrDefault(p => p.ProductID == cart.ProductID);
                    //Deduct product quantity
                    product.QuantityAvailable -= cart.PurchaseCount;
                    //Remove cartItem from list after moving it to purchased item list
                    ApplicationDBContext.cartItems.Remove(cart);
                }

                purchaseStatus = $"Booking Successfull. Your Booking ID is {booking.BookingID}";
            }

            return Ok(purchaseStatus);
        }

        [HttpGet("fetchbookings/get/{bookingID}")]

        public IActionResult GetBooking(string bookingID)
        {
            BookingDetails booking1 = default;
            ApplicationDBContext.bookings.ForEach(booking =>
            {
                if (booking.BookingID == bookingID)
                {
                   booking1 = booking;
                }
            });
            return Ok(booking1);
        }

        [HttpGet("fetchbookings/{customerID}")]

        public IActionResult GetBookings(string customerID)
        {
            List<BookingDetails> bookings = new List<BookingDetails>();
            ApplicationDBContext.bookings.ForEach(booking =>
            {
                if (booking.CustomerID == customerID)
                {
                    bookings.Add(booking);
                }
            });
            return Ok(bookings);
        }

        [HttpGet("fetchpurchases/{bookingID}")]

        public IActionResult GetPurchases(string bookingID)
        {
            List<PurchasedItems> purchases = new List<PurchasedItems>();
            foreach (PurchasedItems purchased in ApplicationDBContext.purchasedItems)
            {
                if (purchased.BookingID == bookingID)
                {
                    purchases.Add(purchased);
                }
            }
            return Ok(purchases);
        }

        [HttpPut("new/singleBooking/{cartID}/{customerID}")]
        public IActionResult BuySingleItem(string cartID, string customerID)
        {
            var cartItem = ApplicationDBContext.cartItems.Find(cart => cart.CartID == cartID && cart.CustomerID == customerID);
            string purchaseStatus = "";
            if (cartItem == null)
            {
                return NotFound();
            }
            var customer = ApplicationDBContext.customers.Find(customer => customer.CustomerID == customerID);
            if (customer != null && customer.WalletBalance >= cartItem.PriceOfCart)
            {
                string bookingID = "BID" + (3001 + ApplicationDBContext.bookings.Count);
                customer.WalletBalance -= cartItem.PriceOfCart;
                DateTime date = DateTime.Now;
                ApplicationDBContext.bookings.Add(new BookingDetails { BookingID = bookingID, CustomerID = customerID, TotalPrice = cartItem.PriceOfCart, DateOfBooking = date.ToString("dd/MM/yyyy"), BookingStatus = "Booked" });

                //Create purchase ID
                string purchaseID = "PRID" + (ApplicationDBContext.purchasedItems.Count + 5001);
                //Add purchase to purchase list
                ApplicationDBContext.purchasedItems.Add(new PurchasedItems { PurchaseID = purchaseID, CartID = cartItem.CartID, BookingID = bookingID, ProductID = cartItem.ProductID, PurchaseCount = cartItem.PurchaseCount, PriceOfPurchase = cartItem.PriceOfCart });
                // Find the product in the products list by ProductID
                var product = ApplicationDBContext.products.FirstOrDefault(p => p.ProductID == cartItem.ProductID);
                //Deduct product quantity
                product.QuantityAvailable -= cartItem.PurchaseCount;
                //Remove cartItem from list after moving it to purchased item list
                ApplicationDBContext.cartItems.Remove(cartItem);

                purchaseStatus = $"Booking Successful. Your Booking ID is {bookingID}";
                return Ok(purchaseStatus);
            }
            else
            {
                purchaseStatus = "Insufficient balance to make this purchase";
                return Ok(purchaseStatus);
            }
        }

        [HttpPut("cancel/booking/{bookingID}/{customerID}")]
        public IActionResult CancelBooking(string bookingID, string customerID)
        {
            var booking = ApplicationDBContext.bookings.FirstOrDefault(booking => booking.BookingID == bookingID && booking.BookingStatus == "Booked" && booking.CustomerID == customerID);
            var customer = ApplicationDBContext.customers.FirstOrDefault(customer => customer.CustomerID == customerID);
            if (booking == null || customer == null)
            {
                return NotFound();
            }
            booking.BookingStatus = "Cancelled";
            customer.WalletBalance += booking.TotalPrice;
            ApplicationDBContext.purchasedItems.ForEach(purchase => {
                if(booking.BookingID == purchase.BookingID)
                {
                    var product = ApplicationDBContext.products.FirstOrDefault(product => product.ProductID == purchase.ProductID);
                    if(product != null)
                    {
                        product.QuantityAvailable += purchase.PurchaseCount;
                    }
                }
            });
            
            return Ok("Order cancelled successfully");
        }
    }
}