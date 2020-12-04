FROM openjdk:14
WORKDIR /app
COPY ./backend/target/inventory-tracker.jar /app
EXPOSE 5000
ENTRYPOINT ["java", "-jar", "inventory-tracker.jar"]