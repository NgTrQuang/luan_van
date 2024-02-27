package com.springboot.luanvan.security.jwt;
import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.springboot.luanvan.security.services.UserDetailsServiceImpl;

public class AuthTokenFilter extends OncePerRequestFilter {
	
  @Autowired private JwtUtils jwtUtils;  
  @Autowired private UserDetailsServiceImpl userDetailsService;
  
  private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, 
		  FilterChain filterChain) throws ServletException, IOException {
    try {
    	// Lấy token từ request
      String jwt = parseJwt(request);
      
      // Kiểm tra và xác thực token nếu token hợp lệ
      if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
        String username = jwtUtils.getUserNameFromJwtToken(jwt);

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        
        // Tạo đối tượng authentication
        UsernamePasswordAuthenticationToken authentication =
            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        
        // Đặt chi tiết xác thực từ request
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        // Đặt đối tượng authentication vào SecurityContextHolder
        SecurityContextHolder.getContext().setAuthentication(authentication);
      }
    } catch (Exception e) {
    	// Ghi log nếu có lỗi xác thực
      logger.error("Cannot set user authentication: {}", e);
    }
    // Chuyển request đến Filter tiếp theo trong chuỗi Filter
    filterChain.doFilter(request, response);
  }

  private String parseJwt(HttpServletRequest request) {
	  
	// Lấy giá trị của header Authorization từ request
    String headerAuth = request.getHeader("Authorization");
    
    // Kiểm tra và trích xuất token nếu header chứa thông tin Authorization và bắt đầu bằng "Bearer "
    if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
      return headerAuth.substring(7, headerAuth.length());
    }
    return null;
  }
}

