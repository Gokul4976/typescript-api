using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryAPI.Models
{
    public class ProductDetails
    {
         public string ProductID { get; set; }
        public string ProductName { get; set; }
        public int QuantityAvailable { get; set; }
        public double PricePerQuantity { get; set; }
        public string ProductImage {get; set;}
    }
}