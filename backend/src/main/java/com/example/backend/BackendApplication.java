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

    @GetMapping("/auth/users")//http://localhost:8081/api/v1/auth/users?page=1&per=2
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
    
    @GetMapping("/auth/users/{id}")
    public JSONObject viewUser(@PathVariable long id) {
        //System.out.println("getbyid");
        User old = userRepository.getOne(id);
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
    
    ///api/v1/auth/users/
    //update item
    @PutMapping("/auth/users/{id}")
    public JSONObject updateUser(@PathVariable long id,@RequestBody Map<String, String> object) {
    	
        System.out.println("update");
    	
        JSONObject jsonObject = new JSONObject();
        
        User old = userRepository.getOne(id);
        
        List<User> list = userRepository.findAll();
        int index = 0;
        for(User user: list)
        {
    		if(user.getUsername().equalsIgnoreCase(old.getUsername())){
    			index = list.indexOf(user);
    		}
        }
        list.remove(index);
        boolean duplicate = false;
        for(User user:list) {
        	if(user.getUsername() != null)
        	{
    			System.out.println(user.getUsername() + ", " + object.get("username"));
        		if(user.getUsername().equalsIgnoreCase(object.get("username"))){
        			duplicate = true;
        			break;
        		}
        	}
        }
        if(duplicate == false)
        {
            old.setUsername(object.get("username"));
            old.setPassword(object.get("password"));
            //productRepository.
            userRepository.save(old);
        }
        if(duplicate == false) {
            System.out.println("update success");
            jsonObject.put("code", "202");
            jsonObject.put("message", "Update Successful");
            jsonObject.put("token", "admin");

        }
        else {
            System.out.println("Update fail due to duplicate");
            jsonObject.put("code", "403");
            jsonObject.put("message", "Update failed due to existing username");
        }
        return jsonObject;
    }


    // DELETE http://localhost:8081/api/v1/admin/products/1
    //delteitem
    @DeleteMapping("/admin/products/{id}")
    public void deleteProduct(@PathVariable long id) {
        System.out.println(id);
        productRepository.deleteById(id);
    }
    
    // DELETE http://localhost:8081/api/v1/auth/users/1
    //delete item
    @DeleteMapping("/auth/users/{id}")
    public void deleteUser(@PathVariable long id) {
        System.out.println(id);
        userRepository.deleteById(id);
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
    public JSONObject Register(@RequestBody User object) {
        System.out.println("register");
        JSONObject jsonObject = new JSONObject();
        List<User> list = userRepository.findAll();
        boolean duplicate = false;
        for(User user:list) {
        	if(user.getUsername() != null)
        	{
    			System.out.println(user.getUsername() + ", " + object.getUsername());
        		if(user.getUsername().equalsIgnoreCase(object.getUsername())){
        			duplicate = true;
        		}
        	}
        }
        if(duplicate == false)
        {
        	userRepository.save(object);
        }
        if(duplicate == false) {
            System.out.println("registration success");
            jsonObject.put("code", "201");
            jsonObject.put("message", "Register Successful");
            jsonObject.put("token", "admin");

        }
        else {
            System.out.println("registration fail due to duplicate");
            jsonObject.put("code", "402");
            jsonObject.put("message", "Register failed due to existing username");
        }
        return jsonObject;

    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

}
