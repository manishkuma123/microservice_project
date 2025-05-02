Node.js Microservices with AES-256 Authentication

This repository contains three Node.js microservices:

- **OrderService**
- **ProductService**
- **ChatService**

Each service communicates securely using AES-256 encrypted tokens for authentication.



## 🔐 Authentication using AES-256

All services implement authentication using the AES-256-CBC encryption algorithm. Encrypted tokens are passed via headers and decrypted by each service to validate requests.

### 🔧 Encryption Details

- **Algorithm**: AES-256-CBC
- **Key**: 32-byte secret
- **IV**: 16-byte initialization vector
- **Library**: Node.js `crypto` module


📦 Services Overview
✅ OrderService
Handles order management, receives requests with encrypted tokens.

🛒 ProductService
Manages product data, verifies encrypted tokens for access control.

💬 ChatService
Enables chat communication, secured with AES-256 token-based auth.

👨‍💻 Developed By
Manish Kumar
