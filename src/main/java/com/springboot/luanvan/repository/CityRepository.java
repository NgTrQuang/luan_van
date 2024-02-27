package com.springboot.luanvan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.luanvan.models.City;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {

}
