package com.springboot.luanvan.security;
//Ref: https://www.bezkoder.com/websecurityconfigureradapter-deprecated-spring-boot/

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

import com.springboot.luanvan.security.jwt.AuthEntryPointJwt;
import com.springboot.luanvan.security.jwt.AuthTokenFilter;
import com.springboot.luanvan.security.services.UserDetailsServiceImpl;

@Configuration
@EnableGlobalMethodSecurity(
    // securedEnabled = true,
    // jsr250Enabled = true,
    prePostEnabled = true) // Bật tính năng bảo mật phương thức toàn cầu
public class WebSecurityConfig { // extends WebSecurityConfigurerAdapter {
  @Autowired UserDetailsServiceImpl userDetailsService; // Bean cung cấp thông tin người dùng

  @Autowired private AuthEntryPointJwt unauthorizedHandler; // Bean xử lý ngoại lệ cho các yêu cầu không xác thực

//  @Bean
//  public void addResourceHandlers(ResourceHandlerRegistry registry) {
//      registry.addResourceHandler("/static/**")
//              .addResourceLocations("classpath:/static/");
//  }
  @Bean
  public AuthTokenFilter authenticationJwtTokenFilter() { // Bean cho việc kiểm tra và xác thực JWT
    return new AuthTokenFilter();
  }
  
  @Bean
  public DaoAuthenticationProvider authenticationProvider() {
      DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(); // Bean cung cấp DaoAuthenticationProvider
       
      authProvider.setUserDetailsService(userDetailsService); // Cung cấp thông tin người dùng từ userDetailsService
      authProvider.setPasswordEncoder(passwordEncoder()); // Cung cấp mã hóa mật khẩu
   
      return authProvider;
  }

  
  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager();  // Bean cung cấp AuthenticationManager
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(); // Bean cung cấp BCryptPasswordEncoder cho mã hóa mật khẩu
  }
 
  @Bean //Ref: https://www.toptal.com/spring/spring-security-tutorial
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	// 1. Enable CORS and disable CSRF
    http.cors().and().csrf().disable()  
    	//2. Set unauthorized requests exception handler
        .exceptionHandling().authenticationEntryPoint(unauthorizedHandler)	
        .and()
        //3. Set session management to stateless
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)	
        .and()   //4. Set permissions on endpoints
        // Our public endpoints
        .authorizeRequests().antMatchers("/api/auth/**").permitAll()
        .antMatchers("/api/test/**").permitAll()
        .antMatchers("/api/v1/**").permitAll()
        .antMatchers("/api/publishingPlaces/**").hasRole("ADMIN")
        .antMatchers("/api/authors/**").hasRole("ADMIN")
        .antMatchers("/api/genres/**").hasRole("ADMIN")
        .antMatchers("/api/cart/**").permitAll()
        .antMatchers("/api/invoice/**").permitAll()
        .antMatchers("/api/payment/**").permitAll()
        .antMatchers("/api/user/**").permitAll()
        .antMatchers("/api/address/**").permitAll()
        // Our private endpoints
        .anyRequest().authenticated(); // Tất cả các yêu cầu còn lại yêu cầu xác thực
    
    http.authenticationProvider(authenticationProvider()); // Áp dụng authenticationProvider đã cấu hình trước đó

    //5. Add JWT token filter
    http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class); // Thêm JWT filter trước filter mặc định
    
    return http.build(); // Trả về cấu hình bảo mật
  }
}
