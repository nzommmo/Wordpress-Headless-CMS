# � Headless CMS: WordPress + React

This project demonstrates how to build a **headless CMS** using **WordPress as the backend** and **React (with Vite) as the frontend**. Content is managed entirely in WordPress and consumed via the WordPress REST API in a React-based landing page.

---

## 🚀 Getting Started

Follow the steps below to get your development environment set up.

---

### 🧱 Backend Setup (WordPress)

### 1. Clone this Repository

   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```

## 🛠 Installation

### 2. Install XAMPP

Download and install [XAMPP](https://www.apachefriends.org/index.html) to set up a local server environment.

### 3. Set Up WordPress

1. Download the latest version of [WordPress](https://wordpress.org/download/).
2. Extract the WordPress files into your `htdocs` directory (inside XAMPP installation folder).
3. Create a new database:
   - Open phpMyAdmin via XAMPP control panel
   - Create a new database for your WordPress installation
4. Run the WordPress installer by visiting in your browser:http://localhost/your-wp-folder
(Replace `your-wp-folder` with your actual WordPress directory name)

### 4. Configure WordPress Settings

1. Go to **Settings > Permalinks** in WordPress admin dashboard
2. Select the **"Post name"** option for clean URLs
3. Click **Save Changes**

### 5. Install Required Plugins

Install these essential WordPress plugins via **Plugins > Add New**:

#### 🔐 JWT Authentication for WP REST API
- Enables token-based authentication for secure POST requests
- **Setup Required**:
  - Follow the plugin's instructions to modify:
    - `wp-config.php`
    - `.htaccess`
  - Add these lines to `wp-config.php`:
    ```php
    define('JWT_AUTH_SECRET_KEY', 'your-top-secret-key');
    define('JWT_AUTH_CORS_ENABLE', true);
    ```

#### 📝 Custom Post Type UI
- Creates custom post types and taxonomies through a UI
- No additional configuration needed for basic usage

#### 🏗️ Advanced Custom Fields (ACF)
- Adds custom fields to posts/pages
- **Important**: After creating field groups:
  1. Edit each field group
  2. Under "Settings", enable:
     - "Show in REST API"
     - (Optional) Create custom REST API endpoints

### 6. Test the REST API

#### 🔍 Basic API Test
```http
GET http://localhost/your-wp-folder/wp-json/wp/v2/posts 
```


#### 🔑 Authentication Flow

##### 1.Get JWT Token:
 POST http://localhost/your-wp-folder/wp-json/jwt-auth/v1/token
Content-Type: application/json
```json {
  "username": "your_admin_username",
  "password": "your_password"
}
```

##### 1.Use Token in Requests:
```http GET http://localhost/your-wp-folder/wp-json/wp/v2/posts
Authorization: Bearer YOUR_TOKEN_HERE 
```

## 💻 Frontend Setup (React + Vite)

### 1. Initialize React Project

Navigate to your project directory and set up Vite:

```bash
npm create vite@latest . -- --template react
```

### 2. Install Dependencies
```bash
npm install
npm install axios
```
### 3. Start Development Server
```bash
npm run dev
```
### 4. Fetching Data from Wordpress
##### Example component to fetch post
```jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost/your-wp-folder/wp-json/wp/v2/posts')
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>WordPress Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;

```
#
### ✅ Features

1. Fully decoupled CMS using WordPress and React

2. Custom post types and fields via CPT UI & ACF

3. RESTful API communication using JWT Auth and Axios

4. Clean URL structures with customizable frontend rendering

#
### 📫 Feedback or Help?
Feel free to open an issue or contact me for suggestions, improvements, or questions!
