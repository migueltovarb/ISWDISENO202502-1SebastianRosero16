package com.exam.vehicleapi.service;

import com.exam.vehicleapi.model.Vehicle;
import com.exam.vehicleapi.repository.VehicleRepository;
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

    public Vehicle createVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public Vehicle updateVehicle(String id, Vehicle vehicleDetails) {
        Optional<Vehicle> vehicleOptional = vehicleRepository.findById(id);
        
        if (vehicleOptional.isPresent()) {
            Vehicle vehicle = vehicleOptional.get();
            vehicle.setBrand(vehicleDetails.getBrand());
            vehicle.setModel(vehicleDetails.getModel());
            vehicle.setYear(vehicleDetails.getYear());
            vehicle.setColor(vehicleDetails.getColor());
            vehicle.setPrice(vehicleDetails.getPrice());
            vehicle.setLicensePlate(vehicleDetails.getLicensePlate());
            return vehicleRepository.save(vehicle);
        }
        
        return null;
    }

    public boolean deleteVehicle(String id) {
        Optional<Vehicle> vehicleOptional = vehicleRepository.findById(id);
        
        if (vehicleOptional.isPresent()) {
            vehicleRepository.deleteById(id);
            return true;
        }
        
        return false;
    }

    public Optional<Vehicle> getVehicleByLicensePlate(String licensePlate) {
        return vehicleRepository.findByLicensePlate(licensePlate);
    }

    public List<Vehicle> getVehiclesByBrand(String brand) {
        return vehicleRepository.findByBrand(brand);
    }

    public List<Vehicle> getVehiclesByYear(Integer year) {
        return vehicleRepository.findByYear(year);
    }
}
