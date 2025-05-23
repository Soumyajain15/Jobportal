# Careconnect

**Careconnect** is a modern **job portal application** built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It connects job seekers with employers through a sleek, responsive interface and offers tools for posting and applying to jobs.

---
![Screenshot (81)](https://github.com/user-attachments/assets/475c9268-fe41-4270-a1f2-04f7007e197b)

## 🌟 Features

* 🔍 Browse and search job listings
* 📝 Apply to jobs online
* 🧑‍💼 Employer dashboard to manage postings
* 🔐 Authentication for users and employers
* 📱 Fully responsive UI
* ⚡ Optimized with Next.js performance features

---![Screenshot (84)](https://github.com/user-attachments/assets/9a638aa1-8d55-49eb-9c34-cbd6cb0cdc6e)


## 🛠 Tech Stack

* **Frontend & Backend**: [Next.js](https://nextjs.org/) (Fullstack React Framework)
* **Styling**: Tailwind CSS
* **Language**: TypeScript
* **Database**: MongoDB
* **Authentication**: JWT (JSON Web Tokens)
* **Deployment**: Vercel

---
![Screenshot (83)](https://github.com/user-attachments/assets/a596abc7-699d-4b6c-8c98-e34688e116cb)

## 🚀 Getting Started

### Prerequisites

* Node.js ≥ 14.x
* npm or yarn
* MongoDB (Atlas or local)

### Installation

```bash
git clone https://github.com/Soumyajain15/Careconnect.git
cd Careconnect
npm install  # or yarn install
```
![Screenshot (82)](https://github.com/user-attachments/assets/04f55565-bf31-4a65-b75d-fc9a8ef41731)

### Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

### Running Locally

```bash
npm run dev  # or yarn dev
```
![Screenshot (80)](https://github.com/user-attachments/assets/5e975017-81ab-4ff2-83d9-81c375689e15)

Then visit: [http://localhost:3000](http://localhost:3000)

---

## 📁 Folder Structure
![Screenshot (79)](https://github.com/user-attachments/assets/5d450e73-d817-4a7e-a0b0-1be29223fd06)

```plaintext
Careconnect/
├── components/         # Reusable components
├── pages/              # Next.js routing structure
│   ├── api/            # API routes (backend logic)
│   └── auth/           # Authentication pages
├── public/             # Static assets
├── styles/             # Tailwind and global CSS
├── utils/              # Utility functions
├── middleware/         # JWT/role-based protection
├── .env.local          # Local environment variables
├── tailwind.config.js  # Tailwind config
├── tsconfig.json       # TypeScript config
└── next.config.js      # Next.js config
```

---

## 📦 Scripts

```json![Screenshot (78)](https://github.com/user-attachments/assets/a7a20400-98e1-4f27-8ce1-438401fa987a)

"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "next lint"
```

---
![Screenshot (76)](https://github.com/user-attachments/assets/f21bd510-8196-4f77-9017-49ed4de7c728)

## 🌐 Live Demo

🔗 [careconnect-beta.vercel.app](https://careconnect-beta.vercel.app)

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License
