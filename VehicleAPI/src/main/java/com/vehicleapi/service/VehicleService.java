package com.vehicleapi.service;

import com.vehicleapi.model.Vehicle;
import com.vehicleapi.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {
    
    @Autowired
    private VehicleRepository vehicleRepository;
    
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }
    
    public Optional<Vehicle> getVehicleById(String id) {
        return vehicleRepository.findById(id);
    }
    
    public Optional<Vehicle> getVehicleByPlaca(String placa) {
        return vehicleRepository.findByPlaca(placa);
    }
    
    public List<Vehicle> getVehiclesByMarca(String marca) {
        return vehicleRepository.findByMarca(marca);
    }
    
    public Vehicle createVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }
    
    public Optional<Vehicle> updateVehicle(String id, Vehicle vehicleDetails) {
        return vehicleRepository.findById(id).map(vehicle -> {
            vehicle.setMarca(vehicleDetails.getMarca());
            vehicle.setModelo(vehicleDetails.getModelo());
            vehicle.setAnio(vehicleDetails.getAnio());
            vehicle.setColor(vehicleDetails.getColor());
            vehicle.setPlaca(vehicleDetails.getPlaca());
            vehicle.setTipo(vehicleDetails.getTipo());
            return vehicleRepository.save(vehicle);
        });
    }
    
    public boolean deleteVehicle(String id) {
        return vehicleRepository.findById(id).map(vehicle -> {
            vehicleRepository.delete(vehicle);
            return true;
        }).orElse(false);
    }
}
