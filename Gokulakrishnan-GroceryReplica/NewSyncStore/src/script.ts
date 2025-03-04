import { CustomerRegistration, ProductDetails,BookingDetails,PurchasedItems, CartDetails } from './model';
import * as APICALLS from './apicalls.js';


const signIn=document.getElementById("signIn") as HTMLDivElement;
const signUp=document.getElementById("signUp") as HTMLDivElement;
const homePage = document.getElementById("homePage") as HTMLDivElement;
var signInButton = document.getElementById("signInButton") as HTMLDivElement;
var signUpButton = document.getElementById("signUpButton") as HTMLDivElement;

const userProfilePage = document.getElementById("UserProfilePage") as HTMLDivElement;
const productProfilePage = document.getElementById("ProductProfilePage") as HTMLDivElement;
const walletRechargePage = document.getElementById("walletRechargePage") as HTMLDivElement;
const takeOrderPage = document.getElementById("TakeOrderPage") as HTMLDivElement;
const addNewProductPage = document.getElementById("addNewProduct") as HTMLDivElement;
const editProductPage = document.getElementById("editProduct") as HTMLDivElement;
const customerCartItemsPage = document.getElementById("CustomerCartItemsPage") as HTMLDivElement;
const orderHistoryPage = document.getElementById("OrderHistoryPage") as HTMLDivElement;

var currentCustomer: CustomerRegistration;
async function displayNone()
{
    signIn.style.display = "none";
    signUp.style.display = "none";
    homePage.style.display = "none";
    userProfilePage.style.display = "none";
    productProfilePage.style.display = "none";
    walletRechargePage.style.display = "none";
    takeOrderPage.style.display = "none";
    addNewProductPage.style.display = "none";
    editProductPage.style.display = "none";
    customerCartItemsPage.style.display = "none";
    orderHistoryPage.style.display = "none";
}

async function signInPage() {
    displayNone();
    signIn.style.display="block";
    signUp.style.display="none";
    // signInButton.style.background="rgb(247, 191, 113)";
    signInButton.style.background="rgba(61, 113, 193, 0.927)";
    signUpButton.style.background="none";
}
async function signUpPage() {
    displayNone();
    signUp.style.display = "block";
    signIn.style.display = "none";
    signInButton.style.background = "none";
    // signUpButton.style.background = "rgb(247, 191, 113)";
    signUpButton.style.background = "rgba(61, 113, 193, 0.927)";
}
async function submitForm(event : Event) {
    event.preventDefault();
    var name = (document.getElementById("name") as HTMLInputElement).value;
    var fatherName = (document.getElementById("fatherName") as HTMLInputElement).value;
    var gender = (document.getElementById("gender") as HTMLSelectElement).value;
    var mobile = (document.getElementById("mobile") as HTMLInputElement).value;
    var dob = (document.getElementById("dob") as HTMLInputElement).value;
    var email = (document.getElementById("email") as HTMLInputElement).value;
    var password = (document.getElementById("password") as HTMLInputElement).value;
    var walletBalance = parseFloat((document.getElementById("walletBalance") as HTMLInputElement).value);
    var profilePhotoFile = (document.getElementById("profilePhoto") as HTMLInputElement).files?.[0];
    var isavail: boolean = await APICALLS.CheckCustomer(email);
    console.log(isavail);
    if (!isavail) {

        let profilePhotoBase64 = "";
        if (profilePhotoFile) {
            profilePhotoBase64 = await convertToBase64(profilePhotoFile); // Convert the image to Base64
        }

        let newCustomer: string = await APICALLS.AddNewCustomer({ customerID: "", name: name, fatherName: fatherName, gender: gender, mobileNumber: mobile, dob: dob, mailID: email, password: password, walletBalance: walletBalance, profilePhoto: profilePhotoBase64 });
        (document.getElementById("name") as HTMLInputElement).value = "";
        (document.getElementById("fatherName") as HTMLInputElement).value = "";
        (document.getElementById("gender") as HTMLSelectElement).value = "";
        (document.getElementById("mobile") as HTMLInputElement).value = "";
        (document.getElementById("dob") as HTMLInputElement).value = "";
        (document.getElementById("email") as HTMLInputElement).value = "";
        (document.getElementById("password") as HTMLInputElement).value = "";
        (document.getElementById("walletBalance") as HTMLInputElement).value = "";
        (document.getElementById("profilePhoto") as HTMLInputElement).value = "";
        console.log(profilePhotoBase64);

        alert(`Registration Successful. Your Customer ID is ${newCustomer}.`);
    }
    else {
        var signInBorder = document.getElementById("signUp") as HTMLDivElement;
        signInBorder.style.border = "0.5px solid red";
        alert(`Already exist`)
    }
    
}
async function convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
async function signInSubmit(e: Event) {
    e.preventDefault();
    var email = document.getElementById("email1") as HTMLInputElement;
    var password = document.getElementById("password2") as HTMLInputElement;

    if (!email.value || !password.value) {
        alert("Email and Password cannot be empty");
        return;
    }

    var customer: CustomerRegistration | null = await APICALLS.GetIndividualUser(email.value, password.value);
    if (customer == null) {
        alert("Invalid Email or Password");
        email.value = "";
        password.value = "";
    }
    else {
        var boxElement = document.getElementById("box") as HTMLDivElement
        boxElement.style.display = "none";
        var menu = document.getElementById("menu") as HTMLDivElement;
        menu.style.display = "block";
        currentCustomer = customer;
        home();
        email.value = "";
        password.value = "";
    }
}
async function home() {
    displayNone();
    homePage.style.display = "block";
}

async function CustomerDetails()
{
    displayNone();
    userProfilePage.style.display="block";
    document.getElementById('user-profile-card')!.innerHTML = `
    <div class="profile-photo">
          <img src="${currentCustomer.profilePhoto}">
    </div>
    <table class="profile-table">
        <tr>
            <th>User ID</th> <td>${currentCustomer.customerID}</td>
        </tr>
        <tr>
            <th>User Name</th>  <td>${currentCustomer.name}</td>
        </tr>
        <tr>
            <th>Father Name</th>  <td>${currentCustomer.fatherName}</td>
        </tr>
        <tr>
            <th>Gender</th>  <td>${currentCustomer.gender}</td>
        </tr>
        <tr>
            <th>Mobile Number</th>  <td>${currentCustomer.mobileNumber}</td>
        </tr>
        <tr>
            <th>Mail ID</th>  <td>${currentCustomer.mailID}</td>    
        </tr>
        <tr>
            <th>DOB</th> <td>${currentCustomer.dob.split('T')[0].split('-').reverse().join('/')}</td>
        </tr>
        <tr>
            <th>Balance</th> <td>${currentCustomer.walletBalance}</td>
        </tr>
    </table>
    `;

}
async function ShowProductDetails(){
    displayNone();
    productProfilePage.style.display = "block";

    var products = await APICALLS.FetchProducts();
    var productTable = document.getElementById("product-table") as HTMLTableSectionElement;
    productTable.innerHTML = `
                <tr>
                    <th>Product Image</th> <th>Product ID</th> <th>Product Name</th> <th>Quantity</th> <th>Price</th> <th>Action</th>
                </tr>`;
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
                <tr>
                <td><img src="${product.productImage}"></td> <td>${product.productID}</td> <td>${product.productName}</td>
                <td>${product.quantityAvailable}</td> <td>${product.pricePerQuantity}</td>
                <td>
                    <button onclick="editChosenProduct('${product.productID}')">Edit</button>
                    <button onclick="deleteProduct('${product.productID}')">Delete</button>
                </td>
                </tr> `;
        productTable.appendChild(row);
    });
}
async function addProduct(e: Event) {
    e.preventDefault();
    var productName = (document.getElementById("productName") as HTMLInputElement).value;
    var quantity = parseFloat((document.getElementById("productQuantity") as HTMLInputElement).value);
    var price = parseFloat((document.getElementById("productPrice") as HTMLInputElement).value);
    var isProductValid = await APICALLS.CheckProductExist(productName);

    if (isProductValid) {
        (document.getElementById("productName") as HTMLInputElement).value = "";
        (document.getElementById("productQuantity") as HTMLInputElement).value = "";
        (document.getElementById("productPrice") as HTMLInputElement).value = "";
        (document.getElementById("add-photo") as HTMLInputElement).value = "";
        alert("This product already exists");
    }
    else {
        var productPhotoFile = (document.getElementById("add-photo") as HTMLInputElement).files?.[0];
        let productPhotoBase64 = "";
        if (productPhotoFile) {
            productPhotoBase64 = await convertToBase64(productPhotoFile); // Convert the image to Base64
        }
        let newProduct: string = await APICALLS.AddNewProduct({ productID: "", productName: productName, quantityAvailable: quantity, pricePerQuantity: price, productImage: productPhotoBase64 });
        (document.getElementById("productName") as HTMLInputElement).value = "";
        (document.getElementById("productQuantity") as HTMLInputElement).value = "";
        (document.getElementById("productPrice") as HTMLInputElement).value = "";
        (document.getElementById("add-photo") as HTMLInputElement).value = "";
        alert(`Product added successfully. Product ID is ${newProduct}`);
    }
    ShowProductDetails();
}
var currentProduct: ProductDetails | null;

async function editChosenProduct(productID: string) {
    editProductPage.style.display = "block";
    addNewProductPage.style.display = "none";
    currentProduct = await APICALLS.GetIndividualProduct(productID);
    if (currentProduct != null) {
        (document.getElementById("editProductName") as HTMLInputElement).value = currentProduct.productName;
        (document.getElementById("editProductQuantity") as HTMLInputElement).value = String(currentProduct.quantityAvailable);
        (document.getElementById("editProductPrice") as HTMLInputElement).value = String(currentProduct.pricePerQuantity);
    }
    else {
        alert("Product not found");
    }
}
async function editProduct(e: Event) {
    e.preventDefault();
    if (currentProduct != null) {

        var Name = (document.getElementById("editProductName") as HTMLInputElement).value;
        var quantity = parseFloat((document.getElementById("editProductQuantity") as HTMLInputElement).value);
        var price = parseFloat((document.getElementById("editProductPrice") as HTMLInputElement).value);
        var productPhotoFile = (document.getElementById("edit-photo") as HTMLInputElement).files?.[0];
        let productPhotoBase64 = "";
        if (productPhotoFile) {
            productPhotoBase64 = await convertToBase64(productPhotoFile); // Convert the image to Base64
        }
        await APICALLS.EditProductDetail({ productID: currentProduct.productID, productName: Name, quantityAvailable: quantity, pricePerQuantity: price, productImage: productPhotoBase64 });
        alert("Product modified successfully.");
        (document.getElementById("editProductName") as HTMLInputElement).value = "";
        (document.getElementById("editProductQuantity") as HTMLInputElement).value = "";
        (document.getElementById("editProductPrice") as HTMLInputElement).value = "";
        (document.getElementById("edit-photo") as HTMLInputElement).value = "";
        ShowProductDetails();
    }
}
async function deleteProduct(productID: string) {
    const deleteProduct = confirm('Do you want to delete this product');
    if (deleteProduct) {
        await APICALLS.DeleteProductDetail(productID);
        alert("Product deleted successfully.");
    }
    ShowProductDetails();
}
async function NewProductPage() {
    addNewProductPage.style.display = "block";
    editProductPage.style.display = "none";
}
function RechargeWallet() {
    displayNone();
    walletRechargePage.style.display = "block";
    (document.getElementById("currentBalance") as HTMLHeadingElement).innerHTML = `Available Balance : ${currentCustomer.walletBalance}`;
}
async function deposit() {
    var amount1 = (document.getElementById("amount") as HTMLInputElement).value;
    await APICALLS.RechargeWalletBalance(currentCustomer.customerID, Number(amount1));
    var customer: CustomerRegistration | null = await APICALLS.GetIndividualUser(currentCustomer.mailID, currentCustomer.password);
    currentCustomer = <CustomerRegistration>customer;
    (document.getElementById("amount") as HTMLInputElement).value = "";
    alert(`Recharge Successful. Your current balance is ${currentCustomer.walletBalance}`);
    RechargeWallet();
}
const billContentDiv = document.getElementById('bill-content') as HTMLDivElement;

async function displayBillContent(booking: BookingDetails, purchases: PurchasedItems[]) {

    const billContainer = document.createElement('div');
    billContainer.className = 'bill-container';

    const downloadButton = document.createElement('span');
    downloadButton.textContent = 'Download Bill';
    downloadButton.style.backgroundColor = '#3271a5';
    downloadButton.style.cursor = 'allowed';
    billContainer.appendChild(downloadButton);

    if (booking.bookingStatus == "Booked") {
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel Booking';
        cancelButton.disabled = false;
        cancelButton.style.backgroundColor = '#3271a5';
        cancelButton.style.cursor = 'allowed';

        billContainer.appendChild(cancelButton);

        cancelButton.onclick = () => {
            deleteSpecificBooking(booking.bookingID);
        };
    }
    else {
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel Booking';
        cancelButton.disabled = true;
        cancelButton.style.backgroundColor = 'gray';
        cancelButton.style.cursor = 'not-allowed';

        billContainer.appendChild(cancelButton);
    }
    // Display booking details
    const bookingSection = document.createElement('div');
    bookingSection.className = 'booking-details';
    bookingSection.innerHTML = `
        <h3>Booking ID: ${booking.bookingID}</h3>
        <p>Name: ${currentCustomer.name} |</p>
        <p>Booking Date: ${booking.dateOfBooking} |</p>
        <p>Status: ${booking.bookingStatus}</p>
    `;
    billContainer.appendChild(bookingSection);

    // Display purchased items
    const itemsSection = document.createElement('div');
    itemsSection.className = 'purchased-items';

    const itemsTable = document.createElement('table');
    itemsTable.className = 'items-table';
    itemsTable.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
        </tr>
    `;
    for (let item of purchases) {
        let productDetail = await APICALLS.GetIndividualProduct(item.productID);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${productDetail?.productName}</td>
            <td>${item.purchaseCount}</td>
            <td>$${item.priceOfPurchase}</td>
        `;
        itemsTable.appendChild(row);
    };

    itemsSection.appendChild(itemsTable);
    billContainer.appendChild(itemsSection);

    // Add a final total price at the bottom (if necessary)
    const totalRow = document.createElement('div');
    totalRow.className = 'total-price';
    const totalAmount = booking.totalPrice;
    totalRow.innerHTML = `<h3>Total: $${totalAmount}</h3>`;
    billContainer.appendChild(totalRow);
    billContentDiv.appendChild(billContainer);
}
async function deleteSpecificBooking(bookingID: string) {
    var deleteBooking = await APICALLS.cancelBooking(bookingID, currentCustomer.customerID);
    alert(deleteBooking);
    currentCustomer = <CustomerRegistration>await APICALLS.GetIndividualUser(currentCustomer.mailID, currentCustomer.password);
    OrderHistory();
}

async function OrderHistory() {
    displayNone();
    orderHistoryPage.style.display = "block";
    billContentDiv.innerHTML = '';
    var bookings = await APICALLS.FetchAllBookings(currentCustomer.customerID);
    var bookingTable = document.getElementById("booking-table") as HTMLTableSectionElement;
    if (bookings.length == 0) {
        bookingTable.innerHTML = '';
        const emptyCart = document.createElement('h2');
        emptyCart.textContent = 'No Bookings Found';
        emptyCart.className = 'empty';
        billContentDiv.appendChild(emptyCart);
    }
    else {

        bookingTable.innerHTML = `
                <tr>
                    <th>Booking ID</th>  <th>Total Price</th> <th>Date Of Booking</th> <th>Booking Status</th> <th>Action</th>
                </tr>
    `;
        bookings.forEach(booking => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <tr>
                    <td>${booking.bookingID}</td> <td>${booking.totalPrice}</td> <td>${booking.dateOfBooking}</td> <td>${booking.bookingStatus}</td>
                    <td>
                        <button onclick="viewBill('${booking.bookingID}')">View Bill</button>
                    </td>
                </tr>
        `;
            bookingTable.appendChild(row);
        });
    }
}
const productContainer = document.getElementById('product-container') as HTMLDivElement;

function displayProducts(products: ProductDetails[]) {
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        // Create image
        const productImage = document.createElement('img');
        productImage.src = product.productImage;
        productImage.alt = product.productName;
        productDiv.appendChild(productImage);

        // Create product name
        const productName = document.createElement('h2');
        productName.textContent = product.productName;
        productDiv.appendChild(productName);

        // Create product details (quantity, price)
        const productDetails = document.createElement('p');
        productDetails.textContent = `Available: ${product.quantityAvailable} | Price: $${product.pricePerQuantity}`;
        productDiv.appendChild(productDetails);

        // Create button
        const button = document.createElement('button');
        button.textContent = 'Add to Cart';
        productDiv.appendChild(button);

        button.onclick = function () {
            AddToCart(product.productID);
        }

        // Append to the container
        productContainer.appendChild(productDiv);
    });
}
async function AddToCart(productID: string) {
    //Prompt for asking food count
    const quantity = prompt("Enter the quantity you want to purchase");

    // Convert the string input to a number
    const quantityNumber = Number(quantity);

    // Check if the quantity is a valid number and greater than 0
    if (isNaN(quantityNumber) || quantityNumber <= 0) {
        alert("Please enter a valid quantity greater than 0.");
    }
    else {
        // Proceed with the valid quantity
        var selectedProduct: ProductDetails | null = await APICALLS.GetIndividualProduct(productID);
        if (selectedProduct != null) {
            var cartID: string = await APICALLS.AddItemToCart({ cartID: "", customerID: currentCustomer.customerID, productID: selectedProduct.productID, purchaseCount: quantityNumber, priceOfCart: quantityNumber * selectedProduct.pricePerQuantity, productImage: selectedProduct.productImage });
            alert(`${selectedProduct.productName} added to cart list with ${quantityNumber} quantity. Your OrderID is ${cartID}`);
        }
    }
    TakeOrder();
}
async function LogOut() {
    displayNone();
    (document.getElementById("menu") as HTMLDivElement).style.display = "none";
    (document.getElementById("box") as HTMLDivElement).style.display = "block";
    signIn.style.display = "block";
}
async function viewBill(bookingID: string) {
    let currentBooking: BookingDetails = <BookingDetails> await APICALLS.GetIndividualBooking(bookingID);
    billContentDiv.innerHTML = '';
    var purchases = await APICALLS.FetchPurchases(bookingID);
    displayBillContent(currentBooking, purchases);
}
async function BuySingleCartItem(cartID: string) {
    var orderConfirmation = await APICALLS.BuySingleItem(cartID, currentCustomer.customerID);
    currentCustomer = <CustomerRegistration>await APICALLS.GetIndividualUser(currentCustomer.mailID, currentCustomer.password);
    alert(orderConfirmation);
    CartItems();
}
const cartItemContainer = document.getElementById('cart-item-div') as HTMLDivElement;
async function CartItems() {
    displayNone();
    customerCartItemsPage.style.display = "block";
    var orders = await APICALLS.FetchCarts(currentCustomer.customerID);
    cartItemContainer.innerHTML = '';
    emptyCartDiv.innerHTML = '';
    displayCartItems(orders);
}
const purchaseAllButton = document.getElementById("new-order-btn") as HTMLButtonElement;
const totalPriceText = document.getElementById("showTotalPrice") as HTMLHeadingElement;
const emptyCartDiv = document.getElementById("empty-cart") as HTMLDivElement;

async function displayCartItems(carts: CartDetails[]) {
    const emptyCart = document.createElement('h2');
    if (carts.length == 0) {
        emptyCart.textContent = 'Cart Wish List is Empty';
        emptyCart.className = 'empty';
        purchaseAllButton.style.display = "none";
        totalPriceText.style.display = "none";
        emptyCartDiv.appendChild(emptyCart);
    }
    else {
        emptyCartDiv.innerHTML = '';
        emptyCart.textContent = '';
        purchaseAllButton.style.display = "block";
        totalPriceText.style.display = "block";
        var totalPrice: number = 0;
        for (const cart of carts) {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart';

            var product = await APICALLS.GetIndividualProduct(cart.productID);
            if (product != null) {
                const imageDiv = document.createElement('div');
                imageDiv.className = 'cart-div';
                const productImage = document.createElement('img');
                productImage.src = product.productImage;
                productImage.alt = product.productName;
                imageDiv.appendChild(productImage);
                cartItemDiv.appendChild(imageDiv);

                const detailsDiv = document.createElement('div');
                detailsDiv.className = 'cart-div';
                const productTitle = document.createElement('h2');
                productTitle.textContent = product.productName;
                const productPrice = document.createElement('p');
                productPrice.textContent = `Price: $${cart.priceOfCart} | Quantity: ${cart.purchaseCount}`;
                detailsDiv.appendChild(productTitle);
                detailsDiv.appendChild(productPrice);

                const modifyButton = document.createElement('button');
                modifyButton.textContent = 'Modify';
                modifyButton.onclick = () => {

                    ModifyCartCount(cart.cartID);
                };
                const outOfStock = document.createElement('p');

                if (product.quantityAvailable >= cart.purchaseCount) {
                    const buyButton = document.createElement('button');
                    buyButton.textContent = 'Buy';
                    buyButton.disabled = false;
                    buyButton.style.backgroundColor = "#28a745";
                    buyButton.style.cursor = 'allowed';
                    totalPrice += cart.priceOfCart;
                    outOfStock.textContent = '';
                    detailsDiv.appendChild(buyButton);
                    buyButton.onclick = () => {
                        BuySingleCartItem(cart.cartID);
                    };
                }
                else {
                    const buyButton = document.createElement('button');
                    buyButton.textContent = 'Buy';
                    buyButton.disabled = true;
                    buyButton.style.backgroundColor = 'gray';
                    buyButton.style.cursor = 'not-allowed';
                    outOfStock.textContent = 'Out Of Stock';
                    outOfStock.style.color = 'Gray';
                    detailsDiv.appendChild(buyButton);
                }


                detailsDiv.appendChild(modifyButton);

                detailsDiv.appendChild(outOfStock);
                cartItemDiv.appendChild(detailsDiv);

                //Delete Icon 
                const cancelIcon = document.createElement('img');
                cancelIcon.src = "Images/Close Icon.svg";
                cancelIcon.alt = "Delete Icon";
                cancelIcon.className = 'cancel-icon';
                cartItemDiv.appendChild(cancelIcon);

                cancelIcon.onclick = function () {
                    DeleteTempCartDetail(cart.cartID);
                }
                cartItemContainer.appendChild(cartItemDiv);
            }
        }
        totalPriceText.innerHTML = `Total Price: $${totalPrice}`;
    }
}
async function DeleteTempCartDetail(cartID: string) {
    const deleteProduct = confirm('Do you want to delete this cart');
    if (deleteProduct) {
        await APICALLS.DeleteCartDetail(currentCustomer.customerID, cartID);
        alert("Order deleted successfully.");
        CartItems();
    }
}
async function ModifyCartCount(cartID: string) {
    //Prompt for asking food count
    const quantity = prompt("Enter the quantity you want to purchase");

    // Convert the string input to a number
    const quantityNumber = Number(quantity);

    // Check if the quantity is a valid number and greater than 0
    if (isNaN(quantityNumber) || quantityNumber <= 0) {
        alert("Please enter a valid quantity greater than 0.");
    }
    else {
        await APICALLS.UpdateCartQuantity(currentCustomer.customerID, cartID, quantityNumber);
        alert('Order Modified Successfully.');
    }
    CartItems();
}

export async function UpdateCartQuantity(customerID: string, cartID: string, quantity: number): Promise<void> {
    let apiURL = `http://localhost:5082/api/grocerystore/cartController/update/cart/${customerID}/${cartID}/${quantity}`;
    let response = await fetch(apiURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error("Fail to update data");
    }
}


async function PurchaseAllItems() {
    var bookingStatus = await APICALLS.purchaseAll(currentCustomer.customerID);
    currentCustomer = <CustomerRegistration>await APICALLS.GetIndividualUser(currentCustomer.mailID, currentCustomer.password);
    alert(bookingStatus);
    CartItems();
}
async function TakeOrder() {
    displayNone();
    takeOrderPage.style.display = "block";
    var products = await APICALLS.FetchProducts();
    productContainer.innerHTML = '';
    displayProducts(products);

}
const functions = {home, signInPage, signUpPage,LogOut, viewBill, deleteSpecificBooking, BuySingleCartItem, OrderHistory, CartItems, AddToCart, addProduct, deposit, deleteProduct, editProduct, editChosenProduct, PurchaseAllItems, NewProductPage, CustomerDetails, signInSubmit, submitForm, displayProducts, TakeOrder, displayBillContent,  ShowProductDetails,RechargeWallet, displayNone,...APICALLS };
Object.assign(window, functions);
// const functions={displayNone,signInPage,signUpPage,submitForm,signInSubmit,home,convertToBase64,CustomerDetails,NewProductPage,RechargeWallet,deposit,OrderHistory,deleteSpecificBooking,displayBillContent,ShowProductDetails};
// Object.assign(window,functions)