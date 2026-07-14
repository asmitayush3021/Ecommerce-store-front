package com.product.productcatalog.config;

import com.product.productcatalog.model.Category;
import com.product.productcatalog.model.Product;
import com.product.productcatalog.repository.CategoryRepository;
import com.product.productcatalog.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public DataSeeder(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        //Clear all existing data
        productRepository.deleteAll();
        categoryRepository.deleteAll();

        //Create Categories
        Category electronics = new Category();
        electronics.setName("Electronics");

        Category clothing = new Category();
        clothing.setName("Clothing");

        Category home = new Category();
        home.setName("Home & Kitchen");

        categoryRepository.saveAll(Arrays.asList(electronics,home,clothing));

        //Create Products
        Product phone=new Product();
        phone.setName("Phone");
        phone.setDescription("Latest model smartphone with amazing features");
        phone.setCategory(electronics);
        phone.setImageUrl("https://placehold.co/600x400");
        phone.setPrice(699.99);

        Product laptop=new Product();
        laptop.setName("Laptop");
        laptop.setDescription("High-performance laptop for work and play.");
        laptop.setCategory(electronics);
        laptop.setImageUrl("https://placehold.co/600x400");
        laptop.setPrice(999.99);

        Product jacket=new Product();
        jacket.setName("Winter Jacket");
        jacket.setDescription("Warm and cozy jacket for winter.");
        jacket.setCategory(clothing);
        jacket.setImageUrl("https://placehold.co/600x400");
        jacket.setPrice(129.99);

        Product blender=new Product();
        blender.setName("Blender");
        blender.setDescription("High-speed for smoothies and more.");
        blender.setCategory(home);
        blender.setImageUrl("https://placehold.co/600x400");
        blender.setPrice(89.99);

        productRepository.saveAll(Arrays.asList(phone,laptop,jacket,blender));

    }
}
