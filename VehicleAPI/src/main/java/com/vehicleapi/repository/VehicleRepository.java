package com.vehicleapi.repository;

import com.vehicleapi.model.Vehicle;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleRepository extends MongoRepository<Vehicle, String> {
    Optional<Vehicle> findByPlaca(String placa);
    List<Vehicle> findByMarca(String marca);
    List<Vehicle> findByAnio(Integer anio);
}
