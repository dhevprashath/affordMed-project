# Dell Inventory Management System & DSA Solutions

This repository contains two main components:
1. **Dell Inventory Management System**: A complete frontend web application built with HTML, CSS, and Vanilla JavaScript.
2. **DSA Solutions**: Implementations of various Data Structures and Algorithms problems.

---

## 1. Dell Inventory Management System

### Project Explanation
The **Dell Inventory Management System** is a lightweight, frontend-only web application designed to help manage a catalog of Dell products. It is built using standard web technologies: HTML5 for structure, CSS3 for styling, and Vanilla JavaScript for interactivity. The application operates entirely on the client side, utilizing an array of JavaScript objects as a temporary, in-memory database to store product information. 

### Features
1. **Display Inventory**: Dynamically generates HTML table rows to display Product ID, Name, and Stock Status. Status badges are color-coded.
2. **Search Product**: A dedicated search bar allows users to input a product name and check availability in real-time.
3. **Add Product**: Users can input a new product name and select its stock status. The system automatically assigns a unique ID.
4. **Update Product**: Populate the input form with a selected product's details and modify it directly in the array.
5. **Delete Product**: Remove a product from the inventory with a confirmation dialog.
6. **Product Counter (Statistics)**: Dashboard features dynamic cards tracking Total Products, In Stock, and Out of Stock.
7. **Validation**: Built-in logic prevents empty names and duplicate products.
8. **Responsive UI**: The layout uses Flexbox and Media Queries for seamless adaptation across all devices.

### How to Run the Web Application
Since this project uses pure HTML, CSS, and Vanilla JavaScript, no build tools or package managers are strictly required.

**Method 1: Direct File Open**
1. Navigate to the project folder.
2. Double-click on `index.html` to open it in your default web browser.

**Method 2: Using Node.js (npx)**
If you have Node.js installed, you can serve the project over a local server:
```bash
npx serve .
```
Then, open the provided `http://localhost:3000` URL in your browser.

**Method 3: VS Code Live Server**
1. Open the project folder in Visual Studio Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` and select **"Open with Live Server"**.

---

## 2. DSA Solutions

Currently, this repository includes the solution for the **Zigzag Conversion** problem from LeetCode.

### How to Run the C++ Solution
The solution is provided in C++ format within the `DSA.txt` file. To run and test the solution:

1. Copy the C++ code from `DSA.txt` into a new file named `zigzag.cpp`.
2. Ensure you have a C++ compiler (like `g++` via MinGW) installed on your system.
3. Open your terminal or PowerShell.
4. Compile the code:
   ```bash
   g++ zigzag.cpp -o zigzag
   ```
5. Run the compiled executable:
   - On Windows:
     ```powershell
     .\zigzag.exe
     ```
   - On macOS/Linux:
     ```bash
     ./zigzag
     ```