# Comet Shoes - E-Commerce Front-End Project

A clean, responsive, 5-page e-commerce application built strictly using vanilla **HTML5, CSS, and JavaScript**. 

This project explores client-side CRUD capabilities, state management, search algorithms, and dual-theme grid layouts without requiring heavy frameworks or external databases.

---

## Tech Stack 

*   **Front-End Core:** HTML5, JavaScript, CSS.
*   **Iconography:** FontAwesome.
---

## Screenshot(E-Commerce_Website)

![Home-Page Screenshot](./Output-Home_Page.pdf)

![Shop-Page Screenshot](./Output-Shop_Page.pdf)

![Add_Product-Page Screenshot](./Output-Add_Product-Page.pdf)

![Cart-Page Screenshot](./Output-Cart_Page.pdf)

![Single_ProductView-Page Screenshot](./Ouput-Single_ProductView-page.pdf)

## Key Features Implemented

### Product & Inventory Management (CRUD)
*   **Direct HTML Manipulation:** Customizing images, titles, pricing figures, and descriptions is as simple as tweaking the `.card-home` wrappers inside `index.html`.
*   **Add & Edit Engine:** Open the "Add Product" form to spin up brand new elements or populate existing card values back into the interface forms to run immediate updates.
*   **Delete Lifecycle:** Completely drop items out of both active store catalog variations and ongoing customer checkout collections.

### Search, Filtering & Sorting Matrix
*   **Keyword Lookup:** Live search matches input terms instantly against names and product specification summaries.
*   **Categorization:** Filter views across collections like Audio, Peripherals, Running, or Lifestyle options.
*   **Sorting Algorithms:** Dynamically sort catalog grids from low-to-high or high-to-low valuations.

### Transactional Basket Logic
*   **Add to Cart:** Add elements to your basket directly from either grid style. Re-adding items automatically increments item quantity.
*   **Volume Controls:** Seamlessly adjust product counts ($+$ / $-$ buttons) inside the checkout viewport. Dropping quantities down to zero automatically trims the item from the list.
*   **Dynamic Calculations:** The checkout view calculates real-time sub-totals, a baseline 5% tax configuration, and overall totals.

---

## File Layout & Directory Structure

```Comet-E_commerce-website
├── index.html        
├── style.css        
└── script.js         