package com.fast.pedidos.controller;

import com.fast.pedidos.dto.ApiResponse;
import com.fast.pedidos.dto.PedidoDTO;
import com.fast.pedidos.model.EstadoPedido;
import com.fast.pedidos.model.Pedido;
import com.fast.pedidos.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "http://localhost:3000")
public class PedidoController {
    
    @Autowired
    private PedidoService pedidoService;
    
    @PostMapping
    public ResponseEntity<ApiResponse> crearPedido(@RequestBody PedidoDTO pedidoDTO) {
        try {
            String idPedido = pedidoService.crearPedido(pedidoDTO);
            
            Map<String, Object> data = new HashMap<>();
            data.put("idPedido", idPedido);
            data.put("mensaje", "Pedido creado exitosamente");
            
            return ResponseEntity.status(201).body(
                new ApiResponse(true, "Pedido creado exitosamente", data)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                new ApiResponse(false, e.getMessage(), null)
            );
        }
    }
    
    @GetMapping
    public ResponseEntity<List<Pedido>> obtenerTodos() {
        List<Pedido> pedidos = pedidoService.obtenerTodos();
        return ResponseEntity.ok(pedidos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Pedido> obtenerPorId(@PathVariable String id) {
        return pedidoService.obtenerPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Pedido>> obtenerPorEstado(@PathVariable EstadoPedido estado) {
        List<Pedido> pedidos = pedidoService.obtenerPorEstado(estado);
        return ResponseEntity.ok(pedidos);
    }
    
    @PutMapping("/{id}/estado")
    public ResponseEntity<ApiResponse> actualizarEstado(
        @PathVariable String id,
        @RequestParam EstadoPedido estado) {
        try {
            pedidoService.actualizarEstado(id, estado);
            return ResponseEntity.ok(
                new ApiResponse(true, "Estado actualizado. Notificación enviada", null)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                new ApiResponse(false, e.getMessage(), null)
            );
        }
    }
}