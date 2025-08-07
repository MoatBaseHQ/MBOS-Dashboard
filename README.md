# MBOS Dashboard

A comprehensive dashboard for managing and monitoring MBOS (MoatBase Operating System) agents and services.

## Overview

The MBOS Dashboard provides a centralized interface for:
- **Agent Management**: Monitor and control MBOS agents
- **Service Status**: Real-time status of all MBOS services
- **Configuration**: Manage agent configurations and settings
- **Analytics**: View performance metrics and usage statistics

## Features

- 🎯 **Agent Overview**: Centralized view of all active agents
- 📊 **Real-time Monitoring**: Live status updates and performance metrics
- ⚙️ **Configuration Management**: Easy agent setup and configuration
- 📈 **Analytics Dashboard**: Performance insights and usage statistics
- 🔧 **Service Control**: Start, stop, and restart services
- 📝 **Log Management**: Centralized logging and debugging

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Access to MBOS services

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd MBOS-Dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
MBOS Dashboard/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── utils/         # Utility functions
│   └── styles/        # CSS and styling
├── public/            # Static assets
├── docs/              # Documentation
└── tests/             # Test files
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please contact the MBOS development team. 