# IntelliFix: Agentic AI-Powered Code Debugger & Optimizer

![IntelliFix Banner](https://via.placeholder.com/1000x200.png?text=IntelliFix+-+AI+Code+Assistant)

IntelliFix is a sophisticated full-stack developer assistant built with the **MERN stack** and powered by **Google Gemini 1.5 Flash**. It goes beyond simple syntax checking by acting as an Agentic AI—understanding logic, identifying deep bugs, and suggesting production-ready optimizations in real-time.

## 🚀 Features

* **Agentic AI Code Analysis:** Leverages Google's Gemini API to debug, explain, and optimize complex code snippets.
* **Context-Aware Debugging:** Retains conversation history for continuous, iterative problem-solving.
* **Secure Authentication:** Stateless JWT-based authentication with robust middleware route protection.
* **Credit & Subscription System:** Integrated with **Stripe** to manage user credits and tier-based API usage quotas.
* **Community Media Management:** Uses **ImageKit** for generating and managing shareable architectural diagrams and debug snapshots.
* **Modern Developer UI:** A highly responsive React frontend styled with Tailwind CSS, built for developers.

## 🛠️ Tech Stack

**Frontend:**
* React.js (Vite)
* Tailwind CSS
* React Router DOM
* Axios for API communication

**Backend:**
* Node.js & Express.js
* MongoDB (Atlas) & Mongoose
* `@google/generative-ai` (Gemini SDK)
* Stripe API (Payments & Webhooks)
* ImageKit (Cloud Image Hosting)
* JSON Web Tokens (JWT) & Bcrypt

## ⚙️ Local Development Setup

### Prerequisites
* Node.js (v20.19.0 or higher recommended)
* MongoDB Atlas Cluster URI
* Google Gemini API Key
* Stripe Secret Key & Webhook Secret
* ImageKit Credentials

### 1. Clone the Repository
```bash
git clone [https://github.com/up65akhil/intellifix.git](https://github.com/up65akhil/intellifix.git)
cd intellifix
