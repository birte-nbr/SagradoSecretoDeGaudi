# El Sagrado Secreto De Gaudí - ReadMe

Welcome to the website of the Basílica de la Sagrada Família! This project includes a 3D model of the cathedral that can be found on architecture.html. In order to view the model correctly, you need to download it from an external link and save it in the appropriate folder. After that, you can run the website locally using any local server.

## Prerequisites

Before running the website, please ensure you have the following:
- A web browser (Chrome, Firefox, etc.)
- A local server (e.g., Live Server for VSCode, Python's built-in server, etc.)

## Step-by-Step Instructions

### 1. Clone or Download the Project
First, clone this repository or download the project files to your local machine:

```bash
git clone <repository_url>
```

Alternatively, you can download the ZIP file of this project and extract it.

### 2. Download the 3D Model
The 3D model is not included directly in the project due to file size considerations. To make it work, follow these steps:

- Download the model file from the following link:  
  [Download the 3D model (sagrada-final.glb)](https://drive.google.com/file/d/1rCeUfyhlVXggQkWwyupr_GczJXpzjIs3/view?usp=sharing)
  
### 3. Save the Model in the Correct Folder
Once you’ve downloaded the `sagrada-final.glb` file, save it in the `models` folder located in the root directory of the project. The file path should look like this:

```
/models/sagrada-final.glb
```

### 4. Run the Website Locally

To view the website, you will need to run it using a local server. Below are two common methods:

#### Option 1: Using VSCode with Live Server
1. Open the project folder in Visual Studio Code.
2. Install the Live Server extension if you haven't already.
3. Right-click on `homepage.html` and select "Open with Live Server".
4. The website will open in your default web browser.

#### Option 2: Using Python's Built-in Server
1. Navigate to the project folder in your terminal.
2. Run the following command (for Python 3.x):
```bash
   python -m http.server
```
3. Open your browser and go to `http://localhost:8000`.

Once the website is running, the 3D model (`sagrada-final.glb`) will be loaded and displayed automatically. Ensure that the model is correctly placed in the `/models` folder for it to render properly.

## Troubleshooting

- **3D model not displaying:** Ensure that the `sagrada-final.glb` file is correctly placed in the `/models` folder and has the exact file name.
- **File not found error:** Double-check that the model has been saved with the correct name (`sagrada-final.glb`) and in the correct location.
- **Website not loading:** Make sure you are running a local server and accessing the website through `localhost` or an equivalent local server URL.




