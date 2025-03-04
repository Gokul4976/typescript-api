using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryAPI.Models
{
    public class PurchasedItems
    {
        public string PurchaseID { get; set; }
        public string CartID { get; set; }
        public string BookingID { get; set; }
        public string ProductID { get; set; }
        public int PurchaseCount { get; set; }
        public double PriceOfPurchase { get; set; }
    }
}