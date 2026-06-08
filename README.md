# 🌱 EcoTrace — Carbon Footprint Tracker & Reduction App

EcoTrace is a premium, containerized React application designed to help individuals understand, calculate, track, and systematically reduce their carbon footprint. It features a modern dark-mode glassmorphic interface, a comprehensive carbon calculation wizard, live personalized insights, and an interactive daily action tracker.

---

## 🚀 Key Features

*   **Interactive Carbon Calculator**: A step-by-step calculator assessing Transportation (vehicle and flights), Home Energy (electricity and heating), and Diet/Consumption (dietary preferences, recycling, and composting).
*   **Aesthetic Dashboard Analytics**: Displays real-time calculations alongside live action-reduction offsets. Features a custom-built, animated SVG donut breakdown chart and global comparisons relative to sustainable milestones.
*   **Green Action Tracker**: Log green habits (e.g., carpooling, biking, lower thermostats, meatless days) to immediately deduct carbon offsets in real-time from the dashboard.
*   **Personalized Insights**: Adapts dynamic, science-based suggestions tailored to the user's specific lifestyle inputs.
*   **Fully Dockerized**: Built with multi-stage Docker configurations optimized for containerized cloud deployments like **Google Cloud Run (GCP)**.

---

## 🛠️ Local Development

To run the application locally in development mode:

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Start development server**:
    ```bash
    npm run dev
    ```
3.  Open `http://localhost:5173` in your browser.

---

## 📦 Local Production Preview

To test the compiled production version and Express serving system locally:

1.  **Build the application**:
    ```bash
    npm run build
    ```
2.  **Start the production Express server**:
    ```bash
    npm start
    ```
3.  Open `http://localhost:8080` in your browser.

---

## 🐋 Docker Containerization

To run and test the Docker container locally:

1.  **Build the Docker image**:
    ```bash
    docker build -t ecotrace-app .
    ```
2.  **Run the container**:
    ```bash
    docker run -p 8080:8080 ecotrace-app
    ```
3.  Open `http://localhost:8080` in your browser.

---

## ☁️ Deployment to Google Cloud Run (GCP)

To deploy this application to **Google Cloud Run**, follow these commands (ensuring you have the [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) installed and initialized):

1.  **Build and push the image to Google Artifact Registry**:
    ```bash
    # Replace PROJECT-ID with your GCP Project ID
    gcloud builds submit --tag gcr.io/PROJECT-ID/ecotrace-app
    ```
2.  **Deploy the container to Cloud Run**:
    ```bash
    gcloud run deploy ecotrace-app \
      --image gcr.io/PROJECT-ID/ecotrace-app \
      --platform managed \
      --region us-central1 \
      --allow-unauthenticated
    ```
3.  Once the command completes, it will output a secure URL (e.g. `https://ecotrace-app-xxxxxx.a.run.app`) where your web application is live!
