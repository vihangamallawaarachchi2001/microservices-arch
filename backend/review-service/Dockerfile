# Use a lightweight OpenJDK 21 runtime image
FROM eclipse-temurin:21-jdk-alpine as builder

# Set working directory inside the container
WORKDIR /app

# Copy the JAR file from the build context
COPY target/review-service.jar app.jar

# Expose the port used by the Spring Boot service
EXPOSE 8080

# Run the application with optimized JVM flags
CMD ["java", "-jar", "app.jar"]
