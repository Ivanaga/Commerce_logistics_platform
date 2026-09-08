# Commerce & Logistics Platform — Requirements

## 1. Overview

The Commerce & Logistics Platform is a software system for managing products, inventory, customer orders, payments, and deliveries.

The long-term goal of the platform is to evolve into a distributed commerce system consisting of independently deployable services and supporting asynchronous communication, fault tolerance, real-time delivery tracking, analytics, and recommendation functionality.

The first version focuses on the core commerce workflow from product availability to order fulfillment.

## 2. Actors

### Customer

Browses products, creates orders, pays for them, and tracks their status.

### Administrator

Manages products and system configuration.

### Warehouse Employee

Manages inventory and processes orders for shipment.

### Courier

Handles deliveries and updates their status.

## 3. Core Domain

The system contains the following main concepts:

* User
* Product
* Inventory
* Order
* Order Item
* Payment
* Delivery

Future versions may introduce:

* Shopping Cart
* Warehouse
* Address
* Shipment
* Discount
* Recommendation
* Notification
* Product Review

## 4. Functional Requirements — V0.1

### FR-01 — Product Management

The system shall allow authorized users to:

* create products;
* view a product;
* view available products;
* update product information;
* deactivate products.

Each product shall contain at least:

* unique identifier;
* name;
* description;
* price;
* SKU;
* status.

### FR-02 — Inventory Management

The system shall track the available quantity of each product.

Authorized users shall be able to:

* increase inventory;
* decrease inventory;
* inspect current inventory levels.

The system shall prevent inventory quantities from becoming negative.

### FR-03 — Order Management

Customers shall be able to create orders containing one or more products.

An order shall contain:

* unique identifier;
* customer;
* one or more order items;
* total price;
* creation timestamp;
* current status.

Each order item shall contain:

* product;
* quantity;
* price at the time of purchase.

The system shall calculate the total order price from its order items.

### FR-04 — Order Workflow

An order shall progress through a defined lifecycle.

Initial workflow:

`CREATED → CONFIRMED → PROCESSING → SHIPPED → DELIVERED`

The system shall reject invalid status transitions.

An order may also enter the `CANCELLED` state when cancellation is permitted.

### FR-05 — Payment Management

The system shall associate payments with orders.

A payment shall contain:

* associated order;
* amount;
* status;
* creation timestamp.

Initial payment states:

`PENDING → AUTHORIZED → COMPLETED`

A payment may also enter the `FAILED` or `REFUNDED` state.

The first version may use a simulated payment provider rather than processing real payments.

### FR-06 — Delivery Management

Confirmed orders shall be capable of being associated with a delivery.

A delivery shall contain:

* associated order;
* assigned courier;
* delivery status;
* creation timestamp.

Initial delivery workflow:

`CREATED → PICKED_UP → IN_TRANSIT → DELIVERED`

### FR-07 — User Roles

The system shall distinguish between:

* Customer;
* Administrator;
* Warehouse Employee;
* Courier.

Operations shall be restricted according to the user's role.

## 5. Core Business Rules

The system shall enforce at least the following rules:

* product inventory shall never become negative;
* an order shall contain at least one order item;
* order quantity shall be greater than zero;
* product price shall be greater than or equal to zero;
* an order's total price shall be calculated by the system;
* historical order item prices shall not change when the current product price changes;
* invalid order status transitions shall be rejected;
* an order shall not be shipped before the required processing steps are completed;
* a delivery shall not be marked as delivered before it has entered the appropriate preceding state.

## 6. Future Requirements

Future versions of the platform may support:

* independently deployable microservices;
* Apache Kafka event streaming;
* distributed order processing;
* Saga-based workflows and compensating transactions;
* idempotent payment processing;
* Redis caching;
* Elasticsearch or OpenSearch;
* OAuth2 and OpenID Connect;
* real-time courier tracking;
* WebSocket updates;
* geospatial data and route planning;
* notifications;
* recommendation systems;
* analytics and data pipelines;
* fault tolerance and circuit breakers;
* distributed tracing;
* load testing;
* Kubernetes;
* cloud deployment.
