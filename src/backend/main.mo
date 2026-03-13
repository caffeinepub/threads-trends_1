import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Order "mo:core/Order";

actor {
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    category : Category;
    imageUrl : Text;
  };

  module Product {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Int.compare(p1.id.toInt(), p2.id.toInt());
    };
  };

  type CartItem = {
    productId : Nat;
    quantity : Nat;
  };

  module CartItem {
    public func compare(c1 : CartItem, c2 : CartItem) : Order.Order {
      Int.compare(c1.productId.toInt(), c2.productId.toInt());
    };
  };

  type Category = {
    #tops;
    #bottoms;
    #accessories;
  };

  let products = Map.empty<Nat, Product>();
  let carts = Map.empty<Principal, Map.Map<Nat, CartItem>>();
  var nextProductId = 1;

  public shared ({ caller }) func addProduct(name : Text, description : Text, price : Nat, category : Category, imageUrl : Text) : async () {
    let product : Product = {
      id = nextProductId;
      name;
      description;
      price;
      category;
      imageUrl;
    };
    products.add(nextProductId, product);
    nextProductId += 1;
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProductsByCategory(category : Category) : async [Product] {
    products.values().toArray().filter(
      func(p) { p.category == category }
    );
  };

  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async () {
    if (quantity == 0) { Runtime.trap("Quantity must be greater than 0") };
    if (not products.containsKey(productId)) {
      Runtime.trap("Product does not exist");
    };

    let cart = switch (carts.get(caller)) {
      case (null) { Map.empty<Nat, CartItem>() };
      case (?existingCart) { existingCart };
    };

    let cartItem = {
      productId;
      quantity;
    };
    cart.add(productId, cartItem);
    carts.add(caller, cart);
  };

  public shared ({ caller }) func removeFromCart(productId : Nat) : async () {
    switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart is empty") };
      case (?cart) {
        if (not cart.containsKey(productId)) { Runtime.trap("Product not in cart") };
        cart.remove(productId);
      };
    };
  };

  public shared ({ caller }) func updateCartItem(productId : Nat, quantity : Nat) : async () {
    if (quantity == 0) { Runtime.trap("Quantity must be greater than 0") };
    switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart is empty") };
      case (?cart) {
        if (not cart.containsKey(productId)) { Runtime.trap("Product not in cart") };
        let cartItem = {
          productId;
          quantity;
        };
        cart.add(productId, cartItem);
      };
    };
  };

  public shared ({ caller }) func clearCart() : async () {
    carts.remove(caller);
  };

  public query ({ caller }) func getCart() : async [CartItem] {
    switch (carts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart.values().toArray().sort() };
    };
  };
};
