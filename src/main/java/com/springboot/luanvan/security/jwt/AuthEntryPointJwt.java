package com.springboot.luanvan.security.jwt;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
//Được sử dụng để kiểm tra username/password đính kèm theo request có hợp lệ hay không.

/* https://www.bezkoder.com/spring-boot-jwt-mysql-spring-security-architecture/
   Handle AuthenticationException – AuthenticationEntryPoint
	  If the user requests a secure HTTP resource without being authenticated, AuthenticationEntryPoint will be called. 
	  At this time, an AuthenticationException is thrown, commence() method on the entry point is triggered.
*/	
	
public class AuthEntryPointJwt implements AuthenticationEntryPoint {

  private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

  @Override
  //Phương thức commence() được gọi khi có AuthenticationException xảy ra
  public void commence(HttpServletRequest request, HttpServletResponse response,
		  AuthenticationException authException) throws IOException, ServletException {
    logger.error("Unauthorized error: {}", authException.getMessage());
    
    // Thiết lập kiểu nội dung của phản hồi là JSON
    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    
    // Thiết lập mã trạng thái của phản hồi là UNAUTHORIZED (401)
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    
    // Tạo một đối tượng Map để chứa thông tin lỗi
    final Map<String, Object> body = new HashMap<>();
    body.put("status", HttpServletResponse.SC_UNAUTHORIZED);
    body.put("error", "Unauthorized");
    body.put("message", authException.getMessage());
    body.put("path", request.getServletPath());
    
    // Sử dụng ObjectMapper để chuyển đối tượng Map thành chuỗi JSON và ghi vào luồng đầu ra của phản hồi
    final ObjectMapper mapper = new ObjectMapper();
    mapper.writeValue(response.getOutputStream(), body);
  }
}

