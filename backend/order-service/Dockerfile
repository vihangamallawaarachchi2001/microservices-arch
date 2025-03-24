# Build Stage: Compile the app with JDK 21
FROM maven:3.9.9-eclipse-temurin-11 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Runtime Stage: Run the app with JDK 21
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/restaurant-service.jar ./app.jar

# Expose the port (default 8080)
EXPOSE 8080

# Run the app
CMD ["java", "-jar", "app.jar"]