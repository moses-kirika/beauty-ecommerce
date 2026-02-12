# Beauty E-Commerce Platform

A modern, premium beauty and skincare e-commerce application built with Next.js, featuring a sophisticated product catalog, user authentication, shopping cart, and checkout functionality.

## Features

### Shopping Experience
- **Product Catalog**: Browse a comprehensive collection of skincare, makeup, haircare, and body care products
- **Advanced Filtering**: Filter by category, brand, skin type, concerns, and price range
- **Product Search**: Real-time search functionality across all products
- **Product Details**: Detailed product pages with ingredients, usage instructions, and customer reviews
- **Wishlist**: Save favorite products for later
- **Shopping Cart**: Add products to cart with quantity management
- **Checkout**: Streamlined checkout process with order summary

### User Features
- **Authentication**: Secure login and signup functionality
- **User Profile**: Manage personal information, addresses, and payment methods
- **Order History**: Track past orders and order status
- **Loyalty Points**: Earn points on purchases

### Additional Pages
- **About**: Learn about the brand's heritage and values
- **Contact**: Get in touch via contact form
- **Privacy Policy**: View privacy and data protection information
- **Terms of Service**: Review terms and conditions

## Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Icons**: Lucide React
- **Authentication**: Custom authentication context

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
beauty-ecommerce/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout flow
│   ├── contact/           # Contact page
│   ├── login/             # Login page
│   ├── privacy/           # Privacy policy
│   ├── product/           # Product detail pages
│   ├── profile/           # User profile
│   ├── shop/              # Shop/catalog page
│   ├── signup/            # Registration page
│   └── terms/             # Terms of service
├── components/            # React components
├── context/              # React context providers
├── data/                 # Product data and mock data
├── public/               # Static assets
│   └── images/           # Product and page images
└── README.md
```

## Key Components

- **ProductCard**: Displays product information in grid/list view
- **ProductDetailClient**: Full product detail page with reviews
- **CartClient**: Shopping cart management
- **CheckoutClient**: Checkout process
- **Header**: Navigation and search
- **Footer**: Site-wide footer with links
- **AuthContext**: Authentication state management
- **CartContext**: Shopping cart state management

## Product Categories

- Serums
- Moisturizers
- Cleansers
- Sunscreens
- Exfoliants
- Masks
- Eye Care
- Lip Care
- Body Care
- Hair Care
- Makeup

## Design Philosophy

This application emphasizes:
- **Product-Centric Imagery**: All visuals focus on products, not people
- **Clean Aesthetics**: Minimalist, modern design with premium feel
- **User Experience**: Intuitive navigation and seamless shopping flow
- **Responsive Design**: Optimized for all device sizes

## License

This project is for educational and demonstration purposes.
