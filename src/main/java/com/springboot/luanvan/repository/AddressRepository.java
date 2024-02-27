package com.springboot.luanvan.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.luanvan.models.Address;


@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
	Optional<Address> findById(Long id);

	boolean existsByAddress(String addressName);

	List<Address> findByUser_UserIdAndStatus(Long userId, boolean status);
}
