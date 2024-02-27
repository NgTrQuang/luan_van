package com.springboot.luanvan.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.luanvan.models.User;
import com.springboot.luanvan.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  @Autowired
  UserRepository userRepository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	User user = userRepository.findByUsername(username);
//    System.out.println("======TEST 1=====> jwt = "+ user.getFirstname()+user.getLastname());
    if (user == null) {
        throw new UsernameNotFoundException("Không tìm thấy người dùng");
    }
//    return new UserDetailsImpl(user);
    return UserDetailsImpl.build(user);
  }

}
