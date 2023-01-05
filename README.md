# Product Management System 

## Overview:

The project is to develop an online shopping products management platform to support browsing, category and product management, user management, and user authorization management based on React.

## Technologies:

Project is created with:

**Backend**

- Express
- Node.js
- Mongoose

**Frontend**

- ReactJS
- Redux(Mange app state)
- React-router (To handle routing)
- Axios (For http requests)
- AntD (Enterprise-level UI design language and React component library)
- ES6

## Key Concepts:

- CRUD operations
- Authenticaiton system
- Encrpyting passwords
- Integrated with AntD (React UI library)

## Main Features:

This app was made as the backend management system for various kinds of products. 

Project methodology

- Register and login system
  - Only a limited number of users can have access to this app, since it is designed as a backend management system for products.
  - Admins can create any other users after logging into the system.
  - Only after being created by admins, the users can login into the system.
  - Validate all inputs in log in.
  - Admins can create any other admins.
  - Logout function.
- Product category management
  - Display the first level category list with pagination.
  - Create new category item.
  - Edit existing category item.
  - Display the second level category list for one specific first level category item with pagination.
  - Assign the second level category item to a different first level category item.
- Product management
  - Display the product list with pagination.
  - Search for one specific product according to the product's name or product's description
  - Create new product including uploading pictures using Antd upload component, and creating a text content for the product using react-draft-wysiwyg.
  - Display the detail information for one product
  - Edit the detail information for one product.
  - Change the status for one product (stock or non-stock)
- User management
  - Admin users create other users.
  - Edit user's information.
  - Delete the user.
- Authorization management (Role-based access control)
  - Administrator creates other roles for users.
  - Administrator assigns roles to different users to control who can access to what content and functionality of the app. 

## Routing Diagram:

![image](https://github.com/zhecz/Pictures/blob/master/Routing_React.png)

## Screenshots:









