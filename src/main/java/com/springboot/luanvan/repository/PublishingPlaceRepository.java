package com.springboot.luanvan.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.luanvan.models.PublishingPlace;

@Repository
public interface PublishingPlaceRepository  extends JpaRepository<PublishingPlace, Long>{
	Optional<PublishingPlace> findById(Long id);
}
