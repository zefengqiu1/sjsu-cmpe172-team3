package com.example.backend;

import com.alibaba.fastjson.JSONObject;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@SpringBootApplication
@RestController
@RequestMapping("/api/v1")
@CrossOrigin("*")
public class BackendApplication {

    @Autowired
    private productRepository productRepository;

    @Autowired
    private userRepository userRepository;

    @GetMapping("/admin/productnum")
    public JSONObject NumProduct()
    {
    	int num = productRepository.findAll().size();
        return (JSONObject) JSONObject.toJSON(num);
    }
    
    @GetMapping("/admin/products")//http://localhost:8081/api/v1/admin/products?page=1&per=2
    // getall
    public JSONObject ListProduct(@RequestParam int page,@RequestParam int per) {
        int _page=0;
        int _per=0;
        if (page <= 0) {
            _page = 1;
        }
        if (per <= 0) {
            _per = 10;
        }
        System.out.println("FindAll");

        List<product> list = productRepository.findAll();

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("totalCount", list.size());
        jsonObject.put("pages", 1);
        jsonObject.put("products", list);
        return jsonObject;
    }

    @GetMapping("/admin/users")//http://localhost:8081/api/v1/admin/users?page=1&per=2
    // getall
    public JSONObject ListUsers(@RequestParam int page,@RequestParam int per) {
        int _page=0;
        int _per=0;
        if (page <= 0) {
            _page = 1;
        }
        if (per <= 0) {
            _per = 10;
        }
        System.out.println("FindAllUsers");

        List<User> list = userRepository.findAll();

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("totalCount", list.size());
        jsonObject.put("pages", 1);
        jsonObject.put("users", list);
        return jsonObject;
    }
    
    //http://localhost:8081/api/v1/admin/products
    //additem
    @PostMapping("/admin/products")
    public void addProduct(@RequestBody product product) {
        System.out.println("additem");

        System.out.println(product.getName());
        System.out.println(product.getPrice());
        System.out.println(product.getDescription());
        System.out.println(product.getInventory());

        productRepository.save(product);
    }

    ///api/v1/admin/products/{id}
    //get request
    //getbyid
    @GetMapping("/admin/products/{id}")
    public JSONObject viewProduct(@PathVariable long id) {
        //System.out.println("getbyid");
        product old = productRepository.getOne(id);
        return (JSONObject) JSONObject.toJSON(old);

    }

    ///api/v1/admin/products/
    //update item
    @PutMapping("/admin/products/{id}")
    public void updateProduct(@PathVariable long id,@RequestBody Map<String, String> object) {
        for (String key:object.keySet()) {
            System.out.println(key+":"+object.get(key));
        }
        System.out.println("update");

        product old = productRepository.getOne(id);
        old.setName(object.get("name"));
        old.setPrice(Integer.valueOf(object.get("price")));
        old.setInventory(Integer.valueOf(object.get("inventory")));
        if(object.get("description")!=null) {
            old.setDescription(object.get("description"));
        }
        //productRepository.
        productRepository.save(old);
    }

    // DELETE http://localhost:8081/api/v1/admin/products/1
    //delteitem
    @DeleteMapping("/admin/products/{id}")
    public void deleteProduct(@PathVariable long id) {
        System.out.println(id);
        productRepository.deleteById(id);
    }


    @PostMapping("/auth/manager_login")
    @ResponseBody
    public JSONObject Login(@RequestBody Map<String, String> object) {
        System.out.println("login");
        JSONObject jsonObject = new JSONObject();
        List<User> list = userRepository.findAll();
        boolean success=false;
        for(User user:list) {
            if(user.getPassword().equals(object.get("password"))&&
            user.getUsername().equals(object.get("username"))){
                success = true;
            }
        }
        if(success) {
            jsonObject.put("code", "200");
            jsonObject.put("message", "login successfully");
            jsonObject.put("token", "admin");

        }else {
            jsonObject.put("code", "400");
            jsonObject.put("message", "login fail");
        }

        return jsonObject;

    }

    @PostMapping("/auth/register")
    @ResponseBody
    public void Register(@RequestBody User object) {
        System.out.println("register");
        JSONObject jsonObject = new JSONObject();
        List<User> list = userRepository.findAll();
        boolean duplicate = false;
        for(User user:list) {
        	System.out.println(user.getUsername());
        	if(user.getUsername() != null)
        	{
        		if(user.getUsername() == object.getUsername()){
        			duplicate = true;
        		}
        	}
        }
        boolean success=false;
        if(object.getPassword() != "" && object.getUsername() != "" && !duplicate)
        {
        	userRepository.save(object);
        	success = true;
        }
        if(success) {
            System.out.println("registration success");
            jsonObject.put("code", "201");
            jsonObject.put("message", "register successful");
            jsonObject.put("token", "admin");

        }
        else if(duplicate)
        {
            System.out.println("registration fail due to duplicate");
            jsonObject.put("code", "401");
            jsonObject.put("message", "register fail due to existing user");
            jsonObject.put("token", "admin");
        }
        else {
            System.out.println("registration fail due to null");
            jsonObject.put("code", "402");
            jsonObject.put("message", "register fail");
        }

    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

}
