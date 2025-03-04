//Customer Registration
export interface CustomerRegistration {
    customerID: any;
    walletBalance: number;
    name: string;
    fatherName: string;
    gender: string;
    mobileNumber: string;
    dob: string;
    mailID: string;
    password: string;
    profilePhoto: string;
}

// ProductDetails
export interface ProductDetails {
    productID: string;
    productName: string;
    quantityAvailable: number;
    pricePerQuantity: number;
    productImage: string;
}

//Booking Details
export interface BookingDetails {
    bookingID: any;
    customerID: string;
    totalPrice: number;
    dateOfBooking: string;
    bookingStatus: string;
}

export interface CartDetails {
    cartID: string;
    customerID: string;
    productID: string;
    purchaseCount: number;
    priceOfCart: number;
    productImage: string;
}

export interface PurchasedItems {
    purchaseID: string;
    cartID: string;
    bookingID: string;
    productID: string;
    purchaseCount: number;
    priceOfPurchase: number;
}
