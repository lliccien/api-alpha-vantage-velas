# Stock Market Visualizer 📈

    ![License](https://img.shields.io/badge/license-MIT-blue.svg)
    ![React](https://img.shields.io/badge/React-18.2.0-blue)
    ![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue)
    ![Vite](https://img.shields.io/badge/Vite-4.0.0-orange)

    A real-time stock market visualization application built with React, TypeScript, and Vite. Visualize stock data with interactive candlestick charts and manage your watchlist with ease.

    ## Features ✨

    - 📊 Real-time candlestick charts
    - 🔍 Stock selector with 40+ popular tickers
    - ⏱️ Auto-refresh every 60 seconds
    - 💾 Persistent watchlist using localStorage
    - 📱 Responsive design for all devices
    - 🎨 Styled with Tailwind CSS
    - 🛠️ Type-safe with TypeScript

    ## Technologies Used 🛠️

    - **Frontend**: React 18, TypeScript
    - **Styling**: Tailwind CSS
    - **Build Tool**: Vite
    - **Charting**: Lightweight Charts
    - **API**: Alpha Vantage

    ## Getting Started 🚀

    ### Prerequisites

    - Node.js (v18 or higher)
    - npm (v9 or higher)
    - Alpha Vantage API key (free tier available)

    ### Installation

    1. Clone the repository:
       ```bash
       git clone https://github.com/yourusername/stock-market-visualizer.git
       ```
    2. Navigate to the project directory:
       ```bash
       cd stock-market-visualizer
       ```
    3. Install dependencies:
       ```bash
       npm install
       ```
    4. Create a `.env` file in the root directory:
       ```env
       VITE_ALPHA_VANTAGE_API_KEY=your_api_key_here
       ```
    5. Start the development server:
       ```bash
       npm run dev
       ```

    ### Available Scripts

    - `npm run dev`: Starts the development server
    - `npm run build`: Creates a production build
    - `npm run preview`: Serves the production build locally
    - `npm run type-check`: Runs TypeScript type checking

    ## Project Structure 🗂️

    ```
    stock-market-visualizer/
    ├── public/
    ├── src/
    │   ├── components/       # Reusable components
    │   ├── hooks/            # Custom React hooks
    │   ├── types/            # TypeScript type definitions
    │   ├── api.ts            # API service
    │   ├── App.tsx           # Main application component
    │   ├── main.tsx          # Application entry point
    │   └── index.css         # Global styles
    ├── .env.example          # Environment variables template
    ├── package.json          # Project dependencies
    ├── tsconfig.json         # TypeScript configuration
    ├── vite.config.ts        # Vite configuration
    └── README.md             # Project documentation
    ```

    ## Contributing 🤝

    Contributions are welcome! Please follow these steps:

    1. Fork the project
    2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
    3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
    4. Push to the branch (`git push origin feature/AmazingFeature`)
    5. Open a Pull Request

    Please make sure to update tests as appropriate.

    ## License 📄

    This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

    ## Acknowledgments 🙏

    - [Alpha Vantage](https://www.alphavantage.co/) for providing the stock market data API
    - [Lightweight Charts](https://github.com/tradingview/lightweight-charts) for the charting library
    - [Vite](https://vitejs.dev/) for the fast development experience

    ## Contact 📧

    For any inquiries, please reach out:

    - **Your Name** - your.email@example.com
    - **Project Link**: [https://github.com/yourusername/stock-market-visualizer](https://github.com/yourusername/stock-market-visualizer)
