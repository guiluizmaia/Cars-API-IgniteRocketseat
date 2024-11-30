# Car Registration

**Functional Requirements**  
- It should be possible to register a new car.  
- It should be possible to list all categories.  

**Non-Functional Requirements**

**Business Rules**  
- It should not be possible to register a car with an already existing license plate.  
- It should not be possible to change the license plate of an already registered car.  
- Cars should be registered as available by default.  
- The user responsible for the registration must be an administrator.  

# Car Listing

**Functional Requirements**  
- It should be possible to list all available cars.  
- It should be possible to list all available cars by category name.  
- It should be possible to list all available cars by brand name.  
- It should be possible to list all available cars by car name.  

**Non-Functional Requirements**

**Business Rules**  
- The user does not need to be logged into the system.  

# Car Specification Registration

**Functional Requirements**  
- It should be possible to register a specification for a car.  
- It should be possible to list all specifications.  
- It should be possible to list all cars.  

**Non-Functional Requirements**

**Business Rules**  
- It should not be possible to register a specification for a car that has not been registered.  
- It should not be possible to register a specification that already exists for the same car.  
- The user responsible for the registration must be an administrator.  

# Car Image Registration

**Functional Requirements**  
- It should be possible to register an image for a car.  
- It should be possible to list all cars.  

**Non-Functional Requirements**  
- Use Multer for file uploads.  

**Business Rules**  
- The user should be able to register more than one image for the same car.  
- The user responsible for the registration must be an administrator.  

# Car Rental

**Functional Requirements**  
- It should be possible to register a rental.  

**Non-Functional Requirements**

**Business Rules**  
- The rental period must have a minimum duration of 24 hours.  
- It should not be possible to register a rental if there is already an open rental for the same user.  
- It should not be possible to register a rental if there is already an open rental for the same car.  
