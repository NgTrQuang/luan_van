package com.springboot.luanvan.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.luanvan.models.Book;
import com.springboot.luanvan.models.Genre;
import com.springboot.luanvan.models.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long>{
	// Tìm đối tượng Image dựa trên tên ảnh
    Image findByNameImage(String imageName);

    // Xóa đối tượng Image dựa trên tên ảnh
    void deleteByNameImage(String imageName);

    // Tìm đối tượng Image dựa trên đường dẫn ảnh
    Image findByPathImage(String pathImage);

    // Xóa đối tượng Image dựa trên đường dẫn ảnh
    void deleteByPathImage(String pathImage);
    
    // Tìm theo id
    Image findByIdImage(Long idImage);
}
