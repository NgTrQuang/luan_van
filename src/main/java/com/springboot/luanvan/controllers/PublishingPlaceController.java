package com.springboot.luanvan.controllers;

import com.springboot.luanvan.models.PublishingPlace;
import com.springboot.luanvan.repository.PublishingPlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/publishingPlaces")
public class PublishingPlaceController {

    private final PublishingPlaceRepository publishingPlaceRepository;

    @Autowired
    public PublishingPlaceController(PublishingPlaceRepository publishingPlaceRepository) {
        this.publishingPlaceRepository = publishingPlaceRepository;
    }

    // Endpoint để lấy danh sách toàn bộ PublishingPlace
    @GetMapping("/")
    public ResponseEntity<List<PublishingPlace>> getAllPublishingPlaces() {
        List<PublishingPlace> publishingPlaces = publishingPlaceRepository.findAll();
        return ResponseEntity.ok(publishingPlaces);
    }

    // Endpoint để lấy PublishingPlace theo ID
    @GetMapping("/{id}")
    public ResponseEntity<PublishingPlace> getPublishingPlaceById(@PathVariable Long id) {
        Optional<PublishingPlace> publishingPlace = publishingPlaceRepository.findById(id);
        if (publishingPlace.isPresent()) {
            return ResponseEntity.ok(publishingPlace.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint để tạo mới một PublishingPlace
    @PostMapping("/")
    public ResponseEntity<PublishingPlace> createPublishingPlace(@RequestBody PublishingPlace publishingPlace) {
        PublishingPlace newPublishingPlace = publishingPlaceRepository.save(publishingPlace);
        return ResponseEntity.ok(newPublishingPlace);
    }

    // Endpoint để cập nhật thông tin PublishingPlace theo ID
    @PutMapping("/{id}")
    public ResponseEntity<PublishingPlace> updatePublishingPlace(@PathVariable Long id, @RequestBody PublishingPlace updatedPublishingPlace) {
        Optional<PublishingPlace> existingPublishingPlace = publishingPlaceRepository.findById(id);
        if (existingPublishingPlace.isPresent()) {
            PublishingPlace publishingPlace = existingPublishingPlace.get();
            publishingPlace.setName(updatedPublishingPlace.getName());
            publishingPlace.setAddress(updatedPublishingPlace.getAddress());
            publishingPlace.setHoline(updatedPublishingPlace.getHoline());
            publishingPlaceRepository.save(publishingPlace);
            return ResponseEntity.ok(publishingPlace);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint để xóa PublishingPlace theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePublishingPlace(@PathVariable Long id) {
        Optional<PublishingPlace> publishingPlace = publishingPlaceRepository.findById(id);
        if (publishingPlace.isPresent()) {
            publishingPlaceRepository.delete(publishingPlace.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
