package com.springboot.luanvan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.luanvan.models.Ward;

@Repository
public interface WardRepository extends JpaRepository<Ward, Long> {

}
