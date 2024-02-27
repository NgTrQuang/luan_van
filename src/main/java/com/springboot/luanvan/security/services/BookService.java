package com.springboot.luanvan.security.services;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;

import javax.imageio.ImageIO;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Service
public class BookService {

	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
	    if (file.isEmpty()) {
	        return new ResponseEntity<>("Please select a file to upload", HttpStatus.BAD_REQUEST);
	    }

	    try {
	        // Đọc file hình ảnh vào BufferedImage
	        BufferedImage image = ImageIO.read(file.getInputStream());

	        // Thực hiện xử lý trên hình ảnh
	        // ...

	        // Lưu hình ảnh vào file trên server
	        File outputFile = new File("path/to/output/file.jpg");
	        FileOutputStream out = new FileOutputStream(outputFile);
	        ImageIO.write(image, "jpg", out);
	        out.close();

	        return new ResponseEntity<>("File uploaded successfully", HttpStatus.OK);
	    } catch (Exception e) {
	        return new ResponseEntity<>("Failed to upload file: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
}
