package com.fast.pedidos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class FastApplication {
    public static void main(String[] args) {
        SpringApplication.run(FastApplication.class, args);
        System.out.println("\n" +
            "===============================================\n" +
            "🍽️  FAST Backend iniciado exitosamente\n" +
            "📍 URL: http://localhost:8080\n" +
            "📊 MongoDB: fast_db\n" +
            "✅ 4 HUs implementadas\n" +
            "===============================================\n");
    }
}