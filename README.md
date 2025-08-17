# Book Rental Management System

## 📚 Overview
A comprehensive Book Rental Management System built with Spring Boot for managing book rentals in a small community library. This system provides RESTful APIs for managing books and rental operations with a clean, layered architecture.

## 🏗️ System Architecture
The system follows a 3-layer architecture:
- **Controller Layer**: REST API endpoints
- **Service Layer**: Business logic implementation
- **Repository Layer**: Data access layer with JPA

## 🗄️ Database Design
The system uses a relational database with three main tables:

```
[Books] 1 ──< [Rental_Items] >── 1 [Rentals]

Books:
├── book_id (PK)
├── title
├── author
├── genre
└── available

Rental_Items:
├── rental_item_id (PK)
├── rental_id (FK → Rentals.rental_id)
└── book_id (FK → Books.book_id)

Rentals:
├── rental_id (PK)
├── user_details
├── rental_date
└── return_date
```

## 🛠️ Technologies Used
- **Backend**: Java 17+ with Spring Boot 3.x
- **Database**: MySQL 8.0
- **ORM**: Spring Data JPA with Hibernate
- **Documentation**: Swagger/OpenAPI 3
- **Build Tool**: Maven
- **Validation**: Jakarta Validation API

## 📋 Prerequisites
- Java 17 or higher
- MySQL 8.0 or higher
- Maven 3.6+
- IDE (IntelliJ IDEA, Eclipse, or VS Code)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/book-rental-system.git
cd book-rental-system
```

### 2. Database Setup
Create a MySQL database:
```sql
CREATE DATABASE book_rental_db;
```

### 3. Configure Database Connection
Update `src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/book_rental_db?createDatabaseIfNotExist=true
    username: your_mysql_username
    password: your_mysql_password
```

### 4. Build and Run
```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## 📖 API Documentation

### Swagger UI
Access interactive API documentation at:
```
http://localhost:8080/swagger-ui.html
```

### OpenAPI JSON
Raw API specification available at:
```
http://localhost:8080/api-docs
```

## 🔗 API Endpoints

### Books Management

#### Create Book
```http
POST /api/books
Content-Type: application/json

{
    "title": "Java Programming",
    "author": "John Doe",
    "genre": "Programming",
    "available": true
}
```

#### Get All Books
```http
GET /api/books
```

#### Get Available Books Only
```http
GET /api/books/available
```

#### Get Book by ID
```http
GET /api/books/{id}
```

#### Search Books
```http
GET /api/books/search?title=Java&author=John&genre=Programming
```

#### Update Book
```http
PUT /api/books/{id}
Content-Type: application/json

{
    "title": "Advanced Java Programming",
    "author": "John Doe",
    "genre": "Programming",
    "available": true
}
```

#### Delete Book
```http
DELETE /api/books/{id}
```

### Rental Management

#### Create Rental
```http
POST /api/rentals
Content-Type: application/json

{
    "userDetails": "John Smith - john@email.com",
    "rentalDate": "2024-01-01",
    "returnDate": "2024-01-15",
    "bookIds": [1, 2, 3]
}
```

#### Get All Rentals
```http
GET /api/rentals
```

#### Get Rental by ID
```http
GET /api/rentals/{id}
```

#### Update Rental
```http
PUT /api/rentals/{id}
Content-Type: application/json

{
    "userDetails": "John Smith - johnsmith@email.com",
    "rentalDate": "2024-01-01",
    "returnDate": "2024-01-20"
}
```

#### Return Books
```http
PUT /api/rentals/{id}/return
```

## 💾 Sample Data

### Sample Book Creation Requests:
```json
{
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "genre": "Software Engineering",
    "available": true
}

{
    "title": "Spring Boot in Action",
    "author": "Craig Walls",
    "genre": "Programming",
    "available": true
}

{
    "title": "Design Patterns",
    "author": "Gang of Four",
    "genre": "Software Architecture",
    "available": true
}
```

### Sample Rental Creation Request:
```json
{
    "userDetails": "Alice Johnson - alice.johnson@email.com",
    "rentalDate": "2024-08-17",
    "returnDate": "2024-09-01",
    "bookIds": [1, 2]
}
```

## 🏭 Project Structure
```
src/
├── main/
│   ├── java/com/newnop/bookrental/
│   │   ├── controller/
│   │   │   ├── BookController.java
│   │   │   └── RentalController.java
│   │   ├── service/
│   │   │   ├── BookServiceInterface.java
│   │   │   ├── RentalServiceInterface.java
│   │   │   └── impl/
│   │   │       ├── BookServiceImpl.java
│   │   │       └── RentalServiceImpl.java
│   │   ├── repository/
│   │   │   ├── BooksRepository.java
│   │   │   ├── RentalsRepository.java
│   │   │   └── RentalItemsRepository.java
│   │   ├── entity/
│   │   │   ├── Books.java
│   │   │   ├── Rentals.java
│   │   │   └── RentalItems.java
│   │   ├── dto/
│   │   │   ├── BookDTO.java
│   │   │   ├── RentalDTO.java
│   │   │   └── CreateRentalRequest.java
│   │   ├── config/
│   │   │   └── SwaggerConfig.java
│   │   └── BookRentalApplication.java
│   └── resources/
│       ├── application.yml
│       └── static/
└── test/
```

## ⚙️ Configuration Details

### Database Configuration (application.yml)
```yaml
spring:
  application:
    name: book-rental-system
  
  datasource:
    url: jdbc:mysql://localhost:3306/book_rental_db?createDatabaseIfNotExist=true
    username: root
    password: your_password
    driver-class-name: com.mysql.cj.jdbc.Driver
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true
        dialect: org.hibernate.dialect.MySQL8Dialect

server:
  port: 8080

# Swagger Configuration
springdoc:
  api-docs:
    path: /api-docs
  swagger-ui:
    path: /swagger-ui.html
    operations-sorter: method
```

## 🎯 Key Features

### Core Functionality
- ✅ Complete CRUD operations for Books
- ✅ Complete CRUD operations for Rentals
- ✅ Book availability management
- ✅ Multiple books per rental support
- ✅ Automatic return functionality

### Technical Features
- ✅ RESTful API design
- ✅ Proper HTTP status codes
- ✅ Input validation
- ✅ Database relationships (One-to-Many, Many-to-Many)
- ✅ Swagger/OpenAPI documentation
- ✅ Clean architecture with interfaces
- ✅ DTO pattern implementation

### Business Logic
- ✅ Books become unavailable when rented
- ✅ Books become available when returned
- ✅ Support for multiple books in single rental
- ✅ User details tracking
- ✅ Rental period management

## 🔍 Testing the APIs

### Using Swagger UI (Recommended)
1. Start the application
2. Navigate to `http://localhost:8080/swagger-ui.html`
3. Use the interactive interface to test all endpoints

### Using cURL Examples

**Create a Book:**
```bash
curl -X POST http://localhost:8080/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Spring Boot Guide",
    "author": "Jane Doe",
    "genre": "Programming",
    "available": true
  }'
```

**Get All Books:**
```bash
curl -X GET http://localhost:8080/api/books
```

**Create a Rental:**
```bash
curl -X POST http://localhost:8080/api/rentals \
  -H "Content-Type: application/json" \
  -d '{
    "userDetails": "John Smith - john@email.com",
    "rentalDate": "2024-08-17",
    "returnDate": "2024-09-01",
    "bookIds": [1, 2]
  }'
```

## 🚨 Assumptions and Design Decisions

### Database Design Assumptions
1. **Book Uniqueness**: Books are identified by auto-generated IDs, allowing multiple copies of the same title
2. **User Management**: Simplified user details as string format "Name - Email"
3. **Rental Items**: Junction table supports multiple books per rental
4. **Return Logic**: All books in a rental are returned together

### Business Logic Assumptions
1. **Availability**: Books marked as unavailable cannot be rented again
2. **Return Date**: Optional field, can be null for open-ended rentals
3. **User Validation**: Basic email format validation in user details
4. **Rental Updates**: Allows updating rental periods and user details

### Technical Decisions
1. **Auto-increment IDs**: Used for all primary keys for simplicity
2. **Soft Validation**: Basic validation with meaningful error messages
3. **No Authentication**: Simplified for assessment purposes
4. **MySQL Dialect**: Optimized for MySQL 8.0+ features

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error:**
- Verify MySQL is running
- Check database credentials in `application.yml`
- Ensure database exists or set `createDatabaseIfNotExist=true`

**Port Already in Use:**
- Change server port in `application.yml`: `server.port: 8081`
- Or kill process using port 8080

**Swagger UI Not Loading:**
- Verify springdoc dependency is included
- Check if application started successfully
- Access `http://localhost:8080/swagger-ui.html`

**Maven Build Issues:**
- Ensure Java 17+ is installed
- Run `mvn clean install` to resolve dependencies
- Check internet connection for dependency downloads

## 📚 Additional Resources

### Documentation Links
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data JPA Reference](https://spring.io/projects/spring-data-jpa)
- [Swagger/OpenAPI 3 Guide](https://swagger.io/specification/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

### Development Resources
- [Spring Boot Starters](https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.build-systems.starters)
- [JPA Query Methods](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods)
- [Spring Boot Testing](https://spring.io/guides/gs/testing-web/)

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is created for educational/assessment purposes.

## 👨‍💻 Author
**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments
- Spring Boot team for the excellent framework
- MySQL for the reliable database system
- Swagger/OpenAPI for documentation tools
- Newnop for the assessment opportunity

---

For any questions or support, please create an issue in the GitHub repository or contact the development team.
