package com.exam.vehicleapi.repository;

import com.exam.vehicleapi.model.Vehicle;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleRepository extends MongoRepository<Vehicle, String> {
    Optional<Vehicle> findByLicensePlate(String licensePlate);
    List<Vehicle> findByBrand(String brand);
    List<Vehicle> findByYear(Integer year);
}
