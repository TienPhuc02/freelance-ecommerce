export {};
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript
declare global {
  interface OrderType {
    message: string;
    order: Order;
  }

  interface Order {
    shippingInfo: ShippingInfo;
    paymentInfo: PaymentInfo;
    _id: string;
    user: User;
    orderItems: OrderItem[];
    paymentMethod: string;
    itemsPrice: number;
    taxAmount: number;
    shippingAmount: number;
    totalAmount: number;
    orderStatus: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  interface OrderItem {
    name: string;
    quantity: string;
    price: string;
    product: Product;
    _id: string;
  }

  interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    ratings: number;
    images: Image[];
    category: string;
    seller: string;
    stock: number;
    numOfReview: number;
    reviews: any[];
    __v: number;
    createdAt?: string;
    updatedAt?: string;
  }

  interface Image {
    public_id: string;
    url: string;
    _id: string;
  }

  interface PaymentInfo {
    status: string;
  }

  interface ShippingInfo {
    address: string;
    city: string;
    phoneNumber: string;
    zipCode: string;
    country: string;
  }

  interface User {
    avatar: Avatar;
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    resetPasswordExpire: Date;
    resetPasswordToken: string;
  }

  interface Avatar {
    public_id: string;
    url: string;
  }
  interface createUser {
    email?: string;
    name?: string;
    role?: string;
    password?: string;
    avatar?: string;
  }
  interface createProduct {
    name: string;
    price: number;
    description: string;
    category: string;
    seller: string;
    images: Image[];
    stock: number;
    ratings: number;
  }
  interface DataExcel {
    name: string;
    email: string;
    role: string;
    password?: string | number;
  }
  interface OrderTable {
    _id: string;
    paymentMethod: string;
    itemsPrice: number;
    taxAmount: number;
    shippingAmount: number;
    totalAmount: number;
    orderStatus: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }
  interface OrderViewDrawer {
    shippingInfo: {
      address: string;
      city: string;
      phoneNumber: string;
      zipCode: string;
      country: string;
    };
    paymentInfo: {
      status: string;
    };
    _id: string;
    user: {
      avatar: Avatar;
      _id: string;
      name: string;
      email: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
      resetPasswordExpire: string;
      resetPasswordToken: string;
    };
    orderItems: {
      name: string;
      quantity: string;
      price: string;
      product: Product;
      _id: string;
    }[];
    paymentMethod: string;
    itemsPrice: number;
    taxAmount: number;
    shippingAmount: number;
    totalAmount: number;
    orderStatus: string;
    createdAt: string;
    updatedAt: string;
  }
}
