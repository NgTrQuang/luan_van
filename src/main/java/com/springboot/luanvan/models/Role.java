package com.springboot.luanvan.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
	@Id
  	@GeneratedValue(strategy = GenerationType.IDENTITY)
  	private Integer id;

  	/*REF: https://stackjava.com/hibernate/code-vi-du-hibernate-enumerated-luu-du-lieu-dang-enum.html
      	Khi thực hiện insert dữ liệu, khai báo kiểu dữ liệu, thay vì dùng kiểu String, 
  	ta dùng kiểu Enum như thế khi code sẽ đảm bảo được giữ liệu chỉ nhận các giá trị nhất định.
  	Annotation @Enumerated sẽ đánh dấu field được lưu dạng enum, khi lưu vào database 
  	và đọc từ database ra, nó sẽ tự động lấy name của Enum đó.
   */
  	@Enumerated(EnumType.STRING)
  	@Column(length = 20)
  	private ERole name;
  
  	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinTable(name = "role_privilege", joinColumns = @JoinColumn(name = "role_id"), inverseJoinColumns = @JoinColumn(name = "privilege_id"))
	private Set<Privilege> privileges = new HashSet<>();

  	public Role() {
	  
  	}

  	public Role(ERole name) {
	  this.name = name;
  	}

  	public Integer getId() {
	  return id;
  	}

  	public void setId(Integer id) {
	  this.id = id;
  	}

  	public ERole getName() {
	  return name;
  	}

  	public void setName(ERole name) {
  		this.name = name;
  	}

	public Set<Privilege> getPrivileges() {
		return privileges;
	}
	
	public void setPrivileges(Set<Privilege> privileges) {
		this.privileges = privileges;
	}
}