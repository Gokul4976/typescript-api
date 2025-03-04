using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GroceryAPI.Models;

namespace GroceryAPI.Controllers
{
    [ApiController]
    [Route("api/grocerystore/cartController/")]
    public class CartItemsController:ControllerBase
    {
         [HttpGet("carts/{customerID}")]

        public IActionResult GetCarts(string customerID)
        {
            List<CartDetails> carts = new List<CartDetails>();
            ApplicationDBContext.cartItems.ForEach(cart =>
            {
                if (cart.CustomerID == customerID)
                {
                    carts.Add(cart);
                }
            });
            return Ok(carts);
        }

        //Adding new product
        [HttpPost("add/cartItem")]

        public IActionResult AddNewCart([FromBody] CartDetails cartItem)
        {
            cartItem.CartID = "CRID" + (4001 + ApplicationDBContext.cartItems.Count);
            ApplicationDBContext.cartItems.Add(cartItem);
            return Ok(cartItem.CartID);
        }

        [HttpPut("update/cart/{customerID}/{cartID}/{quantity}")]

        public IActionResult UpdateCartQuantity(string customerID, string cartID, int quantity)
        {
            var cart = ApplicationDBContext.cartItems.FirstOrDefault(cart => cart.CartID == cartID && cart.CustomerID == customerID);
            if (cart == null)
            {
                return NotFound();
            }
            cart.PurchaseCount = quantity;
            var product = ApplicationDBContext.products.FirstOrDefault(product => product.ProductID == cart.ProductID);
            if (product == null)
            {
                return NotFound();
            }

            cart.PriceOfCart = quantity * product.PricePerQuantity;
            return Ok();
        }

        [HttpDelete("delete/newcart/{customerID}/{cartID}")]
        public IActionResult DeleteTempOrder(string customerID, string cartID)
        {
            var cart = ApplicationDBContext.cartItems.Find(cart => cart.CartID == cartID && cart.CustomerID == customerID);
            if (cart == null)
            {
                return NotFound();
            }
            ApplicationDBContext.cartItems.Remove(cart);
            return Ok();
        }
    }
}