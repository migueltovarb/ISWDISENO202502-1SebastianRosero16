package com.fast.pedidos.controller;

import com.fast.pedidos.dto.ApiResponse;
import com.fast.pedidos.model.Producto;
import com.fast.pedidos.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductoController {
    
    @Autowired
    private ProductoService productoService;
    
    @GetMapping("/menu")
    public ResponseEntity<List<Producto>> obtenerMenuDisponible() {
        List<Producto> productos = productoService.obtenerMenuDisponible();
        return ResponseEntity.ok(productos);
    }
    
    @GetMapping
    public ResponseEntity<List<Producto>> obtenerTodos() {
        List<Producto> productos = productoService.obtenerTodos();
        return ResponseEntity.ok(productos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerPorId(@PathVariable String id) {
        return productoService.obtenerPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse> crearProducto(@RequestBody Producto producto) {
        Producto nuevoProducto = productoService.crearProducto(producto);
        return ResponseEntity.status(201).body(
            new ApiResponse(true, "Producto creado exitosamente", nuevoProducto)
        );
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> actualizarProducto(
        @PathVariable String id,
        @RequestBody Producto producto) {
        Producto actualizado = productoService.actualizarProducto(id, producto);
        return ResponseEntity.ok(
            new ApiResponse(true, "Producto actualizado", actualizado)
        );
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> eliminarProducto(@PathVariable String id) {
        productoService.eliminarProducto(id);
        return ResponseEntity.ok(
            new ApiResponse(true, "Producto eliminado", null)
        );
    }
}