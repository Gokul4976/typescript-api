var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as APICALLS from './apicalls.js';
const signIn = document.getElementById("signIn");
const signUp = document.getElementById("signUp");
const homePage = document.getElementById("homePage");
var signInButton = document.getElementById("signInButton");
var signUpButton = document.getElementById("signUpButton");
const userProfilePage = document.getElementById("UserProfilePage");
const productProfilePage = document.getElementById("ProductProfilePage");
const walletRechargePage = document.getElementById("walletRechargePage");
const takeOrderPage = document.getElementById("TakeOrderPage");
const addNewProductPage = document.getElementById("addNewProduct");
const editProductPage = document.getElementById("editProduct");
const customerCartItemsPage = document.getElementById("CustomerCartItemsPage");
const orderHistoryPage = document.getElementById("OrderHistoryPage");
var currentCustomer;
function displayNone() {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
function signInPage() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        signIn.style.display = "block";
        signUp.style.display = "none";
        // signInButton.style.background="rgb(247, 191, 113)";
        signInButton.style.background = "rgba(61, 113, 193, 0.927)";
        signUpButton.style.background = "none";
    });
}
function signUpPage() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        signUp.style.display = "block";
        signIn.style.display = "none";
        signInButton.style.background = "none";
        // signUpButton.style.background = "rgb(247, 191, 113)";
        signUpButton.style.background = "rgba(61, 113, 193, 0.927)";
    });
}
function submitForm(event) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        event.preventDefault();
        var name = document.getElementById("name").value;
        var fatherName = document.getElementById("fatherName").value;
        var gender = document.getElementById("gender").value;
        var mobile = document.getElementById("mobile").value;
        var dob = document.getElementById("dob").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var walletBalance = parseFloat(document.getElementById("walletBalance").value);
        var profilePhotoFile = (_a = document.getElementById("profilePhoto").files) === null || _a === void 0 ? void 0 : _a[0];
        var isavail = yield APICALLS.CheckCustomer(email);
        console.log(isavail);
        if (!isavail) {
            let profilePhotoBase64 = "";
            if (profilePhotoFile) {
                profilePhotoBase64 = yield convertToBase64(profilePhotoFile); // Convert the image to Base64
            }
            let newCustomer = yield APICALLS.AddNewCustomer({ customerID: "", name: name, fatherName: fatherName, gender: gender, mobileNumber: mobile, dob: dob, mailID: email, password: password, walletBalance: walletBalance, profilePhoto: profilePhotoBase64 });
            document.getElementById("name").value = "";
            document.getElementById("fatherName").value = "";
            document.getElementById("gender").value = "";
            document.getElementById("mobile").value = "";
            document.getElementById("dob").value = "";
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            document.getElementById("walletBalance").value = "";
            document.getElementById("profilePhoto").value = "";
            console.log(profilePhotoBase64);
            alert(`Registration Successful. Your Customer ID is ${newCustomer}.`);
        }
        else {
            var signInBorder = document.getElementById("signUp");
            signInBorder.style.border = "0.5px solid red";
            alert(`Already exist`);
        }
    });
}
function convertToBase64(file) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    });
}
function signInSubmit(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        var email = document.getElementById("email1");
        var password = document.getElementById("password2");
        if (!email.value || !password.value) {
            alert("Email and Password cannot be empty");
            return;
        }
        var customer = yield APICALLS.GetIndividualUser(email.value, password.value);
        if (customer == null) {
            alert("Invalid Email or Password");
            email.value = "";
            password.value = "";
        }
        else {
            var boxElement = document.getElementById("box");
            boxElement.style.display = "none";
            var menu = document.getElementById("menu");
            menu.style.display = "block";
            currentCustomer = customer;
            home();
            email.value = "";
            password.value = "";
        }
    });
}
function home() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        homePage.style.display = "block";
    });
}
function CustomerDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        userProfilePage.style.display = "block";
        document.getElementById('user-profile-card').innerHTML = `
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
    });
}
function ShowProductDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        productProfilePage.style.display = "block";
        var products = yield APICALLS.FetchProducts();
        var productTable = document.getElementById("product-table");
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
    });
}
function addProduct(e) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        e.preventDefault();
        var productName = document.getElementById("productName").value;
        var quantity = parseFloat(document.getElementById("productQuantity").value);
        var price = parseFloat(document.getElementById("productPrice").value);
        var isProductValid = yield APICALLS.CheckProductExist(productName);
        if (isProductValid) {
            document.getElementById("productName").value = "";
            document.getElementById("productQuantity").value = "";
            document.getElementById("productPrice").value = "";
            document.getElementById("add-photo").value = "";
            alert("This product already exists");
        }
        else {
            var productPhotoFile = (_a = document.getElementById("add-photo").files) === null || _a === void 0 ? void 0 : _a[0];
            let productPhotoBase64 = "";
            if (productPhotoFile) {
                productPhotoBase64 = yield convertToBase64(productPhotoFile); // Convert the image to Base64
            }
            let newProduct = yield APICALLS.AddNewProduct({ productID: "", productName: productName, quantityAvailable: quantity, pricePerQuantity: price, productImage: productPhotoBase64 });
            document.getElementById("productName").value = "";
            document.getElementById("productQuantity").value = "";
            document.getElementById("productPrice").value = "";
            document.getElementById("add-photo").value = "";
            alert(`Product added successfully. Product ID is ${newProduct}`);
        }
        ShowProductDetails();
    });
}
var currentProduct;
function editChosenProduct(productID) {
    return __awaiter(this, void 0, void 0, function* () {
        editProductPage.style.display = "block";
        addNewProductPage.style.display = "none";
        currentProduct = yield APICALLS.GetIndividualProduct(productID);
        if (currentProduct != null) {
            document.getElementById("editProductName").value = currentProduct.productName;
            document.getElementById("editProductQuantity").value = String(currentProduct.quantityAvailable);
            document.getElementById("editProductPrice").value = String(currentProduct.pricePerQuantity);
        }
        else {
            alert("Product not found");
        }
    });
}
function editProduct(e) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        e.preventDefault();
        if (currentProduct != null) {
            var Name = document.getElementById("editProductName").value;
            var quantity = parseFloat(document.getElementById("editProductQuantity").value);
            var price = parseFloat(document.getElementById("editProductPrice").value);
            var productPhotoFile = (_a = document.getElementById("edit-photo").files) === null || _a === void 0 ? void 0 : _a[0];
            let productPhotoBase64 = "";
            if (productPhotoFile) {
                productPhotoBase64 = yield convertToBase64(productPhotoFile); // Convert the image to Base64
            }
            yield APICALLS.EditProductDetail({ productID: currentProduct.productID, productName: Name, quantityAvailable: quantity, pricePerQuantity: price, productImage: productPhotoBase64 });
            alert("Product modified successfully.");
            document.getElementById("editProductName").value = "";
            document.getElementById("editProductQuantity").value = "";
            document.getElementById("editProductPrice").value = "";
            document.getElementById("edit-photo").value = "";
            ShowProductDetails();
        }
    });
}
function deleteProduct(productID) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteProduct = confirm('Do you want to delete this product');
        if (deleteProduct) {
            yield APICALLS.DeleteProductDetail(productID);
            alert("Product deleted successfully.");
        }
        ShowProductDetails();
    });
}
function NewProductPage() {
    return __awaiter(this, void 0, void 0, function* () {
        addNewProductPage.style.display = "block";
        editProductPage.style.display = "none";
    });
}
function RechargeWallet() {
    displayNone();
    walletRechargePage.style.display = "block";
    document.getElementById("currentBalance").innerHTML = `Available Balance : ${currentCustomer.walletBalance}`;
}
function deposit() {
    return __awaiter(this, void 0, void 0, function* () {
        var amount1 = document.getElementById("amount").value;
        yield APICALLS.RechargeWalletBalance(currentCustomer.customerID, Number(amount1));
        var customer = yield APICALLS.GetIndividualUser(currentCustomer.mailID, currentCustomer.password);
        currentCustomer = customer;
        document.getElementById("amount").value = "";
        alert(`Recharge Successful. Your current balance is ${currentCustomer.walletBalance}`);
        RechargeWallet();
    });
}
const billContentDiv = document.getElementById('bill-content');
function displayBillContent(booking, purchases) {
    return __awaiter(this, void 0, void 0, function* () {
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
            let productDetail = yield APICALLS.GetIndividualProduct(item.productID);
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${productDetail === null || productDetail === void 0 ? void 0 : productDetail.productName}</td>
            <td>${item.purchaseCount}</td>
            <td>$${item.priceOfPurchase}</td>
        `;
            itemsTable.appendChild(row);
        }
        ;
        itemsSection.appendChild(itemsTable);
        billContainer.appendChild(itemsSection);
        // Add a final total price at the bottom (if necessary)
        const totalRow = document.createElement('div');
        totalRow.className = 'total-price';
        const totalAmount = booking.totalPrice;
        totalRow.innerHTML = `<h3>Total: $${totalAmount}</h3>`;
        billContainer.appendChild(totalRow);
        billContentDiv.appendChild(billContainer);
    });
}
function deleteSpecificBooking(bookingID) {
    return __awaiter(this, void 0, void 0, function* () {
        var deleteBooking = yield APICALLS.cancelBooking(bookingID, currentCustomer.customerID);
        alert(deleteBooking);
        currentCustomer = (yield APICALLS.GetIndividualUser(currentCustomer.mailID, currentCustomer.password));
        OrderHistory();
    });
}
function OrderHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        orderHistoryPage.style.display = "block";
        billContentDiv.innerHTML = '';
        var bookings = yield APICALLS.FetchAllBookings(currentCustomer.customerID);
        var bookingTable = document.getElementById("booking-table");
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
    });
}
const productContainer = document.getElementById('product-container');
function displayProducts(products) {
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
        };
        // Append to the container
        productContainer.appendChild(productDiv);
    });
}
function AddToCart(productID) {
    return __awaiter(this, void 0, void 0, function* () {
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
            var selectedProduct = yield APICALLS.GetIndividualProduct(productID);
            if (selectedProduct != null) {
                var cartID = yield APICALLS.AddItemToCart({ cartID: "", customerID: currentCustomer.customerID, productID: selectedProduct.productID, purchaseCount: quantityNumber, priceOfCart: quantityNumber * selectedProduct.pricePerQuantity, productImage: selectedProduct.productImage });
                alert(`${selectedProduct.productName} added to cart list with ${quantityNumber} quantity. Your OrderID is ${cartID}`);
            }
        }
        TakeOrder();
    });
}
function LogOut() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        document.getElementById("menu").style.display = "none";
        document.getElementById("box").style.display = "block";
        signIn.style.display = "block";
    });
}
function viewBill(bookingID) {
    return __awaiter(this, void 0, void 0, function* () {
        let currentBooking = yield APICALLS.GetIndividualBooking(bookingID);
        billContentDiv.innerHTML = '';
        var purchases = yield APICALLS.FetchPurchases(bookingID);
        displayBillContent(currentBooking, purchases);
    });
}
function BuySingleCartItem(cartID) {
    return __awaiter(this, void 0, void 0, function* () {
        var orderConfirmation = yield APICALLS.BuySingleItem(cartID, currentCustomer.customerID);
        currentCustomer = (yield APICALLS.GetIndividualUser(currentCustomer.mailID, currentCustomer.password));
        alert(orderConfirmation);
        CartItems();
    });
}
const cartItemContainer = document.getElementById('cart-item-div');
function CartItems() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        customerCartItemsPage.style.display = "block";
        var orders = yield APICALLS.FetchCarts(currentCustomer.customerID);
        cartItemContainer.innerHTML = '';
        emptyCartDiv.innerHTML = '';
        displayCartItems(orders);
    });
}
const purchaseAllButton = document.getElementById("new-order-btn");
const totalPriceText = document.getElementById("showTotalPrice");
const emptyCartDiv = document.getElementById("empty-cart");
function displayCartItems(carts) {
    return __awaiter(this, void 0, void 0, function* () {
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
            var totalPrice = 0;
            for (const cart of carts) {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.className = 'cart';
                var product = yield APICALLS.GetIndividualProduct(cart.productID);
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
                    };
                    cartItemContainer.appendChild(cartItemDiv);
                }
            }
            totalPriceText.innerHTML = `Total Price: $${totalPrice}`;
        }
    });
}
function DeleteTempCartDetail(cartID) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteProduct = confirm('Do you want to delete this cart');
        if (deleteProduct) {
            yield APICALLS.DeleteCartDetail(currentCustomer.customerID, cartID);
            alert("Order deleted successfully.");
            CartItems();
        }
    });
}
function ModifyCartCount(cartID) {
    return __awaiter(this, void 0, void 0, function* () {
        //Prompt for asking food count
        const quantity = prompt("Enter the quantity you want to purchase");
        // Convert the string input to a number
        const quantityNumber = Number(quantity);
        // Check if the quantity is a valid number and greater than 0
        if (isNaN(quantityNumber) || quantityNumber <= 0) {
            alert("Please enter a valid quantity greater than 0.");
        }
        else {
            yield APICALLS.UpdateCartQuantity(currentCustomer.customerID, cartID, quantityNumber);
            alert('Order Modified Successfully.');
        }
        CartItems();
    });
}
export function UpdateCartQuantity(customerID, cartID, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = `http://localhost:5082/api/grocerystore/cartController/update/cart/${customerID}/${cartID}/${quantity}`;
        let response = yield fetch(apiURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error("Fail to update data");
        }
    });
}
function PurchaseAllItems() {
    return __awaiter(this, void 0, void 0, function* () {
        var bookingStatus = yield APICALLS.purchaseAll(currentCustomer.customerID);
        currentCustomer = (yield APICALLS.GetIndividualUser(currentCustomer.mailID, currentCustomer.password));
        alert(bookingStatus);
        CartItems();
    });
}
function TakeOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        takeOrderPage.style.display = "block";
        var products = yield APICALLS.FetchProducts();
        productContainer.innerHTML = '';
        displayProducts(products);
    });
}
const functions = Object.assign({ home, signInPage, signUpPage, LogOut, viewBill, deleteSpecificBooking, BuySingleCartItem, OrderHistory, CartItems, AddToCart, addProduct, deposit, deleteProduct, editProduct, editChosenProduct, PurchaseAllItems, NewProductPage, CustomerDetails, signInSubmit, submitForm, displayProducts, TakeOrder, displayBillContent, ShowProductDetails, RechargeWallet, displayNone }, APICALLS);
Object.assign(window, functions);
// const functions={displayNone,signInPage,signUpPage,submitForm,signInSubmit,home,convertToBase64,CustomerDetails,NewProductPage,RechargeWallet,deposit,OrderHistory,deleteSpecificBooking,displayBillContent,ShowProductDetails};
// Object.assign(window,functions)
