package com.example.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.example.backend.userRepository;
import com.example.backend.model.User;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin("*")
public class UserController {

	
    @Autowired
    private userRepository userRepository;
    

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
    
    
    @GetMapping("/auth/users/{id}")
    public JSONObject viewUser(@PathVariable long id) {
        //System.out.println("getbyid");
        User old = userRepository.getOne(id);
        return (JSONObject) JSONObject.toJSON(old);

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
        			break;
        		}
        	}
        }
        boolean invalid = false;
        if(object.getUsername().trim().isEmpty() || object.getUsername().contains(" ") || object.getUsername().length() <= 3)
        {
        	invalid = true;
        }
        if(duplicate == false && invalid == false) {
        	userRepository.save(object);
            System.out.println("registration success");
            jsonObject.put("code", "201");
            jsonObject.put("message", "Register Successful");
            jsonObject.put("token", "admin");

        }
        else if(duplicate == true){
            System.out.println("registration fail due to duplicate");
            jsonObject.put("code", "402");
            jsonObject.put("message", "Register failed due to existing username");
        }
        else if(invalid == true)
        {
            System.out.println("registration fail");
            jsonObject.put("code", "404");
            jsonObject.put("message", "Unable to use this username due to length or invalid characters!");
        }
        else
        {
            System.out.println("registration fail");
            jsonObject.put("code", "405");
            jsonObject.put("message", "Registration Fail! Invalid Username!");
        }
        return jsonObject;

    }
}
