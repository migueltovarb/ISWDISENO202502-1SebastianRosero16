package com.fast.pedidos.service;

import com.fast.pedidos.model.Producto;
import com.fast.pedidos.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {
    
    @Autowired
    private ProductoRepository productoRepository;
    
    public List<Producto> obtenerMenuDisponible() {
        return productoRepository.findByDisponibleTrue();
    }
    
    public List<Producto> obtenerTodos() {
        return productoRepository.findAll();
    }
    
    public Optional<Producto> obtenerPorId(String id) {
        return productoRepository.findById(id);
    }
    
    public Producto crearProducto(Producto producto) {
        return productoRepository.save(producto);
    }
    
    public Producto actualizarProducto(String id, Producto producto) {
        producto.setIdProducto(id);
        return productoRepository.save(producto);
    }
    
    public void eliminarProducto(String id) {
        productoRepository.deleteById(id);
    }
}
