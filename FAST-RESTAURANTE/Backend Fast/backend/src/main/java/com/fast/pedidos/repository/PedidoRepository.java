package com.fast.pedidos.repository;

import com.fast.pedidos.model.Pedido;
import com.fast.pedidos.model.EstadoPedido;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PedidoRepository extends MongoRepository<Pedido, String> {
    List<Pedido> findByEstado(EstadoPedido estado);
    List<Pedido> findByClienteId(String clienteId);
}