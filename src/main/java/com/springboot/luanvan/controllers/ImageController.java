package com.springboot.luanvan.controllers;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
//import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import com.springboot.luanvan.models.Image;
import com.springboot.luanvan.repository.ImageRepository;

import java.io.File;
import java.io.FileNotFoundException;
//import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
//import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/v1")
public class ImageController {

	public static String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "/src/main/resources/static/img/";
	private final ImageRepository imageRepository;

    public ImageController(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }
    
    @PostMapping("/images")
//    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public Image uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        // Lưu file vào thư mục upload
        String fileName = file.getOriginalFilename();
        String filePath = fileName;
        file.transferTo(new File(UPLOAD_DIRECTORY + filePath));

        // Lưu thông tin file vào cơ sở dữ liệu
        Image fileEntity = new Image();
        fileEntity.setNameImage(fileName);
        fileEntity.setPathImage(filePath);
        
//        updateFileList();
        return imageRepository.save(fileEntity);
    }
   
    @PostMapping("/images/many")
//    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public List<Image> uploadFiles(@RequestParam("files") MultipartFile[] files) throws IOException {
        List<Image> uploadedImages = new ArrayList<>();

        for (MultipartFile file : files) {
            if (file != null && !file.isEmpty()) {
                String originalFileName = file.getOriginalFilename();
                String filePath = originalFileName;

                file.transferTo(new File(UPLOAD_DIRECTORY + filePath));

                Image fileEntity = new Image();
                fileEntity.setNameImage(originalFileName);
                fileEntity.setPathImage(filePath);

                uploadedImages.add(imageRepository.save(fileEntity));
            }
        }

        return uploadedImages;
    }
    
    @GetMapping("/images/{id}")
//    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long id) throws IOException {
        // Tìm file trong cơ sở dữ liệu
        Optional<Image> optionalFile = imageRepository.findById(id);
        if (optionalFile.isPresent()) {
            Image fileEntity = optionalFile.get();
            File file = new File(UPLOAD_DIRECTORY + fileEntity.getPathImage());

            // Trả về file dưới dạng ResponseEntity
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileEntity.getNameImage());
            headers.add(HttpHeaders.CONTENT_TYPE, Files.probeContentType(file.toPath()));
            Resource resource = new FileSystemResource(file);
            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(file.length())
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
//    @GetMapping("/images/{id}")
//    public ResponseEntity<String> getImagePath(@PathVariable Long id) {
//        Optional<Image> optionalFile = imageRepository.findById(id);
//        if (optionalFile.isPresent()) {
//            Image fileEntity = optionalFile.get();
//            String imagePath = fileEntity.getPathImage();
//            return ResponseEntity.ok(imagePath);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

    
    //lấy tất cả hình ảnh
    @GetMapping("/images")
//    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Image>> getAllImages() {
    	List<Image> images = imageRepository.findAll();
    	if (images.isEmpty()) {
    		return ResponseEntity.noContent().build();
    	}else {
			return ResponseEntity.ok(images);
		}
    }
    
    @DeleteMapping("/images/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteFile(@PathVariable Long id) {
        // Xóa file trong cơ sở dữ liệu và từ thư mục upload
        Optional<Image> optionalFile = imageRepository.findById(id);
        if (optionalFile.isPresent()) {
            Image fileEntity = optionalFile.get();
            //Nhằm lấy đường dẫn để xóa lẫn csdl và thư mục dự án với đường dẫn trỏ đến thư mục dự án và lưu nó giống ở csdl
            File file = new File(fileEntity.getPathImage());
            file.delete();
            imageRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    // Cập nhật cây thư mục chứa hình ảnh
//    private void updateFileList() {
//        File uploadDir = new File(UPLOAD_DIRECTORY);
//        File[] files = uploadDir.listFiles();
//        
//        // Lặp qua danh sách các tệp tin trong thư mục
//        if (files != null) {
//            for (File file : files) {
//                // Cập nhật danh sách tệp tin trong cơ sở dữ liệu (nếu cần)
//                String fileName = file.getName();
//                // ... logic cập nhật cơ sở dữ liệu với thông tin tệp tin fileName
//            }
//        }
//    }
}
