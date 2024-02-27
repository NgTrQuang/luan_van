package com.springboot.luanvan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.luanvan.models.District;

@Repository
public interface DistrictRepository extends JpaRepository<District, Long> {

}
