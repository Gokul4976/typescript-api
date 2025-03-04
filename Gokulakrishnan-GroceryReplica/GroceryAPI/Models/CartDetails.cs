using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryAPI.Models
{
    public class CartDetails
    {
        public string CartID { get; set; }
        public string CustomerID { get; set; }
        public string ProductID { get; set; }
        public int PurchaseCount { get; set; }
        public double PriceOfCart { get; set; }
        public string ProductImage { get; set; }
    }
}