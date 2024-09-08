# Todo Management System - Angular Project

## Overview
The **Todo Management System** is a task management application built with Angular. This app allows users to create, edit, and delete tasks, manage task statuses (To Do, In Progress, Done), and filter or sort tasks efficiently. The UI leverages **TailwindCSS** and **DaisyUI** for styling, and **JSON Server** simulates the backend API for task management operations.


### Features:
- **Task Management**: Users can view a list of tasks with attributes such as Title, Description, and Status.
- **Task Operations**: Users can create new tasks, edit existing ones, and delete tasks from the list.
- **Filtering & Sorting**: Basic filtering and sorting options are available for users to manage their task list.
- **Fake API Integration**: The app calls a fake API (using JSON Server) to get task data and simulates network delays for loading with a skeleton loader.
- **Drag-and-Drop**: Allows users to drag tasks between different statuses (To Do, In Progress, Done).
- **Task Dashboard**: A simple dashboard that shows statistics like the number of tasks in each status.
- **Responsive UI**: The interface is responsive and optimized for large and small devices, ensuring a user-friendly experience.


## Project Structure
The project follows a well-structured Angular pattern, with components, services, and modules organized for scalability and maintainability. Code follows strict naming conventions to ensure clarity.

### Project Setup
To get started with this project, follow these steps:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start JSON Server**:
   The JSON server will simulate the backend for task management.
   ```bash
   npm run start:json
   ```

3. **Run the Application**:
   Serve the Angular application locally.
   ```bash
   npm run start
   ```


## Technologies Used
- **Angular**: Core framework for the frontend.
- **TailwindCSS + DaisyUI 🔥**: Utility-first CSS framework for styling.
- **JSON Server**: Mock API for backend interactions.
- **PrimeIcons**: Icon library for UI elements.
- **Prettier**: Code formatting tool.


## Contributions
Feel free to fork the project, open issues, or submit pull requests to improve the functionality or design.

## License
This project is licensed under the MIT License.

MIT License

Copyright (c) 2024 Ookamini95

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.