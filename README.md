# Hayoma Dairy Products Management System

A comprehensive full-stack web application for managing dairy product operations, including inventory management, order processing, delivery tracking, and supplier coordination.

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14+ (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom UI components with Radix UI
- **Authentication**: NextAuth.js
- **State Management**: React Context API
- **Database Client**: Prisma

### Backend
- **Framework**: Spring Boot (Java)
- **Build Tool**: Maven
- **Database**: (Configure in application.properties)

## 📁 Project Structure

```
├── Backend/
│   └── hayoma/          # Spring Boot application
│       ├── src/
│       │   ├── main/    # Java source code and resources
│       │   └── test/    # Test files
│       └── pom.xml      # Maven dependencies
│
├── Frontend/
│   ├── app/             # Next.js App Router pages
│   │   ├── dashboard/   # Dashboard for different user roles
│   │   ├── auth/        # Authentication pages
│   │   └── api/         # API routes
│   ├── components/      # Reusable React components
│   ├── contexts/        # React Context providers
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and configurations
│   ├── prisma/          # Database schema
│   └── types/           # TypeScript type definitions
```

## 👥 User Roles

The system supports multiple user roles with distinct dashboards:

- **Admin**: Full system access, user management, analytics, and inventory control
- **Driver**: Delivery management and schedule tracking
- **Shop**: Order placement and inventory monitoring
- **Supplier**: Supply requests and delivery management

## ✨ Features

### Admin Dashboard
- User management
- Product and inventory management
- Order processing and tracking
- Delivery coordination
- Analytics and reporting
- Supplier management
- Shop management
- Driver assignment

### Driver Dashboard
- Delivery schedule
- Route management
- Delivery status updates

### Shop Dashboard
- Product ordering
- Inventory tracking
- Delivery status monitoring
- Order history

### Supplier Dashboard
- Material request management
- Supply delivery tracking
- Request history

## 🛠️ Prerequisites

- **Node.js**: v18.x or higher
- **Java**: JDK 11 or higher
- **Maven**: 3.6+ (or use included Maven wrapper)
- **npm** or **yarn**: Latest version

## 📦 Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd Backend/hayoma
```

2. Configure the database in `src/main/resources/application.properties`

3. Build the project:
```bash
./mvnw clean install
```
Or on Windows:
```bash
mvnw.cmd clean install
```

4. Run the Spring Boot application:
```bash
./mvnw spring-boot:run
```
Or on Windows:
```bash
mvnw.cmd spring-boot:run
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the Frontend directory:
```env
DATABASE_URL="your_database_connection_string"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🚀 Running the Application

### Development Mode

1. Start the backend server (from `Backend/hayoma`):
```bash
./mvnw spring-boot:run
```

2. Start the frontend development server (from `Frontend`):
```bash
npm run dev
```

### Production Build

#### Frontend
```bash
cd Frontend
npm run build
npm start
```

#### Backend
```bash
cd Backend/hayoma
./mvnw clean package
java -jar target/hayoma-*.jar
```

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Backend
- `./mvnw spring-boot:run` - Run the application
- `./mvnw clean install` - Build the project
- `./mvnw test` - Run tests
