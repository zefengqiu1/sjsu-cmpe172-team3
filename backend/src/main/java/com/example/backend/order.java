package com.example.backend;


import javax.persistence.*;
import lombok.Data;

@Entity
@Table(name = "orders")
@Data
public class order {
	@GeneratedValue(strategy=GenerationType.AUTO)
    @Id
    private long id;
    private String name;
    private String supplier;
    @Column(name="orderCount")
    private int count;
    private String description;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSupplier() {
		return supplier;
	}
	public void setSupplier(String supplier) {
		this.supplier = supplier;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

}
