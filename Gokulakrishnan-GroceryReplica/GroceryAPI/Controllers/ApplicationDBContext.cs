using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GroceryAPI.Models;

namespace GroceryAPI.Controllers
{
    public class ApplicationDBContext
    {
        public static List<CustomerRegistration> customers = new List<CustomerRegistration>()
        {
            new CustomerRegistration{ CustomerID = "CID1001", Name = "Saravanan", FatherName = "Anandhan", DOB = new DateTime(2005,06,22), Gender = "Male", MailID = "saravanan@gmail.com", MobileNumber = "8347484894", Password = "Saravana@123", WalletBalance = 1000, ProfilePhoto = "Images/ProfilePic.png"}
        };

        public static List<ProductDetails> products = new List<ProductDetails>()
        {
            new ProductDetails{ ProductID = "PID2001", ProductName = "Sugar", QuantityAvailable = 20, PricePerQuantity = 40, ProductImage = "Images/Sugar.jpg"},
            new ProductDetails{ ProductID = "PID2002", ProductName = "Rice", QuantityAvailable = 100, PricePerQuantity = 50, ProductImage = "Images/Rice.jpg"},
            new ProductDetails{ ProductID = "PID2003", ProductName = "Milk", QuantityAvailable = 10, PricePerQuantity = 40, ProductImage = "Images/Milk.jpg"},
            new ProductDetails{ ProductID = "PID2004", ProductName = "Coffee Powder", QuantityAvailable = 10, PricePerQuantity = 10, ProductImage = "Images/Coffee Powder.jpg"},
            new ProductDetails{ ProductID = "PID2005", ProductName = "Tea Powder", QuantityAvailable = 10, PricePerQuantity = 10, ProductImage = "Images/Tea Powder.jpg"},
            new ProductDetails{ ProductID = "PID2006", ProductName = "Garam Masala", QuantityAvailable = 10, PricePerQuantity = 20, ProductImage = "Images/Garam Masala Powder.jpg"},
            new ProductDetails{ ProductID = "PID2007", ProductName = "Salt", QuantityAvailable = 10, PricePerQuantity = 10, ProductImage = "Images/Salt.jpg"},
            new ProductDetails{ ProductID = "PID2008", ProductName = "Turmeric Powder", QuantityAvailable = 10, PricePerQuantity = 25, ProductImage = "Images/Turmeric Powder.jpg"},
            new ProductDetails{ ProductID = "PID2009", ProductName = "Chilli Powder", QuantityAvailable = 10, PricePerQuantity = 20, ProductImage = "Images/Chilli Powder.jpg"},
            new ProductDetails{ ProductID = "PID2010", ProductName = "Groundnut Oil", QuantityAvailable = 10, PricePerQuantity = 140, ProductImage = "Images/Groundnut Oil.jpg"}
        };

        public static List<CartDetails> cartItems = new List<CartDetails>();
        public static List<PurchasedItems> purchasedItems = new List<PurchasedItems>();
        public static List<BookingDetails> bookings = new List<BookingDetails>();
    }
}