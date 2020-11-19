package com.example.backend;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;

@RestController
@RequestMapping("/api/v1")
public class OrderController {
	@Autowired
	private com.example.backend.orderRepository orderRepository;
	
	@GetMapping("/admin/orders")//http://localhost:8081/api/v1/admin/orders?page=1&per=6
    //getall
    public JSONObject ListOrder(@RequestParam int page, @RequestParam int per) {
    	int _page = 0;
    	int _per = 0;
    	if(page<=0) {
    		_page=1;
    	}
    	if(per<=0) {
    		_per=10;
    	}
    	System.out.println("FindAllOrders");
    	List<order> orderList = orderRepository.findAll();
    	
    	JSONObject jsonObject = new JSONObject();
    	jsonObject.put("totalCount", orderList.size());
        jsonObject.put("pages", 1);
        jsonObject.put("orders", orderList);
        return jsonObject;
    }

    //http://localhost:8081/api/v1/admin/orders
    //addOrder
    @PostMapping("/admin/orders")
    public void addOrder(@RequestBody order o) {
    	System.out.println("addOrder");
    	
    	 System.out.println(o.getName());
         System.out.println(o.getSupplier());
         System.out.println(o.getCount());
         System.out.println(o.getDescription());
         orderRepository.save(o);
    }
    
    ///api/v1/admin/orders/{id}
    //get request
    //getbyid
    @GetMapping("/admin/order/{id}")
    public JSONObject viewOrder(@PathVariable long id) {
        order old = orderRepository.getOne(id);
        return (JSONObject) JSONObject.toJSON(old);

    }

    ///api/v1/admin/orders/
    //update order
    @PutMapping("/admin/orders/{id}")
    public void updateOrder(@PathVariable long id,@RequestBody Map<String, String> object) {
        for (String key:object.keySet()) {
            System.out.println(key+":"+object.get(key));
        }
        System.out.println("update");

        order old = orderRepository.getOne(id);
        old.setName(object.get("name"));
        old.setSupplier(object.get("supplier"));
        old.setCount(Integer.valueOf(object.get("count")));
        if(object.get("description")!=null) {
            old.setDescription(object.get("description"));
        }
        //productRepository.
        orderRepository.save(old);
    }

    // DELETE http://localhost:8081/api/v1/admin/orders/1
    //delete order
    @DeleteMapping("/admin/orders/{id}")
    public void deleteOrder(@PathVariable long id) {
        System.out.println(id);
        orderRepository.deleteById(id);
    }
}
