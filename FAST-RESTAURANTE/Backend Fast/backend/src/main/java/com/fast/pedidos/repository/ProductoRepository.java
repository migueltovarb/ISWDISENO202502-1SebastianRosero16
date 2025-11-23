package com.fast.pedidos.repository;

import com.fast.pedidos.model.Producto;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductoRepository extends MongoRepository<Producto, String> {
    List<Producto> findByDisponibleTrue();
}