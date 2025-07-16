# Careconnect

**Careconnect** is a modern **job portal application** built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It connects job seekers with employers through a sleek, responsive interface and offers tools for posting and applying to jobs.

---
<img width="1918" height="914" alt="Screenshot (100)" src="https://github.com/user-attachments/assets/ead6a2af-fe05-49e6-8044-55fae69114ef" />


## 🌟 Features

* 🔍 Browse and search job listings
* 📝 Apply to jobs online
* 🧑‍💼 Employer dashboard to manage postings
* 🔐 Authentication for users and employers
* 📱 Fully responsive UI
* ⚡ Optimized with Next.js performance features

<img width="1917" height="916" alt="Screenshot (101)" src="https://github.com/user-attachments/assets/dac25067-f7b3-4b2e-8af6-57762ee42848" />



## 🛠 Tech Stack

* **Frontend & Backend**: [Next.js](https://nextjs.org/) (Fullstack React Framework)
* **Styling**: Tailwind CSS
* **Language**: TypeScript
* **Database**: MongoDB
* **Authentication**: JWT (JSON Web Tokens)
* **Deployment**: Vercel

---
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/bcf9069f-355e-4679-a8ce-4267af1664d7" />
<img width="1913" height="907" alt="Screenshot (106)" src="https://github.com/user-attachments/assets/6ffd2678-edb7-4710-acc8-9afcc23da653" />


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
<img width="1914" height="913" alt="Screenshot (102)" src="https://github.com/user-attachments/assets/ce495ffd-7bba-46f7-b843-1a55a3f77150" />


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
<img width="1906" height="914" alt="Screenshot (103)" src="https://github.com/user-attachments/assets/54c8c3f7-4416-4a71-98c3-57a50b545558" />


Then visit: [http://localhost:3000](http://localhost:3000)

---

## 📁 Folder Structure
<img width="1899" height="907" alt="Screenshot (105)" src="https://github.com/user-attachments/assets/c181dbec-a261-44f1-b737-2d2fd4e8dfee" />



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

```json!<img width="1910" height="910" alt="Screenshot (104)" src="https://github.com/user-attachments/assets/373be70d-2419-4be3-bec0-fe23973ff74b" />
"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "next lint"
```

---

<img width="1910" height="910" alt="Screenshot (104)" src="https://github.com/user-attachments/assets/ec31031a-deb1-4f56-82ab-269adba90679" />


## 🌐 Live Demo

🔗 [careconnect-beta.vercel.app](https://jobportal-topaz.vercel.app)

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License
